import express from "express";

import {
  createDeliveryTrip,
  createDeliveryTruck,
  getDeliveryTrucks,
  getDeliveryTrips,
  startDeliveryTrip,
  markTripReturning,
  completeDeliveryTrip,
} from "../controllers/deliveryTripController.js";


import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/trips", protect, createDeliveryTrip);

router.post("/trucks", protect, createDeliveryTruck);

router.get("/trucks", protect, getDeliveryTrucks);



router.get("/trips", protect, getDeliveryTrips);

router.post("/trips/:id/start", protect, startDeliveryTrip);

router.post("/trips/:id/returning", protect, markTripReturning);

router.post("/trips/:id/complete", protect, completeDeliveryTrip);


export default router;
