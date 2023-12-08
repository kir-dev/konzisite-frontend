import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { ReactElement, RefObject, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface ConfirmDialogButtonProps {
  headerText?: string
  bodyText?: string
  initiatorButton: ReactElement
  initiatorButtonRef: RefObject<HTMLButtonElement>
  buttonColorScheme?: string
  confirmButtonText?: string
  refuseButtonText?: string
  confirmAction: () => void
}

export const ConfirmDialogButton = ({
  headerText,
  bodyText,
  initiatorButton,
  initiatorButtonRef,
  buttonColorScheme = 'red',
  confirmButtonText = 'misc.yes',
  refuseButtonText = 'misc.cancel',
  confirmAction
}: ConfirmDialogButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (initiatorButtonRef?.current) {
      initiatorButtonRef.current.onclick = onOpen
    }
  }, [])

  return (
    <>
      {initiatorButton}
      <AlertDialog
        preserveScrollBarGap={true}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          {headerText && <AlertDialogHeader>{headerText}</AlertDialogHeader>}
          <AlertDialogCloseButton />
          {bodyText && <AlertDialogBody>{bodyText}</AlertDialogBody>}
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t(refuseButtonText)}
            </Button>
            <Button colorScheme={buttonColorScheme} ml={3} onClick={confirmAction}>
              {t(confirmButtonText)}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
