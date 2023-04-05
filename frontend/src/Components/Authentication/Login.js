import React from 'react'
import { Button, FormControl, FormLabel, Input, InputRightElement, VStack,InputGroup } from '@chakra-ui/react';
import {useState} from 'react'
const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // handleCkick show and hide the password
    const handleCkick = () => setShow(!show)

    // submit the form
    const submitHandler = () => {
    
    }
    return <VStack spacing='5px' color='black'>
    
        {/* email */}
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your email eg.dilipinbsanap@gmail.com' onChange={(e) => setEmail(e.target.value)}></Input>
        </FormControl>

        {/* password */}
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            {/* enter the password */}
            <InputGroup>
                <Input
                    // if sho then show the text else show the password format
                    type={show ? "text" : "password"}
                    placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}></Input>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleCkick}>
                        {/* toggle the sow and hide */}
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    

        {/* sign up button */}
        <Button
            colorScheme="blue"
            width={'100%'}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        >
            Login
        </Button>
   
        {/* guest user button */}
        <Button
            variant={'solid'}
            colorScheme="red"
            width={'100%'}
            // style={{ marginTop: 15 }}
            onClick={() => {
                setEmail("guest@example.com");
                setPassword("12345")
            }}
        >
            Get Guest User Credentials
        </Button>
    
    </VStack>
}

export default Login