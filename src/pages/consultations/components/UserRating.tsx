import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { RatingModel } from '../../../api/model/rating.model'
import { UserModel } from '../../../api/model/user.model'

type Props = {
  user: UserModel & {
    ratedByCurrentUser?: boolean
    rating?: RatingModel
  }
}

export const UserRating = ({ user }: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number>(user?.rating?.value ?? 5)
  const [text, setText] = useState<string>(user?.rating?.text ?? '')

  return (
    <>
      <VStack p={2} justifyContent="center">
        {user.ratedByCurrentUser ? (
          <>
            <HStack>
              <Text>Te értékelésed: {user.rating?.value}</Text>
              <FaStar />
            </HStack>
            <Button colorScheme="brand" onClick={() => setOpen(true)}>
              Módosítás
            </Button>
          </>
        ) : (
          <Button colorScheme="brand" onClick={() => setOpen(true)}>
            Értékelés
          </Button>
        )}
      </VStack>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.fullName} értékelése</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <HStack width="100%">
                <Slider min={1} max={5} step={1} value={value} onChange={(e) => setValue(e)} mr={2}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text>{value}</Text>
                <FaStar />
              </HStack>
              <Textarea placeholder="Értékelés..." value={text} onChange={(e) => setText(e.target.value)} />
              <Button colorScheme="brand" width="100%" onClick={() => setOpen(false)}>
                Mentés
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
