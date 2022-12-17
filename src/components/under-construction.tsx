import { Stack, useColorModeValue, chakra, Button, Box, Heading, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa';
import { BsDiscord } from 'react-icons/bs';

export const UnderConstructionBox = () => {
  return (
    <Box display='flex' flexDirection={'column'} flex='1'>
      <Stack
        pos="relative"
        bgGradient="linear(to-r, blue.400, purple.400)"
        height="250px"
        w="100%"
        opacity={0.4}
      ></Stack>
      <Box maxW="3xl" p={4} px='0' isolation="isolate" zIndex={3} mt="-10rem" marginInline="auto" flex='1' sx={{ zIndex: '1' }}>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={{ base: 4, sm: 8 }}
          overflow="hidden"
          rounded="2xl"
        >
          <Stack pos="relative" zIndex={1} direction="column" spacing={5} textAlign="left">
            <Heading fontSize="4xl" lineHeight={1.2} fontWeight="bold">
              Under Contruction 🚧
            </Heading>
            <Heading as='h3' color="gray.400" fontSize="lg" maxW="600px" lineHeight={1.2}>
              The user dont have any files yet, or was seeded as a demo user.
            </Heading>
            <Heading as='h3' color="gray.400" fontSize="lg" maxW="600px" lineHeight={1.2}>
              This project is under construction. If you want to keep up to date with it, you can follow the updates on the following pages.
            </Heading>

            <Stack >
              <Button
                as={Link}
                href="https://alaanescobedo-dev.vercel.app/projects/my-files-app"
                target={'_blank'}
                h={10}
                px={6}
                color="white"
                fontSize="md"
                variant="solid"
                rounded="md"
                lineHeight={1}
                bg="blue.600"
                _hover={{ bg: 'blue.500' }}
              >
                About the project (Spanish)
              </Button>
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>

              <Button
                leftIcon={<FaGithub />}
                as={Link}
                href="https://github.com/alaanescobedo/my-files-web"
                target={'_blank'}
                rounded="md"
                colorScheme="gray"
                variant="solid"
              >
                Github repository (Frontend)
              </Button>
              <Button
                leftIcon={<FaGithub />}
                as={Link}
                href="https://github.com/alaanescobedo/my-files-api-springboot"
                target={'_blank'}
                rounded="md"
                colorScheme="gray"
                variant="solid"
              >
                Github repository (Backend Spring Boot)
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Stack
        pos="relative"
        bgGradient="linear(to-r, blue.400, purple.400)"
        height="250px"
        w="100%"
        opacity={0.4}
      ></Stack>
    </Box>
  )
}

export default UnderConstructionBox