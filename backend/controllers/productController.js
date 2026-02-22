/*import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(403).json({ message: "Name is required" });
  }


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









/* wrks wrks gna test images tho 2 22 2026 
import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Create Product (Admin only)
export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  // 🔥 Parse manufacturers & suppliers from FormData
  if (req.body.manufacturers) {
    req.body.manufacturers = JSON.parse(req.body.manufacturers);
  }

  if (req.body.suppliers) {
    req.body.suppliers = JSON.parse(req.body.suppliers);
  }

let images = [];

if (req.files && req.files.length > 0) {
images = req.files.map(
  (file) => file.path || file.secure_url
);}
  
const product = await Product.create({
  ...req.body,
  images,           // new multiple images
  image: images[0] || "", // optional fallback
  user: req.user._id,
});

  res.status(201).json(product);
});

// ✅ Get all products (Public)
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ count: products.length, products });
});

// ✅ Get single product (Public)
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found!" });
  }

  res.status(200).json(product);
});

// ✅ Update product (Admin only)
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  // 🔥 Parse manufacturers & suppliers
  if (req.body.manufacturers) {
    req.body.manufacturers = JSON.parse(req.body.manufacturers);
  }

  if (req.body.suppliers) {
    req.body.suppliers = JSON.parse(req.body.suppliers);
  }

  if (req.files && req.files.length > 0) {
  const images = req.files.map((file) => file.path || file.secure_url);
  req.body.images = images;
  req.body.image = images[0]; // keep fallback
}

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedProduct);
});

// ✅ Delete product (Admin only)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  await Product.deleteOne({ _id: product._id });

  res.status(200).json({ message: "Product Deleted" });
});
*/



      
import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Create Product (Admin only)
export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  // 🔥 Parse manufacturers & suppliers from FormData
  if (req.body.manufacturers) {
    req.body.manufacturers = JSON.parse(req.body.manufacturer);
  }

  if (req.body.suppliers) {
    req.body.suppliers = JSON.parse(req.body.supplier);
  }

let images = [];

if (req.files && req.files.length > 0) {
images = req.files.map(
  (file) => file.path || file.secure_url
);}
  
const product = await Product.create({
  ...req.body,
  images,           // new multiple images
  image: images[0] || "", // optional fallback
  user: req.user._id,
});

  res.status(201).json(product);
});

// ✅ Get all products (Public)
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ count: products.length, products });
});

// ✅ Get single product (Public)
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found!" });
  }

  res.status(200).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  // Parse JSON fields if sent as FormData
  if (req.body.manufacturers) {
    req.body.manufacturers = JSON.parse(req.body.manufacturers);
  }

  if (req.body.suppliers) {
    req.body.suppliers = JSON.parse(req.body.suppliers);
  }

  let images = [];

  // ✅ Keep existing images that frontend sent back
  if (req.body.existingImages) {
    images = JSON.parse(req.body.existingImages);
  }

  // ✅ Add newly uploaded images
  if (req.files && req.files.length > 0) {
    const newUploaded = req.files.map(
      (file) => file.path || file.secure_url
    );
    images = [...images, ...newUploaded];
  }

  req.body.images = images;
  req.body.image = images[0] || ""; // fallback first image

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedProduct);
});








// ✅ Delete product (Admin only)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  await Product.deleteOne({ _id: product._id });

  res.status(200).json({ message: "Product Deleted" });
});
