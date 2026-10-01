


import express from "express";
import {
  newOrder,
  allOrders,
  myOrders,
  orderDetails,
  updateOrder,
  updateOrderProcurement,
  deleteOrder,
  updateOrderDeliveryDate,
  updateOrderHoldStatus,
  updateBundleBuiltStatus,
    updateOrderJobsite,
  
startOrderDeliveryNavigation,
clearOrderDeliveryNavigation,
updateOrderDriverLocation,
stopOrderDriverLocation,
createDraftJobsiteOrder,
  
assignOrderToDriver,
clearOrdersPulled,
updateQuickCheckoutOrder,
  
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import jobsiteUpload from "../middlewares/jobsiteUploadMiddleware.js";


const router = express.Router();



// Create a new order → any logged-in user
router.post("/", protect, newOrder);


// Create draft jobsite order from Dashboard map pin
router.post("/draft-jobsite", protect, createDraftJobsiteOrder);




// Clear Quick Checkout orders from future Orders Pulled emails
router.put("/clear-orders-pulled", protect, clearOrdersPulled);

// Edit a saved Quick Checkout order and adjust inventory
router.put(
  "/:id/quick-checkout",
  protect,
  updateQuickCheckoutOrder
);


// Get all orders → admin OR procurement
router.get("/all", protect, allOrders);

// Get my orders → logged-in user only
router.get("/my", protect, myOrders);

// Get order details by ID → logged-in user only
router.get("/:id", protect, orderDetails);

// Mark order as delivered → admin only
router.put("/:id/deliver", protect, isAdmin, updateOrder);

// Mark order as received and restock → admin OR procurement
router.put("/:id/receive", protect, updateOrderProcurement);

// Delete an order → admin OR procurement
router.delete("/:id", protect, deleteOrder);

router
  .route("/:id/delivery-date")
  .put(protect, updateOrderDeliveryDate);


router
  .route("/:id/hold")
  .put(protect, updateOrderHoldStatus);


router
  .route("/:id/jobsite")
  .put(
    protect,
    jobsiteUpload.array("images", 10),
    updateOrderJobsite
  );


router
  .route("/:id/assign-driver")
  .put(protect, assignOrderToDriver);

router
  .route("/:id/delivery-start")
  .put(protect, startOrderDeliveryNavigation);

router
  .route("/:id/delivery-clear")
  .put(protect, clearOrderDeliveryNavigation);

router
  .route("/:id/driver-location")
  .put(protect, updateOrderDriverLocation);

router
  .route("/:id/driver-location-stop")
  .put(protect, stopOrderDriverLocation);



router
  .route("/:id/bundles/:bundleKey/built")
  .put(protect, updateBundleBuiltStatus);


export default router;





