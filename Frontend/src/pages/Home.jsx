import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Products List
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {!products.length && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            color={"gray.500"}
          >
            No Products Found{" "}
            <Link to={"/add"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Add Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Home;
