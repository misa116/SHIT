/*import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(403).json({ message: "Name is required" });
  }

  const product = await Product.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(product);
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(201).json({ count: products.length, products });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(401).json({ message: "product Not Foound !" });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(403);
    throw new Error("Product Not Found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json(updateProduct);
});



export const deleteProduct = asyncHandler (async (req, res) => {
  const product = await Product.findById(req.params.id);

    if(!product) {
      return res.status(403).json("Product Not Found")
    }

    if(product) {
      await Product.deleteOne({_id: product._id});
    res.status(201).json({message :"Product Deleted"})
    } else {
      res.status(401)
      throw new Error("Not Found")
    }
});



*/


import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Product (Admin only)
export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const product = await Product.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(product);
});

// Get all products (Public)
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ count: products.length, products });
});

// Get single product (Public)
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product Not Found!" });
  }
});

// Update product (Admin only)
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedProduct);
});

// Delete product (Admin only)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  await Product.deleteOne({ _id: product._id });
  res.status(200).json({ message: "Product Deleted" });
});
