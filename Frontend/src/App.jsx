import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useProductStore } from "../store/product.js";

function App() {
  const setFcmToken = useProductStore((state) => state.setFcmToken);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      // Save token to Zustand when received from WebView
      if (event.data) {
        setFcmToken(event.data);
      }
    });

    return () => window.removeEventListener("message", listener);
  }, [setFcmToken]);
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
