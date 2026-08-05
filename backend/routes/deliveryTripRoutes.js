import express from "express";

import {
  createDeliveryTrip,
  createDeliveryTruck,
  getDeliveryTrucks,
} from "../controllers/deliveryTripController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/trips", protect, createDeliveryTrip);

router.post("/trucks", protect, createDeliveryTruck);

router.get("/trucks", protect, getDeliveryTrucks);

export default router;
