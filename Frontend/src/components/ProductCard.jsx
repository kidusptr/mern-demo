import {
  Box,
  Heading,
  Text,
  Image,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import React from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();
  const toast = useToast();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.4s"}
      bg={bgColor}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        w={"full"}
        h={48}
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text>{product.description}</Text>
        <Text fontWeight={"bold"} fontsize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            onClick={() => {}}
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
