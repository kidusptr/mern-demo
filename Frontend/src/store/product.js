import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      return {
        success: false,
        message: "Please make sure to provide all necessary fields",
      };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return {
      success: true,
      message: "Product added successfully",
    };
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    set({ products: data.data });
  },
}));
