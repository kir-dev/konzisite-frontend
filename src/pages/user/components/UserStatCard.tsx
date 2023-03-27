import { Card, CardBody, SimpleGrid } from '@chakra-ui/react'
import { UserStats } from '../types/UserDetails'
import { StatData, UserStat } from './UserStat'

export const UserStatCard = ({ stats }: { stats?: UserStats }) => {
  const statData: StatData[] = [
    {
      value: stats?.presentationCount,
      label: 'Tartott konzi',
      explanation: `A felhasználó ${stats?.presentationCount} konzultáción volt előadó.`
    },
    {
      value: stats?.allParticipants,
      label: 'Konzi résztvevő',
      explanation: `Azokon a konzikon, ahol a felhasználó előadó volt, összesen ${stats?.allParticipants} hallgató vett részt.`
    },
    {
      value: stats?.ratingCount,
      label: 'Értékelés',
      explanation: `A felhasználó előadásaira összesen ${stats?.ratingCount} értékelés érkezett.`
    },
    {
      value: stats?.averageRating?.toFixed(2) || '-',
      label: 'Átlagos értékelés',
      explanation: stats?.averageRating
        ? `A felhasználó előadásainak átlagértékelése ${stats?.averageRating?.toFixed(2)}.`
        : 'A felhasználó előadásaira még nem érkezett értékelés.'
    },
    {
      value: stats?.participationCount,
      label: 'Konzi részvétel',
      explanation: `A felhasználó összesen ${stats?.participationCount} alkalommal vett részt más konzultációján.`
    },
    {
      value: stats?.requestCount,
      label: 'Kért konzi',
      explanation: `A felhasználó összesen ${stats?.requestCount} konzi kérést kezdeményezett vagy támogatott.`
    }
  ]
  return (
    <Card mb={5}>
      <CardBody>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} spacingY={5}>
          {statData.map((sd) => (
            <UserStat key={sd.label} data={sd} />
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  )
}
