import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Badge,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { User, useUser } from '../store';

export default function UserCard({ user }: { user: User }) {
  const { user: userAuth } = useUser()
  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size="xl"
            src={user.avatar?.url}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <HStack>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {user.username}
              </Heading>
              {userAuth?.id === user.id && (
                <Badge colorScheme={'blue'}>
                  Me
                </Badge>
              )}
            </HStack>
            <Text color={'gray.500'}>{user.email}</Text>
          </Stack>
          <Button
            as={NextLink}
            href={`/profiles/${user.username}`}
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            View Profile
          </Button>
        </Box>
      </Box>
    </Center>
  );
}