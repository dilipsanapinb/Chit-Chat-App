import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const SignUp = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmedpassword, setConfirmassaword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast=useToast()
    // handleCkick show and hide the password
    const handleCkick = () => setShow(!show)
    // https://api.cloudinary.com/v1_1/dvq5ovjvg
    // add image postdetails
    const postDetails = (pics) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duraton: 5000,
                isClosable: true,
                position: "button"
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            // data.append("upload_preset", "Chit-Chat-App"),
            // data.append("Cloud_name", "Chit-Chat-App"),
            // fetch("https://api.cloudinary.com/v1_1/dvq5ovjvg")
            
        }
    }

    // submit the form
    const submitHandler = () => {
    
    }

    return <VStack spacing='5px' color='black'>
        {/* name */}
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)}></Input>
        </FormControl>

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
        {/* conform the password */}
        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            {/* enter the password */}
            <InputGroup>
                <Input
                    // if sho then show the text else show the password format
                    type={show ? "text" : "password"}
                    placeholder='Confirm the password' onChange={(e) => setConfirmassaword(e.target.value)}></Input>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleCkick}>
                        {/* toggle the sow and hide */}
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    
        {/* Add the picture */}
        <FormControl id='pic'>
            <FormLabel>Upload your Picture </FormLabel>
            <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
            ></Input>
        </FormControl>

        {/* sign up button */}
        <Button
            colorScheme="blue"
            width={'100%'}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        >
            Sign Up
        </Button>
    
    </VStack>
}

export default SignUp