import {
  Box,
  Heading,
  Text,
  Image,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import React from "react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct } = useProductStore();
  const { updateProduct } = useProductStore();
  const toast = useToast();
  const handleUpdateProduct = async (id, updatedProduct) => {
    setAction("update");
    const { success, message } = await updateProduct(id, updatedProduct);
    onClose();
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
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleDeleteProduct = async (id) => {
    setAction("delete");
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
  const [action, setAction] = useState("");

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
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            onClick={() => {
              console.log("clicked"), onOpen;
            }}
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => {
              setAction("delete"), onOpen;
            }}
          />
        </HStack>
      </Box>
      {action === "update" && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Update Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
                  <Input
                    type="text"
                    placeholder="Product Name"
                    value={updatedProduct.name}
                    onChange={(e) => {
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      });
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Product Price"
                    value={updatedProduct.price}
                    onChange={(e) => {
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      });
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="Product Description"
                    value={updatedProduct.description}
                    onChange={(e) => {
                      setUpdatedProduct({
                        ...updatedProduct,
                        description: e.target.value,
                      });
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="Image URL"
                    value={updatedProduct.image}
                    onChange={(e) => {
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      });
                    }}
                  />{" "}
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() =>
                    handleUpdateProduct(product._id, updatedProduct)
                  }
                >
                  Update
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
      {
        /* Delete Modal */
        action === "delete" && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Delete Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Are you sure you want to delete this product?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="red"
                    mr={3}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        )
      }
    </Box>
  );
};

export default ProductCard;
