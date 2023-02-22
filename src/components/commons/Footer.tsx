import { Box, Container, Flex, HStack, Image, Link, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { FC, MouseEvent } from 'react'
import { FaEnvelope, FaFacebook, FaGithub, FaGlobe, FaHeart, FaInstagram } from 'react-icons/fa'
import { Link as RRDLink } from 'react-router-dom'
import customTheme from '../../assets/theme'
import { PATHS } from '../../util/paths'
import { ColorfulExternalLink } from './ColorfulExternalLink'

export const Footer: FC = () => {
  const kirDevLogo = useColorModeValue('/img/kirdev.svg', '/img/kirdev-white.svg')
  const hkLogo = useColorModeValue('/img/hk.svg', '/img/hk-white.svg')

  const mouseEventFn = (logoPath: string) =>
    useColorModeValue(
      () => {},
      (e: MouseEvent<HTMLImageElement>) => (e.currentTarget.src = logoPath)
    )

  return (
    <Box as="footer">
      <Container py={8} as={Flex} align="center" justifyContent="space-evenly" direction={{ base: 'column', m: 'row' }} maxW="6xl">
        <HStack justify="center" spacing={{ base: 0, m: 5 }} mb={{ base: 12, m: 0 }}>
          <VStack>
            <ColorfulExternalLink centered url="https://vik.hk/" hoverColor={customTheme.colors.hk}>
              VIK Hallgatói Képviselet
            </ColorfulExternalLink>

            <HStack spacing={2} mt={4} justify="space-evenly">
              <ColorfulExternalLink url="https:/vik.hk" hoverColor={customTheme.colors.hk}>
                <FaGlobe size={25} />
              </ColorfulExternalLink>
              <ColorfulExternalLink url="https://www.facebook.com/vik.hk" hoverColor={customTheme.colors.hk}>
                <FaFacebook size={25} />
              </ColorfulExternalLink>
              <ColorfulExternalLink url="mailto:hk@vik.hk" hoverColor={customTheme.colors.hk}>
                <FaEnvelope size={25} />
              </ColorfulExternalLink>
            </HStack>
          </VStack>

          <Link href="https://vik.hk/" isExternal>
            <Image onMouseOver={mouseEventFn('/img/hk-white-alt.svg')} onMouseOut={mouseEventFn(hkLogo)} src={hkLogo} maxW={40} maxH={40} />
          </Link>
        </HStack>

        <HStack justify="center" spacing={5}>
          <Link href="https:/kir-dev.hu" isExternal>
            <Image
              onMouseOver={mouseEventFn('/img/kirdev-white-alt.svg')}
              onMouseOut={mouseEventFn(kirDevLogo)}
              src={kirDevLogo}
              maxW={40}
              maxH={40}
            />
          </Link>

          <VStack>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={2} justify="center" align="center">
              <Text textAlign="center">Made with</Text>
              <FaHeart fontSize="1.5rem" color="red" />
              <Text textAlign="center">
                by{' '}
                <ColorfulExternalLink url="https://kir-dev.hu" hoverColor={customTheme.colors.kirDev}>
                  Kir-Dev
                </ColorfulExternalLink>
              </Text>
            </Stack>
            <Text textAlign="center">
              &copy; {new Date().getFullYear()} •{' '}
              <Link textAlign="center" as={RRDLink} to={PATHS.IMPRESSUM} _hover={{ color: customTheme.colors.kirDev }}>
                Impresszum
              </Link>
            </Text>

            <HStack spacing={2} mt={4} justify="space-evenly">
              <ColorfulExternalLink url="https://github.com/kir-dev" hoverColor={customTheme.colors.kirDev}>
                <FaGithub size={25} />
              </ColorfulExternalLink>
              <ColorfulExternalLink url="https://kir-dev.hu" hoverColor={customTheme.colors.kirDev}>
                <FaGlobe size={25} />
              </ColorfulExternalLink>
              <ColorfulExternalLink url="https://www.facebook.com/kirdevteam" hoverColor={customTheme.colors.kirDev}>
                <FaFacebook size={25} />
              </ColorfulExternalLink>
              <ColorfulExternalLink url="https://www.instagram.com/kir.dev/" hoverColor={customTheme.colors.kirDev}>
                <FaInstagram size={25} />
              </ColorfulExternalLink>
            </HStack>
          </VStack>
        </HStack>
      </Container>
    </Box>
  )
}
