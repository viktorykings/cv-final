import { Box, Button, Container, styled, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetCv } from '../graphql/cvs/hooks/useGetCv'
import { useGetSkillCategory } from '../graphql/skills/hooks/useGetSkillsCategories'
import createSkillsGroups from './Cvs/CreateSkillsGroup'

const BoldTypography = styled('h6')({
  fontWeight: 'bold',
  fontSize: '1rem',
  margin: '10px 0'
})
const StyledH4 = styled('h4')({
  fontSize: '2.125rem',
  margin: '10px 0'
})

const PreviewPage = () => {
  const { cvId } = useParams()
  const { data: cv } = useGetCv(cvId as string)
  const { data: categories } = useGetSkillCategory()
  if (!cv) return <>no cv</>
  if (!categories) return <>no cv</>

  const skillsToRender = createSkillsGroups(cv.cv.skills, categories.skillCategories)
  return (
    <Container>
      <Box
        component={'section'}
        sx={{ display: 'flex', justifyContent: 'space-between', m: '20px 0 50px' }}
      >
        <Box>
          <StyledH4>{cv.cv.user.profile.full_name}</StyledH4>
          <Typography component={'p'}>{cv.cv.user.position_name}</Typography>
        </Box>
        <Button color="secondary" variant="outlined" sx={{ height: '60px' }}>
          Export PDF
        </Button>
      </Box>
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
          <Typography component={'p'}>{cv.cv.projects?.map(el => el.responsibilities)}</Typography>
          <BoldTypography>Period</BoldTypography>
          <Typography component={'p'}>
            {cv.cv.projects?.map(el => el.start_date)}-{cv.cv.projects?.map(el => el.end_date)}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
export default PreviewPage
