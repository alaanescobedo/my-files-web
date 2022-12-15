import { useState } from 'react'
import { Button, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { FilePublic } from '../store'
import { Tooltip } from '@chakra-ui/react'
import { PdfModal } from './pdf-modal'
import { DeleteIcon } from '@chakra-ui/icons'

interface FileBoxProps {
  file: FilePublic
  isDeleting: boolean
  onDeleteFile: (fileId: string) => void
}
const PDF_THUMBNAIL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'

const FileBox = ({ file, isDeleting, onDeleteFile }: FileBoxProps) => {

  const formatName = file.publicName.split('.')[0].slice(0, 10).concat('...').concat(file.publicName.split('.').pop() ?? 'ext')
  const thumbnail = PDF_THUMBNAIL

  const { isOpen, onClose, onOpen } = useDisclosure({ id: file.id })

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  return (
    <>
      <VStack display={'block'}>

        <Menu
          isOpen={isOpenMenu}
          onClose={() => setIsOpenMenu(false)}
          placement={'top-end'}
        >
          <Tooltip label={file.publicName}>
            <MenuButton
              isActive={isOpenMenu}
              as={Button} variant={'solid'} gap={3}
              borderWidth='thin' p='10' pointerEvents={'inherit'} opacity={.9} w='full'
              bg={`url(${thumbnail})`} bgSize='contain' bgPos='center' bgRepeat='no-repeat'
              _hover={{ opacity: 1, cursor: 'pointer', borderColor: 'blue.400' }}
              sx={{ backgroundOrigin: 'border-box' }}
              _active={{ bg: "inital" }}
              onClick={onOpen}
              onContextMenu={(e) => {
                e.preventDefault();
                setIsOpenMenu(true);
              }}
              borderColor={isDeleting ? 'red.400' : 'gray.700'}
              style={{ paddingLeft: '.6rem', paddingRight: '.6rem' }}
            >
              <Text fontSize={'sm'} fontWeight={'bold'} textTransform={'uppercase'} letterSpacing={'wide'} bg={'gray.700'} p={1} borderRadius={'md'} opacity={1}>
                {formatName}
              </Text>
            </MenuButton>
          </Tooltip>
          <HStack as={MenuList} spacing={1} px={2} minW={'fit-content'} m={0}  >
            <MenuItem w='fit-content' p={1} onClick={() => onDeleteFile(file.id)} >
              <Icon as={DeleteIcon} color={'red.400'} />
            </MenuItem>
          </HStack>
        </Menu>
      </VStack>
      <PdfModal title={file.publicName} url={file.url} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default FileBox