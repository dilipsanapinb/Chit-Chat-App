import React, { useEffect } from 'react'
import { Box, Container, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel,useBreakpointValue } from '@chakra-ui/react';
import Login from '../Components/Authentication/Login';
import SignUp from '../Components/Authentication/SignUp';
import { redirect } from 'react-router-dom';

const titleContainerStyle = {
//   display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px',
  background: 'linear-gradient(to right, #FF6B6B, #6B7BFF)', // Gradient background
  borderRadius: '12px', // Rounded corners
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
};

const titleTextStyle = {
  fontSize: '3xl',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Text shadow
  textAlign: 'center',
};


const HomePage = () => {
    const maxContainerWidth = useBreakpointValue({
      base: '100%',
      sm: '60%',
      md: '60%',
    });
    // const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) {
            redirect('/chats')
        }
    }, []);

    return (
      <Container maxW={maxContainerWidth} centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg={'white'}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="1g"
          borderWidth="1px"
        >
          {/* <img src='./images/chat logo design.png' alt="Chit-Chat Logo" /> */}
          <div style={titleContainerStyle}>
            <Text fontSize="4xl" fontFamily="Work sans" style={titleTextStyle}>
              Chit-Chat-App
            </Text>
          </div>
        </Box>

        <Box bg="white" w="100%" p={4} borderRadius="1g" borderWidth="1px">
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    );
};
export default HomePage