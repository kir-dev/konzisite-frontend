import { useToast } from '@chakra-ui/react'
import { UseMutationResult } from '@tanstack/react-query'
import { RefObject, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HasChildren } from '../../util/react-types.util'

type Props<T> = {
  buttonRef: RefObject<HTMLButtonElement>
  downloadMutation: UseMutationResult<ArrayBuffer, ArrayBuffer, T, unknown>
  params: T
  fileName: string
} & HasChildren

export const DownloadFileFromServerButton = <T,>({ buttonRef, downloadMutation, params, children, fileName }: Props<T>) => {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const toast = useToast()
  const { t } = useTranslation()
  useEffect(() => {
    if (buttonRef?.current) {
      buttonRef.current.onclick = () => {
        downloadMutation.mutate(params, {
          onSuccess: (rawFile: ArrayBuffer) => {
            const blob = new Blob([rawFile])
            if (anchorRef.current) {
              anchorRef.current.href = URL.createObjectURL(blob)
              anchorRef.current.click()
            }
          },
          onError: () => {
            toast({
              title: t('errors.downloadError'),
              description: t('errors.downloadErrorDesc'),
              status: 'error'
            })
          }
        })
      }
    }
  }, [downloadMutation])

  return (
    <>
      <a ref={anchorRef} download={fileName} hidden />
      {children}
    </>
  )
}
