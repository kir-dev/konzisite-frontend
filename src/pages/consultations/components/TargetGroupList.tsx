import { Avatar, Box, Heading, HStack, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GroupModel } from '../../../api/model/group.model'
import { PATHS } from '../../../util/paths'

type Props = {
  groups: GroupModel[]
}

export const TargetGroupList = ({ groups }: Props) => {
  if (groups.length === 0) return null

  return (
    <>
      <Heading size="lg" mb={2} mt={2}>
        Célcsoport{groups.length === 1 ? '' : `ok (${groups.length})`}
      </Heading>
      <VStack alignItems="stretch">
        {groups.map((g) => (
          <Box key={g.id} shadow="md" borderRadius={8} borderWidth={1}>
            <HStack flexGrow={1} as={Link} to={`${PATHS.GROUPS}/${g.id}`} p={4}>
              <Avatar size="md" name={g.name} src={''} />
              <VStack flexGrow={1}>
                <Heading size="md" width="100%">
                  {g.name}
                </Heading>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </>
  )
}
