import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockData } from "@/data/mockdata";

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface ProductState {
  products: Product[];
  editingProduct: Product | null;
}

const initialState: ProductState = {
  products: mockData,
  editingProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Add Product
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },

    // Delete Product
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    // Update Product
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // Set Editing Product
    setEditingProduct: (state, action: PayloadAction<Product>) => {
      state.editingProduct = action.payload;
    },

    // Clear Editing Product
    clearEditingProduct: (state) => {
      state.editingProduct = null;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  setEditingProduct,
  clearEditingProduct,
} = productSlice.actions;

export default productSlice.reducer;