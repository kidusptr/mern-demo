import {
  Container,
  Heading,
  Box,
  Button,
  useColorModeValue,
  VStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const toast = useToast();
  const { addProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await addProduct(newProduct);
    console.log(success, message);
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

    setNewProduct({ name: "", price: "", description: "", image: "" });
  };

  return (
    <Container maxW={Container.sm}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"lg"}
          shadow={"nd"}
          p={6}
        >
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
            />
            <Input
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value });
              }}
            />
            <Input
              type="text"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) => {
                setNewProduct({ ...newProduct, description: e.target.value });
              }}
            />

            <Input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => {
                setNewProduct({ ...newProduct, image: e.target.value });
              }}
            />
            <Button colorScheme={"blue"} onClick={handleAddProduct} w="full">
              Submit
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AddProduct;
