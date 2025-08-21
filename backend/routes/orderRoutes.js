/*import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  allOrders,
  myOrders,
  newOrder,
  orderDetails,
  updateOderItemPrice,
  updateOrder,
  updateOrderProcurement,
  updateOrderReceived,
  deleteOrder,
} from "../controllers/orderController.js";

 console.log("🟢 orderRoutes loaded");


const router = express.Router();

// Create order
router.post("/create", protect, newOrder);

// More specific routes FIRST
router.route("/mine").get(protect, myOrders);
router.route("/deliver-dept/:id").put(protect, updateOrderProcurement);
router.route("/:id/receive").put(protect, updateOrderReceived);
router.route("/:id/updatestock").put(protect, updateOrder);

// ✅ Fixed this line:
router.put("/updateItemPrice/:itemId", protect, updateOderItemPrice);

// General routes LAST
router.get("/", protect, allOrders);
router
  .route("/:id")
  .get(protect, orderDetails)
  .delete(protect, deleteOrder);

export default router;

*/


// backend/routes/orderRoutes.js
import express from "express";
import {
  newOrder,
  allOrders,
  myOrders,
  orderDetails,
  updateOrder,
  updateOrderProcurement,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new order → any logged-in user
router.post("/", protect, newOrder);

// Get all orders → admin only
router.get("/all", protect, isAdmin, allOrders);

// Get my orders → logged-in user only
router.get("/my", protect, myOrders);

// Get order details by ID → logged-in user only
router.get("/:id", protect, orderDetails);

// Mark order as delivered → admin only
router.put("/:id/deliver", protect, isAdmin, updateOrder);

// Mark order as received and restock → admin only
router.put("/:id/receive", protect, isAdmin, updateOrderProcurement);

// Delete an order → admin only
router.delete("/:id", protect, isAdmin, deleteOrder);

export default router;
