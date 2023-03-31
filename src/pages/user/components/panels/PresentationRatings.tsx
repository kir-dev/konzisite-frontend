import { Box, Button, Collapse, SimpleGrid, useDisclosure, VStack } from '@chakra-ui/react'
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
        Értékelések&nbsp;{isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </Button>
    </VStack>
  )
}
