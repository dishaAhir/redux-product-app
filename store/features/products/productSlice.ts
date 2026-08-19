import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockData } from "@/data/mockdata";

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface FormData {
  name: string;
  image: string;
  description: string;
}

interface ProductState {
  products: Product[];
  productBeingEdited: Product | null;
  formData: FormData;
}

const initialState: ProductState = {
  products: mockData,

  productBeingEdited: null,

  formData: {
    name: "",
    image: "/products/place-holder-image.jpg",
    description: "",                                                                                         
  },       
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
        (product) => product.id !== action.payload,
      );
    },

    // Update Product
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // Set Editing Product
    setProductBeingEdited: (
      state,
      action: PayloadAction<Product>,
    ) => {
      state.productBeingEdited = action.payload;
  
      state.formData = {
        name: action.payload.name,
        image: action.payload.image,
        description: action.payload.description,
      }; 
    },

    // Clear Editing Product
    clearProductBeingEdited: (state) => {
      state.productBeingEdited = null;

      state.formData = {
        name: "",
        image: "/products/place-holder-image.jpg",
        description: "",
      };
    },

    // Set Form Data
    setFormData: (
      state,
      action: PayloadAction<Partial<FormData>>,
    ) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  setProductBeingEdited,
  clearProductBeingEdited,
  setFormData,
} = productSlice.actions;

export default productSlice.reducer;