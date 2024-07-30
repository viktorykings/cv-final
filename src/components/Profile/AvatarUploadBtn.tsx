import React, { useState } from 'react'
import { Button, Box, Typography, styled } from '@mui/material'
import { useUploadAvatar } from '../../graphql/users/profile/hooks/useUploadAvatar'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../shared/constants'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const FileUploadButton: React.FC = () => {
  const currentUserId = useReactiveVar(userID)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [uploadAvatar] = useUploadAvatar()
  const MAX_FILE_SIZE = 500 * 1024 // 500kb

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage('File size exceeds 500kb limit')
      } else {
        setErrorMessage('')
        convertToBase64(file, base64String => {
          handleUpload(file, base64String)
        })
      }
    }
  }

  const convertToBase64 = (file: File, callback: (base64String: string) => void) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      callback(reader.result as string)
    }
    reader.onerror = () => {
      setErrorMessage('Error reading file')
    }
  }

  const handleUpload = (file: File, base64String: string) => {
    uploadAvatar({
      variables: {
        avatar: {
          userId: currentUserId,
          base64: base64String,
          size: file.size,
          type: file.type
        }
      }
    })
      .then(() => {
        setErrorMessage('') // Clear any previous error messages
      })
      .catch(error => {
        setErrorMessage('Error uploading file')
        console.error('Upload error:', error)
      })
  }

  return (
    <Box>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto'
        }}
      >
        <Typography component={'h6'}>
          <FileUploadOutlinedIcon /> Upload file
        </Typography>
        <Typography component={'h6'}>png, jpg or gif no more than 0.5MB</Typography>
        <VisuallyHiddenInput
          accept="image/png, image/jpg, image/jpeg, image/gif"
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
      </Button>
    </Box>
  )
}

export default FileUploadButton
