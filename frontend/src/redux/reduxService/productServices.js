/* import axios from "axios";
import { CATEGORY_URL, PRODUCTS_URL, UOM_URL } from "../constants";



export const createProductService = async (formData) => {
  const response = await axios.post(`${PRODUCTS_URL}/create`, formData);

  return response.data;
};

export const getUomService = async (id) => {
  const response = await axios.get(UOM_URL);

  return response.data;
};


export const getProductService = async (id) => {
  const response = await axios.get(`${PRODUCTS_URL}/${id}`);

  return response.data;
};




// Service to update a product
export const updateProductService = async (id, formData) => {
  const response = await axios.put(`${PRODUCTS_URL}/${id}`, formData);
  return response.data;
};


export const deleteProductService = async (id) => {
  const response = await axios.delete(`${PRODUCTS_URL}/${id}`);
  return response.data;
};


export const createCatgoryService = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}/create`, formData);
  return response.data;
};

export const getCategoriesService = async () => {
  const response = await axios.get(CATEGORY_URL);
  return response.data;
};

export const createUomService = async (formData) => {
  const response = await axios.post(UOM_URL, formData);
  return response.data;
};

*/











/*
import axios from "axios";
import { CATEGORY_URL, PRODUCTS_URL, UOM_URL } from "../constants";

export const createProductService = async (formData) => {
  const response = await axios.post(`${PRODUCTS_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

export const getUomService = async () => {
  const response = await axios.get(UOM_URL, {
    withCredentials: true,
  });
  return response.data;
};

export const getProductService = async (id) => {
  const response = await axios.get(`${PRODUCTS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateProductService = async (id, formData) => {
  const response = await axios.put(`${PRODUCTS_URL}/${id}`, formData, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteProductService = async (id) => {
  const response = await axios.delete(`${PRODUCTS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createCatgoryService = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

export const getCategoriesService = async () => {
  const response = await axios.get(CATEGORY_URL, {
    withCredentials: true,
  });
  return response.data;
};

export const createUomService = async (formData) => {
  const response = await axios.post(UOM_URL, formData, {
    withCredentials: true,
  });
  return response.data;
};
*/







/*
  import axios from "axios";
import { CATEGORY_URL, PRODUCTS_URL, UOM_URL } from "../constants";

// ✅ Create product (protected)
export const createProductService = async (formData) => {
  const response = await axios.post(`${PRODUCTS_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Get all UOMs (PUBLIC)
export const getUomService = async () => {
  const response = await axios.get(UOM_URL); // no withCredentials
  return response.data;
};

// ✅ Get single product (PUBLIC)
export const getProductService = async (id) => {
  const response = await axios.get(`${PRODUCTS_URL}/${id}`); // no withCredentials
  return response.data;
};

// ✅ Update product (protected)
export const updateProductService = async (id, formData) => {
  const response = await axios.put(`${PRODUCTS_URL}/${id}`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Delete product (protected)
export const deleteProductService = async (id) => {
  const response = await axios.delete(`${PRODUCTS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Create category (protected)
export const createCatgoryService = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Get categories (PUBLIC)
export const getCategoriesService = async () => {
  const response = await axios.get(CATEGORY_URL); // no withCredentials
  return response.data;
};

// ✅ Create UOM (protected)
export const createUomService = async (formData) => {
  const response = await axios.post(UOM_URL, formData, {
    withCredentials: true,
  });
  return response.data;
};
*/





/*
 import axios from "axios";
import { CATEGORY_URL, PRODUCTS_URL, UOM_URL } from "../constants";

// Create product (protected)
export const createProductService = async (formData) => {
  const response = await axios.post(`${PRODUCTS_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// Get all UOMs (even public) – this uses credentials, which causes the old multi-device issue
export const getUomService = async () => {
  const response = await axios.get(UOM_URL, {
    withCredentials: true,
  });
  return response.data;
};

// Get single product (even public) – also uses credentials
export const getProductService = async (id) => {
  const response = await axios.get(`${PRODUCTS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Update product (protected)
export const updateProductService = async (id, formData) => {
  const response = await axios.put(`${PRODUCTS_URL}/${id}`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// Delete product (protected)
export const deleteProductService = async (id) => {
  const response = await axios.delete(`${PRODUCTS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Create category (protected)
export const createCatgoryService = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// Get categories (even public)
export const getCategoriesService = async () => {
  const response = await axios.get(CATEGORY_URL, {
    withCredentials: true,
  });
  return response.data;
};

// Create UOM (protected)
export const createUomService = async (formData) => {
  const response = await axios.post(UOM_URL, formData, {
    withCredentials: true,
  });
  return response.data;
};
*/
















import axios from "axios";
import { CATEGORY_URL, PRODUCTS_URL, UOM_URL } from "../constants";

// ✅ Create product (protected)
export const createProductService = async (formData) => {
  const response = await axios.post(`${PRODUCTS_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Get all products (protected, multi-device support)
export const getAllProductsService = async () => {
  const response = await axios.get(PRODUCTS_URL, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Get single product (requires ID)
export const getProductService = async (id) => {
  if (!id) throw new Error("Product ID is required");
  const response = await axios.get(`${PRODUCTS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Update product (protected)
export const updateProductService = async (id, formData) => {
  if (!id) throw new Error("Product ID is required");
  const response = await axios.put(`${PRODUCTS_URL}/${id}`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Delete product (protected)
export const deleteProductService = async (id) => {
  if (!id) throw new Error("Product ID is required");
  const response = await axios.delete(`${PRODUCTS_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Create category (protected)
export const createCatgoryService = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}/create`, formData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Get all categories (protected, multi-device support)
export const getCategoriesService = async () => {
  const response = await axios.get(CATEGORY_URL, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Create UOM (protected)
export const createUomService = async (formData) => {
  const response = await axios.post(UOM_URL, formData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Get all UOMs (protected, multi-device support)
export const getUomService = async () => {
  const response = await axios.get(UOM_URL, {
    withCredentials: true,
  });
  return response.data;
};
