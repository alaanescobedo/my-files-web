import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertDescription,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useForm } from "react-hook-form";
import { PasswordInput } from '../../src/components/password.input';
import { RenderIf } from '../../src/components/render-if';
import { useAuth } from '../../src/store';

export default function Login() {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });
  const { loading, login, error: errorAuth } = useAuth({
    redirectOnAuth: '/'
  })

  const onSubmit = handleSubmit(async data => {
    if (!data.username || !data.password) return
    await login(data.username, data.password)
  })

  return (
    <Flex
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} w='full'>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.400'} bg={'gray.900'} p={2}>
            to enjoy all of our cool features ✌️
            {loading && 'loading...'}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          as={'form'}
          onSubmit={onSubmit}
        >
          <Stack spacing={4}>
            <RenderIf condition={errorAuth !== null}>
              <Alert status='error' wordBreak={"break-word"}>
                <AlertIcon />
                <AlertDescription>{errorAuth}</AlertDescription>
              </Alert>
            </RenderIf>

            <RenderIf condition={!errorAuth && loading}>
              <Alert status='loading' justifyContent={'center'}>
                <Spinner />
              </Alert>
            </RenderIf>

            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="username" {...register("username")} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <PasswordInput {...register("password")} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'end'}>
                {/* <Checkbox>Remember me</Checkbox> */}
                <Link as={NextLink} href={"/auth/forgot-password"} color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                type={'submit'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                You dont have a user? <Link as={NextLink} href={'/auth/register'} color={'blue.400'}>Register</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}