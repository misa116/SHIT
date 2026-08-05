import DeliveryTrip from "../models/deliveryTripModal.js";
import DeliveryTruck from "../models/deliveryTruckModal.js";
import Order from "../models/orderModal.js";
import User from "../models/userModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ----------------------------
// Create a delivery trip
// Company department or Admin only
// ----------------------------
export const createDeliveryTrip = asyncHandler(async (req, res) => {
  const {
    deliveryDate,
    truck,
    primaryDriver,
    crewMembers = [],
    stops = [],
  } = req.body;

  const userDept = String(
    req.user?.dept || req.user?.clearance || ""
  ).toLowerCase();

  const canManageTrips =
    req.user?.isAdmin === true || userDept === "company";

  if (!canManageTrips) {
    return res.status(403).json({
      message:
        "Only Company department or Admin users can create delivery trips",
    });
  }

  if (!deliveryDate) {
    return res.status(400).json({
      message: "Delivery date is required",
    });
  }

  if (!truck) {
    return res.status(400).json({
      message: "Select a truck",
    });
  }

  if (!primaryDriver) {
    return res.status(400).json({
      message: "Select a primary driver",
    });
  }

  if (!Array.isArray(stops) || stops.length === 0) {
    return res.status(400).json({
      message: "Select at least one order for this trip",
    });
  }

  const selectedTruck = await DeliveryTruck.findById(truck);

  if (!selectedTruck) {
    return res.status(404).json({
      message: "Truck was not found",
    });
  }

  if (!selectedTruck.isActive) {
    return res.status(400).json({
      message: "This truck is inactive",
    });
  }

  const selectedDriver = await User.findById(primaryDriver);

  if (!selectedDriver) {
    return res.status(404).json({
      message: "Primary driver was not found",
    });
  }

  const normalizedStops = stops.map((stop, index) => ({
    order: stop.order || stop.orderId,
    stopOrder: Number(stop.stopOrder || index + 1),
    status: "pending",
  }));

  const orderIds = normalizedStops
    .map((stop) => stop.order)
    .filter(Boolean);

  if (orderIds.length !== normalizedStops.length) {
    return res.status(400).json({
      message: "One or more trip stops are missing an order",
    });
  }

  const orders = await Order.find({
    _id: { $in: orderIds },
  });

  if (orders.length !== orderIds.length) {
    return res.status(404).json({
      message: "One or more selected orders were not found",
    });
  }

  const orderAlreadyOnTrip = orders.find(
    (order) => order.deliveryTrip
  );

  if (orderAlreadyOnTrip) {
    return res.status(400).json({
      message:
        "One or more selected orders are already assigned to a delivery trip",
    });
  }

  const normalizedCrewMembers = [];

  for (const member of crewMembers) {
    const memberId = member.user || member.userId;

    if (!memberId) continue;

    const crewUser = await User.findById(memberId);

    if (!crewUser) {
      return res.status(404).json({
        message: "One of the selected crew members was not found",
      });
    }

    normalizedCrewMembers.push({
      user: crewUser._id,
      name: crewUser.name || crewUser.email || "Crew Member",
      role: member.role || "helper",
    });
  }

  const trip = await DeliveryTrip.create({
    deliveryDate,

    truck: selectedTruck._id,
    truckName: selectedTruck.name,

    primaryDriver: selectedDriver._id,
    primaryDriverName:
      selectedDriver.name || selectedDriver.email || "Driver",
    primaryDriverEmail: selectedDriver.email || "",

    crewMembers: normalizedCrewMembers,
    stops: normalizedStops,

    createdBy: req.user._id,
    createdByName:
      req.user?.name || req.user?.email || "Unknown User",
  });

  await Promise.all(
    normalizedStops.map((stop) =>
      Order.findByIdAndUpdate(stop.order, {
        deliveryTrip: trip._id,
        deliveryTripStopOrder: stop.stopOrder,

        assignedDriver: selectedDriver._id,
        assignedDriverName:
          selectedDriver.name || selectedDriver.email || "Driver",
        assignedDriverEmail: selectedDriver.email || "",
        assignedDeliveryDate: deliveryDate,
        routeStopOrder: stop.stopOrder,

        assignedBy: req.user._id,
        assignedByName:
          req.user?.name || req.user?.email || "Unknown User",
        assignedAt: new Date(),
      })
    )
  );

  const populatedTrip = await DeliveryTrip.findById(trip._id)
    .populate("truck", "name plateNumber description isActive")
    .populate(
      "primaryDriver",
      "name email dept profilePic"
    )
    .populate(
      "crewMembers.user",
      "name email dept profilePic"
    )
    .populate({
      path: "stops.order",
      select:
        "approvedData assignedDriver assignedDriverName assignedDeliveryDate routeStopOrder isBeingDelivered isDelivered deliveryTrip",
    });

  res.status(201).json(populatedTrip);
});







// ----------------------------
// Create a delivery truck
// Company department or Admin only
// ----------------------------
export const createDeliveryTruck = asyncHandler(async (req, res) => {
  const { name, plateNumber = "", description = "" } = req.body;

  const userDept = String(
    req.user?.dept || req.user?.clearance || ""
  ).toLowerCase();

  const canManageTrips =
    req.user?.isAdmin === true || userDept === "company";

  if (!canManageTrips) {
    return res.status(403).json({
      message: "Only Company department or Admin users can create trucks",
    });
  }

  if (!name?.trim()) {
    return res.status(400).json({
      message: "Truck name is required",
    });
  }

  const existingTruck = await DeliveryTruck.findOne({
    name: name.trim(),
  });

  if (existingTruck) {
    return res.status(400).json({
      message: "A truck with this name already exists",
    });
  }

  const truck = await DeliveryTruck.create({
    name: name.trim(),
    plateNumber: plateNumber.trim(),
    description: description.trim(),
    isActive: true,
  });

  res.status(201).json(truck);
});

// ----------------------------
// List all delivery trucks
// ----------------------------
export const getDeliveryTrucks = asyncHandler(async (req, res) => {
  const trucks = await DeliveryTruck.find({}).sort({
    name: 1,
  });

  res.status(200).json({
    trucks,
  });
});

