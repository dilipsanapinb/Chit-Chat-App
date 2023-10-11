import React from 'react';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputRightElement, InputGroup, Image } from '@chakra-ui/react';
import { VStack, Box } from '@chakra-ui/layout';
import { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};
const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = ChatState();
  // handleCkick show and hide the password
  const handleCkick = () => setShow(!show);
  // submit the form
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://127.0.0.1:5000/api/user/login',
        { email, password },
        config,
      );

      // console.log(JSON.stringify(data));
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };
  return (
    <Box
      display={'flex'}
      flexDirection={{ base: 'Column', md: 'row' }}
      alignItems={'center'}
    >
      <Image
        src={require('../../Images/login.jpg')}
        alt="Login Image"
        width={{ base: '100%', md: '40%' }}
        height={'100%'}
        objectFit={'cover'}
      />
      {/* login form */}
      <VStack width={{ base: '100%', md: '60%' }} spacing="5px" color="black">
        {/* email */}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your email eg.dilipinbsanap@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>

        {/* password */}
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          {/* enter the password */}
          <InputGroup>
            <Input
              // if sho then show the text else show the password format
              type={show ? 'text' : 'password'}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleCkick}>
                {/* toggle the sow and hide */}
                {show ? 'Hide' : 'Show'}
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
          isLoading={loading}
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
            setEmail('guest@example.com');
            setPassword('12345');
          }}
        >
          Login as guest
        </Button>
        <Button
          variant={'solid'}
          style={{
            width: '100%',
            outline: 'none',
            backgroundColor: 'white',
            boxShadow:
              'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px',
            fontSize: '16px',
            fontWeight: '500',
            color: '#2c444e',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={buttonContainerStyle}>
            <Image
              src={require('../../Images/google.png')}
              style={{ width: '30px', height: '30px', objectFit: 'cover' }}
            ></Image>
          </div>
          Login with Google
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
