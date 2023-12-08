import { Card, CardBody, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { UserStats } from '../types/UserDetails'
import { StatData, UserStat } from './UserStat'

export const UserStatCard = ({ stats }: { stats?: UserStats }) => {
  const { t } = useTranslation()
  const statData: StatData[] = [
    {
      value: stats?.presentationCount,
      label: t('profilePage.presLabel', { count: stats?.presentationCount }),
      explanation: t('profilePage.presExpl', { count: stats?.presentationCount })
    },
    {
      value: stats?.allParticipants,
      label: t('profilePage.allParLabel', { count: stats?.allParticipants }),
      explanation: t('profilePage.allParExpl', { count: stats?.allParticipants })
    },
    {
      value: stats?.ratingCount,
      label: t('profilePage.ratingCountLabel', { count: stats?.ratingCount }),
      explanation: t('profilePage.ratingCountExpl', { count: stats?.ratingCount })
    },
    {
      value: stats?.averageRating?.toFixed(2) || '-',
      label: t('profilePage.avgRatingLabel'),
      explanation: stats?.averageRating
        ? t('profilePage.avgRatingExpl', { data: stats?.averageRating?.toFixed(2) })
        : t('profilePage.avgRatingExplNoRating')
    },
    {
      value: stats?.participationCount,
      label: t('profilePage.parCountLabel', { count: stats?.participationCount }),
      explanation: t('profilePage.parCountExpl', { count: stats?.participationCount })
    },
    {
      value: stats?.requestCount,
      label: t('profilePage.reqCountLabel', { count: stats?.requestCount }),
      explanation: t('profilePage.reqCountExpl', { count: stats?.requestCount })
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
