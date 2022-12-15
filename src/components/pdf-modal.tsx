import { AspectRatio, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"


export function PdfModal({ title, url, isOpen, onClose }: { title: string, url: string, isOpen: boolean, onClose: () => void }) {

  return (
    <>
      <Modal size={['full','5xl']} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AspectRatio ratio={16 / 9} h="100%" w="100%">
              <object frame-resize data={url} type="application/pdf" width="100%" height="100%"></object>
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}