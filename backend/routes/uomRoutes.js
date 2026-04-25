import express from "express";

import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import {
  allUOM,
  createUOM,
  deleteUOM,
  getUOM,
  updateUOM,
} from "../controllers/uomController.js";

console.log("🟢 uomRoutes loaded");

const router = express.Router();

router.post("/", protect, isAdmin, createUOM);
router.get("/", protect, allUOM);

router
  .route("/:id")
  .get(protect, getUOM)
  .put(protect, isAdmin, updateUOM)
  .delete(protect, isAdmin, deleteUOM);

export default router;
