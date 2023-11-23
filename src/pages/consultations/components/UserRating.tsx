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
  Tooltip,
  useColorModeValue,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useRateConsultationMutation, useUpdateRatingConsultationMutation } from '../../../api/hooks/consultationMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { RatingModel } from '../../../api/model/rating.model'
import { isValidId } from '../../../util/core-util-functions'
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
  const { t } = useTranslation()
  const { consultationId } = useParams()
  const sliderThumbColor = useColorModeValue('brand.500', 'white')

  const { mutate: rateConsultation } = useRateConsultationMutation(
    () => {
      toast({ title: t('userRating.ratingSuccess'), status: 'success' })
      refetch()
    },
    (e: KonziError) => {
      toast(generateToastParams(e))
    }
  )

  const { mutate: updateRatingConsultation } = useUpdateRatingConsultationMutation(
    () => {
      toast({ title: t('userRating.ratingUpdateSuccess'), status: 'success' })
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

  if (!consultationId || !isValidId(consultationId)) {
    return <ErrorPage status={404} title={t('userRating.konziNotFound')} />
  }

  return (
    <>
      <VStack p={2} justifyContent="center">
        {isParticipant && user.rating && (
          <>
            <HStack>
              <Text>
                {t('userRating.yourRating')} {user.rating?.value}
              </Text>
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
              {t('userRating.edit')}
            </Button>
          </>
        )}
        {isParticipant && !user.rating && (
          <Tooltip label={showRatingButton ? '' : t('userRating.rateAfterStart')} placement="left" hasArrow>
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
              {t('userRating.rate')}
            </Button>
          </Tooltip>
        )}
      </VStack>
      <Modal isCentered motionPreset="slideInBottom" isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('userRating.ratingOf', { user: user.fullName })}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="flex-start">
              <HStack width="100%">
                <Slider colorScheme="brand" min={1} max={5} step={1} value={value} onChange={(e) => setValue(e)} mr={2}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb bg={sliderThumbColor} />
                </Slider>
                <Text>{value}</Text>
                <FaStar />
              </HStack>
              <FormLabel>{t('userRating.comment')}Megjegyzés (opcionális)</FormLabel>
              <Textarea placeholder={t('userRating.rating')} value={text} onChange={(e) => setText(e.target.value)} />
              <Checkbox colorScheme="brand" isChecked={anonymous} onChange={(e) => setAnonymous(e.target.checked)}>
                {t('userRating.anonymus')} Értékelés névtelenül
              </Checkbox>
              {anonymous && (
                <Alert rounded="md" status="info">
                  <AlertIcon />
                  {t('userRating.anonymusMessage')}Attól még, hogy név nélkül értékelsz, az oldal adminjai továbbra is látni fogják a neved.
                  Kérlek értelmes kritikát írj!
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
                {t('userRating.save')}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
