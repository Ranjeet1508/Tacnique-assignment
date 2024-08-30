import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Spinner,
    Alert,
    AlertIcon,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Flex,
    IconButton,
    HStack
} from "@chakra-ui/react";
import axios from "axios";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const usersPerPage = 5;

    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onClose: onAddClose,
    } = useDisclosure();
    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onClose: onEditClose,
    } = useDisclosure();

    useEffect(() => {
        fetchUsers(currentPage, usersPerPage);
    }, [currentPage]);

    const fetchUsers = (page, limit) => {
        setLoading(true);
        axios
            .get(`https://jsonplaceholder.typicode.com/users`, {
                params: {
                    _page: page,
                    _limit: limit,
                },
            })
            .then((response) => {
                // Assuming the total count is available in a header
                const totalCount = parseInt(response.headers["x-total-count"], 10);
                setTotalPages(Math.ceil(totalCount / limit));
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch users");
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(() => {
                fetchUsers(currentPage, usersPerPage); // Refresh users after deletion
            })
            .catch(() => {
                setError("Failed to delete user");
            });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        onEditOpen();
    };

    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => {
            if (direction === "next" && prevPage < totalPages) return prevPage + 1;
            if (direction === "prev" && prevPage > 1) return prevPage - 1;
            return prevPage;
        });
    };

    if (loading) {
        return (
            <Box textAlign="center" mt="20">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert status="error" mt="20">
                <AlertIcon />
                {error}
            </Alert>
        );
    }

    return (
        <Box p="5">
            <Button colorScheme="teal" mb="4" onClick={onAddOpen}>
                Add User
            </Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Email</Th>
                        <Th>Department</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user.id}>
                            <Td>{user.id}</Td>
                            <Td>{user.name.split(" ")[0]}</Td>
                            <Td>{user.name.split(" ")[1]}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.company.name}</Td>
                            <Td>
                                <Button colorScheme="blue" size="sm" mr="2" onClick={() => handleEdit(user)}>
                                    Edit
                                </Button>
                                <Button colorScheme="red" size="sm" onClick={() => handleDelete(user.id)}>
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Flex mt="4" justify="center" align="center">
                <HStack spacing="4"> 
                    <IconButton
                        aria-label="Previous Page"
                        icon={<ChevronLeftIcon />}
                        onClick={() => handlePageChange("prev")}
                        isDisabled={currentPage === 1}
                    />
                    <Text>
                        Page {currentPage} of {totalPages}
                    </Text>
                    <IconButton
                        aria-label="Next Page"
                        icon={<ChevronRightIcon />}
                        onClick={() => handlePageChange("next")}
                        isDisabled={currentPage === totalPages}
                    />
                </HStack>
            </Flex>

            {/* Add User Modal */}
            <Modal isOpen={isAddOpen} onClose={onAddClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New User</ModalHeader>
                    <ModalBody>
                        <AddUserForm onClose={onAddClose} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onAddClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Edit User Modal */}
            <Modal isOpen={isEditOpen} onClose={onEditClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalBody>
                        <EditUserForm user={editingUser} onClose={onEditClose} onUpdate={(updatedUser) => {
                            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
                        }} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onEditClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Users;
