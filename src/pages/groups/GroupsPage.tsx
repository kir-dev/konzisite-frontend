import { Button, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GroupRoles } from '../../api/model/group.model'
import { GroupList } from './components/GroupList'
import { testGroupsPreview } from './demoData'
import { GroupPreview } from './types/groupPreview'

export const GroupsPage = () => {
  const [groups, setGroups] = useState<GroupPreview[]>([])
  const [joinedGroups, setJoinedGroups] = useState<GroupPreview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setGroups(testGroupsPreview)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    setJoinedGroups(groups.filter((g) => g.currentUserRole != GroupRoles.NONE))
  }, [groups])

  return (
    <>
      <Heading size="xl" textAlign="center" mb={3}>
        Csoportok
      </Heading>
      <Button as={Link} to="/groups/new" colorScheme="brand">
        Új csoport létrehozása
      </Button>
      <GroupList groups={joinedGroups} title="Saját csoportok" showOwner={true} loading={loading} />
      <GroupList groups={groups} title="Minden csoport" showJoinButton={true} loading={loading} />
    </>
  )
}
