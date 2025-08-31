/* import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_URL } from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createProductService,
  getProductService,
  updateProductService,
  deleteProductService,
} from "./reduxService/productServices";

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
};

//getall produts
export const getProducts = createAsyncThunk(
  "products/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${PRODUCTS_URL}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get single product detail
export const getProduct = createAsyncThunk(
  "product/detail",
  async (id, thunkAPI) => {
    try {
      return await getProductService(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteProductService(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);



//create Product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await createProductService(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await updateProductService(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      
          .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        toast.success("Product Deleted Successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
      
      ;
  },
});

export const { resetStatus } = productSlice.actions;

export default productSlice.reducer;

*/


/*
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_URL } from "./constants";
import { toast } from "react-toastify";
import {
  createProductService,
  getProductService,
  updateProductService,
  deleteProductService,
} from "./reduxService/productServices.js";

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all products
export const getProducts = createAsyncThunk(
  "products/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(PRODUCTS_URL, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single product detail
export const getProduct = createAsyncThunk(
  "product/detail",
  async (id, thunkAPI) => {
    try {
      return await getProductService(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteProductService(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await createProductService(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await updateProductService(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload);
        toast.success("Product created successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetStatus } = productSlice.actions;

export default productSlice.reducer;

*/









/*
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createProductService,
  getProductService,
  updateProductService,
  deleteProductService,
} from "./reduxService/productServices";

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProducts = createAsyncThunk("products/all", async (_, thunkAPI) => {
  try {
    return await getProductService(); // adjusted for your last productServices.js
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getProduct = createAsyncThunk("product/detail", async (id, thunkAPI) => {
  try {
    return await getProductService(id);
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await createProductService(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await updateProductService(id, formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id, thunkAPI) => {
  try {
    return await deleteProductService(id);
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => { state.isLoading = true; })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products || action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // repeat similar for getProduct, createProduct, updateProduct, deleteProduct
  },
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;
*/
























//THE CODE FIXES EVERYTHING RIGHT HERE

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createProductService,
  getAllProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
} from "./reduxService/productServices";

const initialState = {
  products: [],
  product: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ✅ Fetch all products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllProductsService();
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Fetch single product
export const getProduct = createAsyncThunk(
  "products/getOne",
  async (id, thunkAPI) => {
    try {
      return await getProductService(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Create a new product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await createProductService(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Update a product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await updateProductService(id, formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Delete a product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteProductService(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => { state.isLoading = true; })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products || action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get single product
      .addCase(getProduct.pending, (state) => { state.isLoading = true; })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Create product
      .addCase(createProduct.pending, (state) => { state.isLoading = true; })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
        toast.success("Product created successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update product
      .addCase(updateProduct.pending, (state) => { state.isLoading = true; })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        // Update product in products list
        state.products = state.products.map(p => p._id === action.payload._id ? action.payload : p);
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => { state.isLoading = true; })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(p => p._id !== action.payload._id);
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetStatus } = productSlice.actions;
export default productSlice.reducer;
