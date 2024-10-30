import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW={"1140px"}
      px={4}
      position={"sticky"}
      top={0}
      zIndex={10}
      bgColor={colorMode === "light" ? "white" : "gray.800"}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "row", sm: "row" }}
      >
        <Text
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textTransform={"uppercase"}
          textAlign={"center"}
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
        >
          <Link to={"/"}>My Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/add"}>
            <Button>
              <PlusSquareIcon />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
