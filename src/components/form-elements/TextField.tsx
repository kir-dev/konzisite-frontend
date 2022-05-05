import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { FC } from 'react'
import { useFormContext, ValidationRule } from 'react-hook-form'

type Props = {
  fieldName: string
  fieldTitle?: string
  helper?: JSX.Element
  defaultValue?: string
  validationOptions?: {
    maxLength?: number
    minLength?: number
    required?: boolean
    pattern?: ValidationRule<RegExp>
    setValueAs?: (value: any) => any
  }
}

export const TextField: FC<Props> = ({
  fieldTitle,
  fieldName,
  helper,
  defaultValue,
  validationOptions: { maxLength, minLength, required, pattern, setValueAs } = {}
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl isRequired={required} isInvalid={!!errors[fieldName]}>
      {fieldTitle && <FormLabel htmlFor={fieldName}>{fieldTitle}</FormLabel>}
      <Input
        id={fieldName}
        type="text"
        {...register(fieldName, {
          required: required ? 'Required field' : false,
          maxLength: maxLength ? { value: maxLength, message: `Too long, maximum length is ${maxLength} characters` } : undefined,
          minLength: minLength ? { value: minLength, message: `Too short, minimum length is ${minLength} characters` } : undefined,
          pattern,
          setValueAs
        })}
        defaultValue={defaultValue}
      />
      {errors?.[fieldName] ? (
        <FormErrorMessage>{errors[fieldName].message}</FormErrorMessage>
      ) : (
        helper && <FormHelperText>{helper}</FormHelperText>
      )}
    </FormControl>
  )
}
