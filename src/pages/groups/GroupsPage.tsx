import { Button, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GroupModel } from '../../api/model/group.model'
import { GroupList } from './components/GroupList'
import { testGroups } from './demoData'

export const GroupsPage = () => {
  const [groups, setGroups] = useState<GroupModel[]>([])
  const [ownedGroups, setOwnedGroups] = useState<GroupModel[]>([])
  const [joinedGroups, setJoinedGroups] = useState<GroupModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setGroups(testGroups)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    /*setOwnedGroups(groups.filter((g) => g.owner.id === currentUser.id))
    setJoinedGroups(groups.filter((g) => g.members.some((m) => m.id === currentUser.id)))*/
  }, [groups])

  return (
    <>
      <Heading size="xl" textAlign="center" mb={3}>
        Csoportok
      </Heading>
      <Button as={Link} to="/groups/new" colorScheme="brand">
        Új csoport létrehozása
      </Button>
      <GroupList groups={ownedGroups} title="Saját csoportok" showOwner={false} loading={loading} />
      <GroupList groups={joinedGroups} title="Saját csoportok 2.0?" showOwner={true} loading={loading} />
      <GroupList groups={groups} title="∀ csoport" showJoinButton={true} loading={loading} />
    </>
  )
}
