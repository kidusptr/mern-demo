import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Heading,
  Text,
  Image,
  Button,
  Input,
  VStack,
  HStack,
  Box,
  Divider,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const ProductDetails = () => {
  const { id } = useParams();
  const { colorMode, toggleColorMode } = useColorMode();
  const { products, updateProduct, deleteProduct } = useProductStore();
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setUpdatedProduct(foundProduct);
    }
  }, [id, products]);

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(id);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) navigate("/");
  };

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(id, updatedProduct);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) setEditMode(false);
  };

  if (!product) return <Text>Loading...</Text>;

  return (
    <Container maxW="container.md" py={12}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p={6}
        bgColor={colorMode === "light" ? "white" : "gray.800"}
      >
        <VStack spacing={6}>
          <Heading size="lg" textAlign="center">
            {editMode ? "Edit Product" : product.name}
          </Heading>
          <Divider />

          {editMode ? (
            <VStack spacing={4} align="stretch" w="full">
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
              <Button colorScheme="blue" onClick={handleUpdate} w="full">
                Save Changes
              </Button>
            </VStack>
          ) : (
            <VStack spacing={4} align="center">
              <Image
                src={product.image}
                alt={product.name}
                //boxSize="400px"
                h={300}
                w="full"
                objectFit="cover"
                borderRadius="md"
                boxShadow="sm"
              />
              <Text fontSize="2xl" fontWeight="bold">
                Price: ${product.price}
              </Text>
              <Text fontSize="lg" color="gray.600">
                {product.description}
              </Text>
            </VStack>
          )}

          <HStack spacing={4} mt={6}>
            <Button
              colorScheme="teal"
              onClick={() => setEditMode(!editMode)}
              w="full"
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
            <Button colorScheme="red" onClick={handleDelete} w="full">
              Delete
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default ProductDetails;
