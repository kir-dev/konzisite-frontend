import { Box, Container, Flex, HStack, Image, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { FC, MouseEvent } from 'react'
import { FaEnvelope, FaFacebook, FaGithub, FaGlobe, FaHeart, FaInstagram } from 'react-icons/fa'
import { Link as RRDLink } from 'react-router-dom'
import customTheme from '../../assets/theme'
import { PATHS } from '../../util/paths'

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
      <Container py={8} as={Flex} justifyContent="space-evenly" direction={{ base: 'column', sm: 'row' }} maxW="6xl">
        <HStack justify="center" spacing={5} mb={{ base: 8, sm: 0 }}>
          <VStack>
            <Link textAlign="center" href="https://vik.hk/" isExternal _hover={{ color: customTheme.colors.hk }}>
              VIK Hallgatói Képviselet
            </Link>

            <HStack spacing={2} mt={4} justify="space-evenly">
              <Link href="https:/vik.hk" isExternal _hover={{ color: customTheme.colors.hk }}>
                <FaGlobe size={25} />
              </Link>
              <Link href="https://www.facebook.com/vik.hk" isExternal _hover={{ color: customTheme.colors.hk }}>
                <FaFacebook size={25} />
              </Link>
              <Link href="mailto://hk@vik.hk" isExternal _hover={{ color: customTheme.colors.hk }}>
                <FaEnvelope size={25} />
              </Link>
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
            <HStack spacing={2} justify="center">
              <Text textAlign="center">Made with</Text>
              <FaHeart color="red" />
              <Text textAlign="center">
                by{' '}
                <Link href="https://kir-dev.hu" isExternal _hover={{ color: customTheme.colors.kirDev }}>
                  Kir-Dev
                </Link>
              </Text>
            </HStack>
            <Text textAlign="center">
              &copy; {new Date().getFullYear()} •{' '}
              <Link textAlign="center" as={RRDLink} to={PATHS.IMPRESSUM} _hover={{ color: customTheme.colors.kirDev }}>
                Impresszum
              </Link>
            </Text>

            <HStack spacing={2} mt={4} justify="space-evenly">
              <Link href="https://github.com/kir-dev" isExternal _hover={{ color: customTheme.colors.kirDev }}>
                <FaGithub size={25} />
              </Link>
              <Link href="https://kir-dev.hu" isExternal _hover={{ color: customTheme.colors.kirDev }}>
                <FaGlobe size={25} />
              </Link>
              <Link href="https://www.facebook.com/kirdevteam" isExternal _hover={{ color: customTheme.colors.kirDev }}>
                <FaFacebook size={25} />
              </Link>
              <Link href="https://www.instagram.com/kir.dev/" isExternal _hover={{ color: customTheme.colors.kirDev }}>
                <FaInstagram size={25} />
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </Container>
    </Box>
  )
}
