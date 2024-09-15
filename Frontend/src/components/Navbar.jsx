import { Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text></Text>
      </Flex>
    </Container>
  );
};

export default Navbar;
