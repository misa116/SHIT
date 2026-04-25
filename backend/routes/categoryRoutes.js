 import express from "express";
import {
  allCategory,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

console.log("🟢 categoryRoutes loaded");


const router = express.Router();

router.route("/create").post(protect, isAdmin, createCategory);
router.route("/").get(protect, allCategory);
router.route("/:id").delete(protect, isAdmin, deleteCategory);
export default router;
