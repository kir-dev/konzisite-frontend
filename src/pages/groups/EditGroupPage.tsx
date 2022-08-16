import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Skeleton, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GroupRoles } from '../../api/model/group.model'
import { ErrorPage } from '../error/ErrorPage'
import { testGroupsDetails } from './demoData'
import { GroupDetails } from './types/groupDetails'

type Props = {
  newGroup?: boolean
}

export const EditGroupPage = ({ newGroup = false }: Props) => {
  const [loading, setLoading] = useState(!newGroup)
  const [name, setName] = useState('')
  const [group, setGroup] = useState<GroupDetails | undefined>(undefined)
  const groupId = parseInt(useParams<{ groupId: string }>().groupId ?? '-1')

  const error = name == ''

  useEffect(() => {
    setTimeout(() => {
      const g = testGroupsDetails.find((g) => g.id === groupId)
      setGroup(g)
      setName(g?.name ?? '')
      setLoading(false)
    }, 1000)
  }, [])

  const submit = () => {
    if (newGroup) {
      alert(`create group ${name}`)
    } else {
      alert(`update group ${group?.id} name to ${name}`)
    }
  }

  if (loading)
    return (
      <>
        <VStack alignItems="flex-start">
          <Skeleton height="40px" width="50%" mb={3} alignSelf="center" />
          <Skeleton height="25px" width="80px" />
          <Skeleton height="40px" width="50%" />
          <Skeleton height="40px" width="100%" />
        </VStack>
      </>
    )
  else
    return (
      <>
        {(group === undefined || group.currentUserRole !== GroupRoles.OWNER) && !newGroup ? (
          group === undefined ? (
            <ErrorPage title="Nincs ilyen cspoort" messages={['A csoport amit keresel már nem létezik, vagy nem is létezett']} />
          ) : (
            <ErrorPage title="Nincs jogod" messages={['A csoportot csak a tulajdonosa szerkesztheti']} />
          )
        ) : (
          <>
            <Heading size="xl" textAlign="center" mb={3}>
              {newGroup ? 'Új csoport létrehozása' : `${group?.name ?? 'Névtelen csoport'} szerkesztése`}
            </Heading>
            <FormControl isInvalid={error}>
              <FormLabel htmlFor="name">Csoport neve</FormLabel>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="I01-es tankör" />
              {error && <FormErrorMessage>Név nem lehet üres</FormErrorMessage>}
            </FormControl>
            <Button mt={3} colorScheme="brand" onClick={submit} disabled={error}>
              {newGroup ? 'Létrehozás' : 'Mentés'}
            </Button>
          </>
        )}
      </>
    )
}
