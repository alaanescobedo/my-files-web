import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import theme from '../src/utils/theme'
import Navbar from '../src/components/navbar'
import { AuthProvider } from '../src/store'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <Box bgImage='/bg.svg' display='flex' flexDirection='column' minH={'100vh'} w='full'>
              <Navbar />
              <Component {...pageProps} />
            </Box>
          </ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}
