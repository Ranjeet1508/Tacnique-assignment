import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

const AddUserForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name,
        email,
        company: { name: department },
      })
      .then((response) => {
        toast({
          title: "User added.",
          description: "The user has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      })
      .catch(() => {
        toast({
          title: "Error.",
          description: "There was an error adding the user.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      p={6}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      maxW="md"
      mx="auto"
      mt={8}
    >
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            focusBorderColor="teal.400"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            focusBorderColor="teal.400"
          />
        </FormControl>
        <FormControl id="department" isRequired>
          <FormLabel>Department</FormLabel>
          <Input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
            focusBorderColor="teal.400"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          mt={4}
        >
          Add User
        </Button>
      </VStack>
    </Box>
  );
};

export default AddUserForm;
