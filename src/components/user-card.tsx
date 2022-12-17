import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
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
        bg={'gray.800'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>

        <Box p={4} bg={'blue.900'}>
          <Avatar
            size="xl"
            src={userAuth?.id === user.id ? userAuth?.avatar?.url : user.avatar?.url}
            border={'2px solid white'}
          />
        </Box>

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
            href={userAuth?.id === user.id ? '/user/files' : `/profiles/${user.username}`}
            w={'full'}
            mt={8}
            bg={'blue.900'}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
              bg: "blue.800"
            }}>
            View Profile
          </Button>
        </Box>
      </Box>
    </Center>
  );
}