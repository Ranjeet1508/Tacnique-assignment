import React, { useState, useEffect } from "react";
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

const EditUserForm = ({ user, onClose, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.company.name);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        name,
        email,
        company: { name: department },
      })
      .then((response) => {
        toast({
          title: "User updated.",
          description: "The user details have been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onUpdate(response.data);
        onClose();
      })
      .catch(() => {
        toast({
          title: "Error.",
          description: "There was an error updating the user.",
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
          Update User
        </Button>
      </VStack>
    </Box>
  );
};

export default EditUserForm;
