import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  FormLabel,
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
  useToast,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useRateConsultationMutation, useUpdateRatingConsultationMutation } from '../../../api/hooks/consultationMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { RatingModel } from '../../../api/model/rating.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { ErrorPage } from '../../error/ErrorPage'
import { PublicUser } from '../../user/types/PublicUser'

type Props = {
  user: PublicUser & {
    rating?: RatingModel
  }
  isParticipant: boolean
  showRatingButton: boolean
  refetch: () => {}
}

export const UserRating = ({ isParticipant, user, showRatingButton, refetch }: Props) => {
  const toast = useToast()
  const { consultationId } = useParams()

  const { mutate: rateConsultation } = useRateConsultationMutation(
    () => {
      toast({ title: 'Sikeresen értékeltél!', status: 'success' })
      refetch()
    },
    (e: KonziError) => {
      toast(generateToastParams(e))
    }
  )

  const { mutate: updateRatingConsultation } = useUpdateRatingConsultationMutation(
    () => {
      toast({ title: 'Sikeresen frissítetted az értékelést!', status: 'success' })
      refetch()
    },
    (e: KonziError) => {
      toast(generateToastParams(e))
    }
  )

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number>(user.rating?.value ?? 5)
  const [text, setText] = useState<string>(user.rating?.text ?? '')
  const [anonymous, setAnonymous] = useState<boolean>(!!user.rating?.anonymous)

  if (consultationId === undefined || isNaN(+consultationId)) {
    return <ErrorPage backPath={'/'} status={404} title={'A konzultáció nem található!'} />
  }

  return (
    <>
      <VStack p={2} justifyContent="center">
        {isParticipant && user.rating && (
          <>
            <HStack>
              <Text>Te értékelésed: {user.rating?.value}</Text>
              <FaStar />
            </HStack>
            <Button
              width="100%"
              colorScheme="brand"
              onClick={() => {
                setText(user.rating!!.text)
                setValue(user.rating!!.value)
                setAnonymous(user.rating!!.anonymous)
                setOpen(true)
              }}
            >
              Módosítás
            </Button>
          </>
        )}
        {isParticipant && !user.rating && (
          <Button
            width="100%"
            colorScheme="brand"
            isDisabled={!showRatingButton}
            onClick={() => {
              setText('')
              setValue(5)
              setAnonymous(false)
              setOpen(true)
            }}
          >
            Értékelés
          </Button>
        )}
      </VStack>
      <Modal isCentered motionPreset="slideInBottom" isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.fullName} értékelése</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align={'flex-start'}>
              <HStack width="100%">
                <Slider colorScheme="brand" min={1} max={5} step={1} value={value} onChange={(e) => setValue(e)} mr={2}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text>{value}</Text>
                <FaStar />
              </HStack>
              <FormLabel>Megjegyzés (opcionális)</FormLabel>
              <Textarea placeholder="Értékelés..." value={text} onChange={(e) => setText(e.target.value)} />
              <Checkbox colorScheme="brand" isChecked={anonymous} onChange={(e) => setAnonymous(e.target.checked)}>
                Értékelés névtelenül
              </Checkbox>
              {anonymous && (
                <Alert status="info">
                  <AlertIcon />
                  Attól még, hogy név nélkül értékelsz, az oldal adminjai továbbra is látni fogják a neved. Kérlek értelmes kritikát írj.
                </Alert>
              )}
              <Button
                colorScheme="brand"
                width="100%"
                onClick={() => {
                  user.rating
                    ? updateRatingConsultation({
                        data: { ratedUserId: user.id, anonymous: anonymous, text: text, value: value },
                        consultationId: +consultationId
                      })
                    : rateConsultation({
                        data: { ratedUserId: user.id, anonymous: anonymous, text: text, value: value },
                        consultationId: +consultationId
                      })
                  setOpen(false)
                }}
              >
                Mentés
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
