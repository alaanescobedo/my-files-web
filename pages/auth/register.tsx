import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertDescription,
  AlertIcon,
  Spinner
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth, useUser } from '../../src/store';
import { PasswordInput } from '../../src/components/password.input';

export default function Register() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });
  const { loading, register: registerAuth, error: errorAuth, onSuccess } = useAuth()

  const onSubmit = handleSubmit(async data => {
    await registerAuth(data.username, data.email, data.password)
    if (!errorAuth) reset()
  })

  const handleFillWithDemoData = () => {
    setValue('username', 'demo_user')
    setValue('email', 'demo@user.com')
    setValue('password', 'demo_password')
  }

  onSuccess({ redirectTo: '/' })

  return (
    <Flex
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={6} w={'full'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.400'} bg={'gray.900'} p={2}>
            to enjoy all of our cool features ✌️
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

            {errorAuth && (
              <Alert status='error' wordBreak={"break-word"}>
                <AlertIcon />
                <AlertDescription>{errorAuth}</AlertDescription>
              </Alert>
            )}
            {!errorAuth && loading && (
              <Alert status='loading' justifyContent={'center'}>
                <Spinner />
              </Alert>
            )}

            <Button onClick={handleFillWithDemoData}>
              Fill with demo data
            </Button>
            <FormControl id="firstName" isRequired>
              <FormLabel>Usename</FormLabel>
              <Input type="text" {...register("username")} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register("email")} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <PasswordInput {...register("password")} />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link as={NextLink} href={'/auth/login'} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}