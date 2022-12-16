import { AttachmentIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Icon, Text, VisuallyHiddenInput, VStack } from '@chakra-ui/react'
import React, { useRef, useState, useEffect } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { RenderIf } from './render-if'

const PDF_THUMBNAIL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'

interface FileUploadBoxProps {
  isLoading: boolean
  setIsFileLoaded: (isFileLoaded: boolean) => void
}
const FileUploadBox = ({ isLoading, setIsFileLoaded }: FileUploadBoxProps) => {

  const [previewFile, setPreviewFile] = useState<{ name: string, img: string, ext: string } | null>({
    name: '',
    img: '',
    ext: '',
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => fileInputRef.current?.click()

  const { register, formState: { errors, submitCount }, resetField } = useFormContext();

  useEffect(() => {
    setPreviewFile(null)
    setIsFileLoaded(false)
    resetField('file')
  }, [submitCount])

  useEffect(() => {
    if (errors.file) {
      setPreviewFile({
        name: 'error',
        img: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png',
        ext: '',
      })
      setIsFileLoaded(true)
      resetField('file')
    }
  }, [errors])


  const handlePreviewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFileLoaded(false)
    const file = e.target.files?.[0]
    if (!file || !file?.type) return setPreviewFile(null)

    if (!file.type.includes('pdf')) return setPreviewFile(null)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      if (!reader.result) return
      if (typeof reader.result !== 'string') return
      const thumbnail = file.type === 'application/pdf' ? PDF_THUMBNAIL : reader.result

      setPreviewFile({
        name: file.name.split('.')[0].slice(0, 30).concat('...').concat(file.name.split('.')[1]),
        img: thumbnail,
        ext: file.type.split('/')[1]
      })
      setIsFileLoaded(true)
    }
  }

  const { ref: refFile, onChange: onChangeFile, ...registerFile } = register('file', { required: true })

  return (
    <VStack display={'block'}>
      <Button variant={'outline'} gap={3} borderWidth='thin' borderStyle={!previewFile ? 'dashed' : 'solid'} p='10' pointerEvents={'inherit'} onClick={handleClick} w='full' bg={`url(${previewFile?.img})`} bgSize='contain' bgPos='center' bgRepeat='no-repeat' opacity={0.6} _hover={{ opacity: 1, cursor: 'pointer', borderColor: 'white' }} sx={{
        backgroundOrigin: 'border-box',
      }}
        borderColor={previewFile?.name === "error" ? 'red.500' : isLoading ? 'blue.500' : 'gray.700'}
      >

        <VStack spacing={1}>

          <RenderIf condition={previewFile ? true : false}>
            <Text fontSize={'sm'} fontWeight={'bold'} textTransform={'uppercase'} letterSpacing={'wide'} bg={'gray.700'} p={1} borderRadius={'md'} opacity={1}  >
              {previewFile?.ext}
            </Text>
          </RenderIf>

          <RenderIf condition={previewFile ? false : true}>
            <HStack spacing={1}>
              <Icon as={AttachmentIcon} />
              <Text>Attachment</Text>
            </HStack>
          </RenderIf>

          <RenderIf condition={isLoading}>
            <Text fontSize={'sm'} fontWeight={'bold'} textTransform={'uppercase'} letterSpacing={'wide'} bg={'gray.700'} p={1} borderRadius={'md'} opacity={1} color={'blue.500'} >s
              Loading
            </Text>
          </RenderIf>
          
        </VStack>
        <VisuallyHiddenInput
          type='file'
          accept="application/pdf"
          {...registerFile}
          ref={(e) => {
            fileInputRef.current = e
            refFile(e)
          }}
          onChange={(e) => {
            handlePreviewFileChange(e)
            onChangeFile(e)
          }}
        />
      </Button>
      {previewFile?.name && (
        <Text fontSize={'xs'} fontWeight={'bold'} textTransform={'uppercase'} letterSpacing={'wide'} bg={'gray.700'} p={1} borderRadius={'md'} opacity={1}  >
          {previewFile.name}
        </Text>
      )}
    </VStack>
  )
}

export default FileUploadBox