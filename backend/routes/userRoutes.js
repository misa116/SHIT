/* import express from "express";
import { editUserClr, signIn, registerUser, listUsers,
 } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

console.log("🟢 userRoutes loaded");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signIn);
router.get("/", protect, listUsers);
router.put("/:id", protect, editUserClr);

export default router;
*/

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { signIn, registerUser, listUsers, editUserClr } from "../controllers/userController.js";

const router = express.Router();

// Existing routes
router.post("/register", registerUser);
router.post("/login", signIn);
router.get("/", protect, listUsers);
router.put("/:id", protect, editUserClr);

// ✅ NEW: Check login
router.get("/profile", protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    dept: req.user.dept,
    isAdmin: req.user.isAdmin,
  });
});

export default router;
