import { Box, Button, Collapse, SimpleGrid, useDisclosure, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { RatingModel } from '../../../../api/model/rating.model'
import { PublicUser } from '../../types/PublicUser'
import { RatingListItem } from '../RatingListItem'

type Props = {
  ratings: (RatingModel & {
    rater: PublicUser
  })[]
  first: boolean
}

export const PresentationRatings = ({ ratings, first }: Props) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: first })
  const { t } = useTranslation()

  return (
    <VStack width="100%">
      <Box width="100%">
        <Collapse in={isOpen} animateOpacity>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w="100%">
            {ratings.map((r) => (
              <RatingListItem key={r.id} rating={r} />
            ))}
          </SimpleGrid>
        </Collapse>
      </Box>
      <Button width="100%" alignSelf="center" onClick={onToggle}>
        {t('profilePage.ratings')}&nbsp;{isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Button>
    </VStack>
  )
}
