import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useProductStore } from "./store/product.js";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const setFcmToken = useProductStore((state) => state.setFcmToken);

  useEffect(() => {
    // Define the event listener function separately
    const handleMessage = (event) => {
      if (event.data) {
        setFcmToken(event.data);
      }
    };

    // Add event listener
    window.addEventListener("message", handleMessage);

    // Clean up event listener on unmount
    return () => window.removeEventListener("message", handleMessage);
  }, [setFcmToken]);
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />{" "}
          {/* Route for product details */}
        </Routes>
      </Box>
    </>
  );
}

export default App;
