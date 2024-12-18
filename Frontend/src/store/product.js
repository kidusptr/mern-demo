import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  fcmToken:
    "fcxCJWCSSkiQATcNFoEXFQ:APA91bHFtnMsHq7MlbynnsAHZwEWCq19cvnAJb9YrEBu_8n3dybyNbiwsXNcXdsz6wo84KEvGDkj-jZRJ4LrenGch0xEEiqoYHwfE3xoTyTY4nxOICGaa0Q", // Add token to state
  setFcmToken: (token) =>
    set({
      fcmToken:
        "fcxCJWCSSkiQATcNFoEXFQ:APA91bHFtnMsHq7MlbynnsAHZwEWCq19cvnAJb9YrEBu_8n3dybyNbiwsXNcXdsz6wo84KEvGDkj-jZRJ4LrenGch0xEEiqoYHwfE3xoTyTY4nxOICGaa0Q",
    }),
  setProducts: (products) => set({ products }),
  addProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      return {
        success: false,
        message: "Please make sure to provide all necessary fields",
      };
    }

    const { fcmToken } = useProductStore.getState(); // Retrieve the FCM token

    const requestBody = { ...newProduct, fcmToken }; // Add the token to the request body
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log(fcmToken);

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

  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (id, updatedProduct) => {
    const { fcmToken } = useProductStore.getState(); // Retrieve the FCM token

    const requestBody = { ...updatedProduct, fcmToken }; // Add the token to the request body
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
