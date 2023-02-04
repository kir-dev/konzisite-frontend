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
import ReactMarkdown from 'react-markdown'
import { RemarkUIRenderer } from '../../assets/remark-ui-renderer'
import { KLink } from '../commons/KLink'
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

  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Szerkesztés</Tab>
        <Tab>Előnézet</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FormControl isInvalid={!!errors[formDetails.id]}>
            <FormLabel htmlFor={formDetails.id}>
              {`${formDetails.promptText} `}
              <KLink to="https://www.markdownguide.org/cheat-sheet/" isExternal>
                Markdown útmutató itt.
              </KLink>
            </FormLabel>
            <Textarea
              id={formDetails.id}
              placeholder="Add meg a markdown formátumú szöveged itt..."
              height={textAreaHeight}
              defaultValue={defaultValue}
              {...register(formDetails.id, {
                minLength: formDetails.minChar ? { value: formDetails.minChar, message: 'Szöveg nem lehet üres!' } : undefined,
                maxLength: { value: formDetails.maxChar, message: 'Szöveg túl hosszú!' }
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
            <ReactMarkdown components={RemarkUIRenderer()} children={watch(formDetails.id)} skipHtml />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
