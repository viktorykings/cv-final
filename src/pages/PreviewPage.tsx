import { useRef } from 'react'
import { Box, Button, Container, styled, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetCv } from '../graphql/cvs/hooks/useGetCv'
import { useGetSkillCategory } from '../graphql/skills/hooks/useGetSkillsCategories'
import createSkillsGroups from './Cvs/CreateSkillsGroup'
import { useExportPDF } from '../graphql/users/cvs/hooks/useExportPDF'

const BoldTypography = styled('h6')({
  fontWeight: 'bold',
  fontSize: '1rem',
  margin: '10px 0'
})
const StyledH4 = styled('h4')({
  fontSize: '2.125rem',
  margin: '10px 0'
})

type Args = {
  name: string
  base64: string
}

const downloadPdf = ({ name, base64 }: Args): void => {
  const source = `data:application/pdf;base64,${base64}`
  const link = document.createElement('a')

  link.href = source
  link.download = name + '.pdf'
  link.click()
}

const PreviewPage = () => {
  const { cvId } = useParams()
  const { data: cv } = useGetCv(cvId as string)
  const { data: categories } = useGetSkillCategory()
  const componentRef = useRef<HTMLDivElement>(null)
  const [exportPDF] = useExportPDF()

  if (!cv) return <>no cv</>
  if (!categories) return <>no cv</>

  const skillsToRender = createSkillsGroups(cv.cv.skills, categories.skillCategories)

  const handleExportPDF = async (): Promise<void> => {
    const htmlContent = (componentRef.current as HTMLElement).innerHTML

    if (htmlContent) {
      console.log(htmlContent)
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('')
          } catch (e) {
            console.error(e)
            return ''
          }
        })
        .join('')

      const fullHtml = `
        <html>
          <head>
            <style>${styles}</style>
          </head>
          <body>
            <div style="background: white; color: black; padding: 20px;">
              ${htmlContent}
            </div>
          </body>
        </html>
      `

      const response = await exportPDF({
        variables: {
          pdf: {
            html: fullHtml,
            margin: {
              top: '15mm',
              bottom: '15mm',
              left: '15mm',
              right: '15mm'
            }
          }
        }
      })

      if (response.data) {
        downloadPdf({ name: cv?.cv.name ?? 'CV', base64: response.data.exportPdf })
      }
    }
  }

  return (
    <Container ref={componentRef}>
      <Box
        component={'section'}
        sx={{ display: 'flex', justifyContent: 'space-between', m: '20px 0 50px' }}
      >
        <Box>
          <StyledH4>{cv.cv.user.profile.full_name}</StyledH4>
          <Typography component={'p'}>{cv.cv.user.position_name}</Typography>
        </Box>
        <Button
          color="secondary"
          variant="outlined"
          sx={{ height: '60px', '@media print': { display: 'none' } }}
          onClick={handleExportPDF}
        >
          Export PDF
        </Button>
      </Box>
      <div>
        <Box component={'section'} sx={{ display: 'flex', gap: 2 }}>
          <Box component={'div'} sx={{ minWidth: '200px' }}>
            <BoldTypography>Education</BoldTypography>
            <Typography component={'p'}>{cv.cv.education}</Typography>
            <BoldTypography>Language proficiency</BoldTypography>
            {cv.cv.languages.map(el => (
              <Typography component={'p'} key={el.name}>
                {el.name} &mdash; {el.proficiency}
              </Typography>
            ))}
            <Typography component={'p'}>{cv.cv.education}</Typography>
            <BoldTypography>Domains</BoldTypography>
            {cv.cv.projects?.map(el => (
              <Typography component={'p'} key={el.id}>
                {el.domain}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              borderLeft: '1px solid ',
              borderColor: 'secondary.main',
              paddingLeft: 2,
              maxWidth: '650px'
            }}
          >
            <Box>
              <BoldTypography>{cv.cv.name}</BoldTypography>
              <Typography component={'p'}>{cv.cv.description}</Typography>
            </Box>
            <Box>
              {skillsToRender.map(el => (
                <Box key={el.cat} sx={{ m: 1 }}>
                  <BoldTypography>{el.cat}</BoldTypography>
                  {el.skills.map(el => (
                    <Typography component={'span'} sx={{ m: 2 }} key={el.name}>
                      {el.name}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box component={'section'}>
          <StyledH4>Projects</StyledH4>
        </Box>
        <Box component={'section'} sx={{ display: 'flex' }}>
          <Box sx={{ maxWidth: '300px' }}>
            {cv.cv.projects?.map(el => <BoldTypography key={el.name}>{el.name}</BoldTypography>)}
            {cv.cv.projects?.map(el => (
              <Typography key={el.description}>{el.description}</Typography>
            ))}
          </Box>
          <Box sx={{ borderLeft: '1px solid ', borderColor: 'secondary.main', paddingLeft: 2 }}>
            <BoldTypography>Project roles</BoldTypography>
            <Typography component={'p'}>{cv.cv.projects?.map(el => el.roles)}</Typography>
            <BoldTypography>Responsibilities & achievements</BoldTypography>
            <Typography component={'p'}>
              {cv.cv.projects?.map(el => el.responsibilities)}
            </Typography>
            <BoldTypography>Period</BoldTypography>
            <Typography component={'p'}>
              {cv.cv.projects?.map(el => el.start_date)}-{cv.cv.projects?.map(el => el.end_date)}
            </Typography>
          </Box>
        </Box>
      </div>
    </Container>
  )
}

export default PreviewPage
