/*
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createUomService,
 createCatgoryService,

  getCategoriesService,
  getUomService,
} from "./reduxService/productServices";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  Uom: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const getCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      return await getCategoriesService();
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


export const getUoms = createAsyncThunk(
  "uom/getAll",
  async (_, thunkAPI) => {
    try {
      return await getUomService();
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


export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, thunkAPI) => {
    try {
      return await createCatgoryService(formData);
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


export const createUom = createAsyncThunk(
  "uom/create",
  async (formData, thunkAPI) => {
    try {
      return await createUomService(formData);
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



const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload.categories;

      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })




      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
        toast.success("New Category Successfully Added");

      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      


        .addCase(getUoms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUoms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Uom = action.payload.Uom;

      })
      .addCase(getUoms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      

      .addCase(createUom.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(createUom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.uom = action.payload;
        toast.success("New Category Successfully Added");

      })
      .addCase(createUom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
*/













/*


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createUomService,
 createCatgoryService,

  getCategoriesService,
  getUomService,
} from "./reduxService/productServices";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  Uom: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const getCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      return await getCategoriesService();
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


export const getUoms = createAsyncThunk(
  "uom/getAll",
  async (_, thunkAPI) => {
    try {
      return await getUomService();
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


export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, thunkAPI) => {
    try {
      return await createCatgoryService(formData);
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


export const createUom = createAsyncThunk(
  "uom/create",
  async (formData, thunkAPI) => {
    try {
      return await createUomService(formData);
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



const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload.categories;

      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })




      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
        toast.success("New Category Successfully Added");

      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      


        .addCase(getUoms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUoms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Uom = action.payload.Uom;

      })
      .addCase(getUoms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      

      .addCase(createUom.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(createUom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.uom = action.payload;
        toast.success("New Category Successfully Added");

      })
      .addCase(createUom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;

*/













/*

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUomService,
  createCatgoryService,
  getCategoriesService,
  getUomService,
} from "./reduxService/productServices";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  uom: [],
  isLoading: false,
  isError: false,
  message: "",
  isSuccess: false,
};

// Get all categories
export const getCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      return await getCategoriesService();
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

// Get all UOMs
export const getUoms = createAsyncThunk(
  "uom/getAll",
  async (_, thunkAPI) => {
    try {
      return await getUomService();
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

// Create a new category
export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, thunkAPI) => {
    try {
      return await createCatgoryService(formData);
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

// Create a new UOM
export const createUom = createAsyncThunk(
  "uom/create",
  async (formData, thunkAPI) => {
    try {
      return await createUomService(formData);
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get categories
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload.categories || action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get UOMs
      .addCase(getUoms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUoms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.uom = action.payload.Uom || action.payload;
      })
      .addCase(getUoms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
        toast.success("New Category Successfully Added");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Create UOM
      .addCase(createUom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.uom.push(action.payload);
        toast.success("New UOM Successfully Added");
      })
      .addCase(createUom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetStatus } = categorySlice.actions;
export default categorySlice.reducer;

*/




/*
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUomService, createCatgoryService, getCategoriesService, getUomService } from "./reduxService/productServices";
import { toast } from "react-toastify";

const initialState = { categories: [], uom: [], isLoading: false, isError: false, message: "", isSuccess: false };

export const getCategories = createAsyncThunk("category/getAll", async (_, thunkAPI) => {
  try { return await getCategoriesService(); } 
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

export const getUoms = createAsyncThunk("uom/getAll", async (_, thunkAPI) => {
  try { return await getUomService(); } 
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

export const createCategory = createAsyncThunk("category/create", async (formData, thunkAPI) => {
  try { return await createCatgoryService(formData); } 
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

export const createUom = createAsyncThunk("uom/create", async (formData, thunkAPI) => {
  try { return await createUomService(formData); } 
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: { resetStatus: (state) => { state.isError = false; state.isSuccess = false; state.message = ""; state.isLoading = false; } },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => { state.isLoading = true; })
      .addCase(getCategories.fulfilled, (state, action) => { state.isLoading = false; state.isSuccess = true; state.categories = action.payload.categories || action.payload; })
      .addCase(getCategories.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; toast.error(action.payload); })
      .addCase(getUoms.pending, (state) => { state.isLoading = true; })
      .addCase(getUoms.fulfilled, (state, action) => { state.isLoading = false; state.isSuccess = true; state.uom = action.payload.Uom || action.payload; })
      .addCase(getUoms.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; toast.error(action.payload); })
      .addCase(createCategory.fulfilled, (state, action) => { state.categories.push(action.payload); toast.success("New Category Added"); })
      .addCase(createUom.fulfilled, (state, action) => { state.uom.push(action.payload); toast.success("New UOM Added"); });
  },
});

export const { resetStatus } = categorySlice.actions;
export default categorySlice.reducer;
*/






import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUomService,
  createCatgoryService,
  getCategoriesService,
  getUomService,
} from "./reduxService/productServices";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  uom: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Thunks
export const getCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      return await getCategoriesService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUoms = createAsyncThunk(
  "uom/getAll",
  async (_, thunkAPI) => {
    try {
      return await getUomService();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, thunkAPI) => {
    try {
      return await createCatgoryService(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createUom = createAsyncThunk(
  "uom/create",
  async (formData, thunkAPI) => {
    try {
      return await createUomService(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(getCategories.pending, (state) => { state.isLoading = true; })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload.categories || action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        toast.success("New Category Successfully Added");
      })

      // UOMs
      .addCase(getUoms.pending, (state) => { state.isLoading = true; })
      .addCase(getUoms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.uom = action.payload.Uom || action.payload;
      })
      .addCase(getUoms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createUom.fulfilled, (state, action) => {
        state.uom.push(action.payload);
        toast.success("New UOM Successfully Added");
      });
  },
});

export default categorySlice.reducer;
