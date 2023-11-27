import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea
} from '@chakra-ui/react'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KLink } from '../commons/KLink'
import Markdown from '../commons/Markdown'
import { getStatusString } from './editorUtils'

type Props = {
  formDetails: {
    id: string
    promptText: string
    minChar?: number
    maxChar: number
  }
  defaultValue?: string
  textAreaHeight?: string | number
  previewHeight?: string | number
}

export const MarkdownEditor: FC<Props> = ({ textAreaHeight = '22rem', previewHeight = '26rem', defaultValue, formDetails }) => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation()

  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>{t('markdown.edit')}</Tab>
        <Tab>{t('markdown.preview')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FormControl isInvalid={!!errors[formDetails.id]}>
            <FormLabel htmlFor={formDetails.id}>
              {`${formDetails.promptText} `}
              <KLink to="https://www.markdownguide.org/cheat-sheet/" isExternal>
                {t('markdown.help')}
              </KLink>
            </FormLabel>
            <Textarea
              id={formDetails.id}
              placeholder={t('markdown.placeholder')}
              height={textAreaHeight}
              defaultValue={defaultValue}
              {...register(formDetails.id, {
                minLength: formDetails.minChar ? { value: formDetails.minChar, message: t('markdown.noEmpty') } : undefined,
                maxLength: { value: formDetails.maxChar, message: t('markdown.tooLong') }
              })}
              isInvalid={!!errors[formDetails.id]}
            />
            <Flex justifyContent="flex-end">
              {errors[formDetails.id] ? (
                <FormErrorMessage>
                  {errors[formDetails.id]?.message?.toString()} {getStatusString(watch(formDetails.id), formDetails.maxChar)}
                </FormErrorMessage>
              ) : (
                <FormHelperText>{getStatusString(watch(formDetails.id), formDetails.maxChar)}</FormHelperText>
              )}
            </Flex>
          </FormControl>
        </TabPanel>
        <TabPanel>
          <Box maxHeight={previewHeight} overflowY="scroll">
            <Markdown markdown={watch(formDetails.id)} />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
