import React from "react";
import { Box, Flex, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("teal.500", "teal.700");
  const textColor = useColorModeValue("white", "gray.200");

  return (
    <Box as="nav" bg={bgColor} color={textColor} py={4} px={8}>
      <Flex align="center" justify="space-between">
        <Heading as="h1" size="lg">
          Tacnique
        </Heading>
      </Flex>
    </Box>
  );
};

export default Navbar;
