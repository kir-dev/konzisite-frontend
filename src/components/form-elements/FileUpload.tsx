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
import { FC, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { FaFileImage, FaTimes } from 'react-icons/fa'

type Props = {
  fieldName: string
  fieldTitle?: string
  uploadButtonText?: string
  helper?: JSX.Element
  accept?: string
  multiple?: boolean
  required?: boolean
}

export const FileUpload: FC<Props> = ({
  fieldName,
  fieldTitle,
  uploadButtonText = 'Upload',
  helper,
  accept = 'image/*',
  multiple = false,
  required = false
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()

  const validateFiles = (value: FileList | undefined) => {
    if (!value) {
      return 'At least one file is required for upload!'
    }
    if (required && value.length < 1) {
      return 'At least one file is required for upload!'
    }
    if (!multiple && value.length > 1) {
      return 'Only one file is allowed for upload!'
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE_IN_MB = 10
      if (fsMb > MAX_FILE_SIZE_IN_MB) return 'File size cannot exceed 10 MB!'
    }
    return true
  }
  const registerProps = { ...register(fieldName, { required: 'Required field', validate: validateFiles }) }
  const onUploadPressed = () => inputRef.current?.click()
  const onRemovePressed = () => setValue(fieldName, undefined)

  return (
    <FormControl isRequired={required} isInvalid={!!errors[fieldName]}>
      {fieldTitle && <FormLabel htmlFor={fieldName}>{fieldTitle}</FormLabel>}
      <InputGroup>
        <input
          type="file"
          multiple={multiple}
          hidden
          accept={accept}
          {...registerProps}
          ref={(e) => {
            registerProps.ref(e)
            inputRef.current = e
          }}
        />
        <InputLeftAddon as={Button} leftIcon={<FaFileImage />} onClick={onUploadPressed}>
          {uploadButtonText}
        </InputLeftAddon>
        <Input value={watch(fieldName)?.item(0)?.name || 'No file chosen'} readOnly />
        <InputRightAddon as={IconButton} aria-label="Remove chosen file" icon={<FaTimes />} onClick={onRemovePressed} />
      </InputGroup>
      {errors?.[fieldName] ? (
        <FormErrorMessage>{errors[fieldName].message}</FormErrorMessage>
      ) : (
        helper && <FormHelperText>{helper}</FormHelperText>
      )}
    </FormControl>
  )
}
