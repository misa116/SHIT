/*import express from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";



console.log("🟢 productRoutes loaded");


const router = express.Router();

router.post("/create", protect, isAdmin, createProduct);
router.route("/").get(protect, getProducts);
router
.route("/:id")
.get(protect, getProduct)
.put(protect, updateProduct)
.delete(protect, deleteProduct);

export default router;
*/

/*
import express from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

console.log("🟢 productRoutes loaded");

const router = express.Router();

// Public routes → anyone can see products
router.get("/", getProducts);
router.get("/:id", getProduct);

// Protected routes → only admins or authenticated users
router.post("/create", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;

*/




// backend/routes/productRoutes.js
import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";



const router = express.Router();

// Create product -> Admin only
router.post("/create", protect, isAdmin, upload.single("image"), createProduct);

// Get all products -> Any logged in user
router.route("/").get(protect, getProducts);

// Get product -> Any logged in user
// Update / Delete -> Admin only
router
  .route("/:id")
  .get(protect, getProduct)
  .put(protect, isAdmin, upload.single("image"), updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
