import { useToast } from '@chakra-ui/react'
import { RefObject, useEffect, useRef } from 'react'
import { UseMutationResult } from 'react-query'
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
              title: 'Hiba a fájl letöltése közben',
              description: 'Lehet hogy már törlésre került, vagy nincs jogod megtekinteni.',
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
