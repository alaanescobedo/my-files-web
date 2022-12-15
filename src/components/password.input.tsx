import { forwardRef, useState } from 'react'
import { InputGroup, Input, InputRightElement, Button, InputProps } from "@chakra-ui/react"

export const PasswordInput = forwardRef<HTMLInputElement>((props: InputProps, ref) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        ref={ref}
        {...props}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
})

PasswordInput.displayName = 'PasswordInput'