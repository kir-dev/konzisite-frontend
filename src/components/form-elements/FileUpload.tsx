import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react'
import { FC, ReactElement, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaTimes } from 'react-icons/fa'

type Props = {
  fieldName: string
  fieldTitle?: string
  uploadButtonText?: string
  helper?: JSX.Element
  accept?: string
  required?: boolean
  maxFileSizeMB?: number
  buttonIcon: ReactElement
}

export const FileUpload: FC<Props> = ({
  fieldName,
  fieldTitle,
  uploadButtonText = 'Feltöltés',
  helper,
  accept = 'image/*',
  required = false,
  maxFileSizeMB = 10,
  buttonIcon
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()
  const { t } = useTranslation()

  const validateFiles = (value: FileList | undefined) => {
    if (!value) {
      return t('misc.min1file')
    }
    if (required && value.length < 1) {
      return t('misc.min1file')
    }
    if (value.length > 1) {
      return t('misc.max1File')
    }
    const fsMb = value[0].size / (1024 * 1024)
    if (fsMb > maxFileSizeMB) return t('misc.maxSize', { size: maxFileSizeMB })
    return true
  }

  const registerProps = { ...register(fieldName, { required: t('misc.requiredField'), validate: validateFiles }) }
  const onUploadPressed = () => inputRef.current?.click()
  const onRemovePressed = () => setValue(fieldName, undefined)

  return (
    <FormControl isRequired={required} isInvalid={!!errors[fieldName]}>
      {fieldTitle && <FormLabel htmlFor={fieldName}>{fieldTitle}</FormLabel>}
      <InputGroup>
        <input
          type="file"
          hidden
          accept={accept}
          {...registerProps}
          ref={(e) => {
            registerProps.ref(e)
            inputRef.current = e
          }}
        />
        <InputLeftAddon as={Button} leftIcon={buttonIcon} onClick={onUploadPressed}>
          {uploadButtonText}
        </InputLeftAddon>
        <Input value={watch(fieldName)?.item(0)?.name || t('misc.noFile')} readOnly onClick={onUploadPressed} cursor="pointer" />
        <InputRightAddon as={IconButton} aria-label={t('misc.undoSelection')} icon={<FaTimes />} onClick={onRemovePressed} />
      </InputGroup>
      {errors?.[fieldName] ? (
        <FormErrorMessage>{errors[fieldName]?.message?.toString()}</FormErrorMessage>
      ) : (
        helper && <FormHelperText>{helper}</FormHelperText>
      )}
    </FormControl>
  )
}
