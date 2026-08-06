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




// ----------------------------
// List delivery trips
// ----------------------------
export const getDeliveryTrips = asyncHandler(async (req, res) => {
  const userDept = String(
    req.user?.dept || req.user?.clearance || ""
  ).toLowerCase();

  const canManageTrips =
    req.user?.isAdmin === true || userDept === "company";

  const query = canManageTrips
    ? {}
    : {
        $or: [
          { primaryDriver: req.user._id },
          { "crewMembers.user": req.user._id },
        ],
      };

  const trips = await DeliveryTrip.find(query)
    .sort({ deliveryDate: 1, createdAt: 1 })
    .populate("truck", "name plateNumber description isActive")
    .populate("primaryDriver", "name email dept profilePic")
    .populate("crewMembers.user", "name email dept profilePic")
    .populate({
      path: "stops.order",
      select:
        "approvedData assignedDriverName assignedDeliveryDate routeStopOrder isBeingDelivered isDelivered deliveryStartedAt deliveryStartedBy deliveryStartedByName",
    });

  res.status(200).json({ trips });
});

// ----------------------------
// Start one trip and all orders in it
// ----------------------------
export const startDeliveryTrip = asyncHandler(async (req, res) => {
  const trip = await DeliveryTrip.findById(req.params.id);

  if (!trip) {
    return res.status(404).json({
      message: "Delivery trip not found",
    });
  }

  const requestUserId = String(req.user?._id || "");
  const primaryDriverId = String(trip.primaryDriver || "");

  const isBackupDriver = trip.crewMembers.some(
    (member) =>
      String(member.user || "") === requestUserId &&
      member.role === "backup-driver"
  );

  const userDept = String(
    req.user?.dept || req.user?.clearance || ""
  ).toLowerCase();

  const canManageTrips =
    req.user?.isAdmin === true || userDept === "company";

  if (
    !canManageTrips &&
    requestUserId !== primaryDriverId &&
    !isBackupDriver
  ) {
    return res.status(403).json({
      message:
        "Only the primary driver, backup driver, Company, or Admin can start this trip",
    });
  }

  if (trip.status === "active" || trip.status === "returning") {
    return res.status(400).json({
      message: "This trip has already started",
    });
  }

  if (trip.status === "completed" || trip.status === "cancelled") {
    return res.status(400).json({
      message: "This trip cannot be started",
    });
  }

  const conflictingTruckTrip = await DeliveryTrip.findOne({
    truck: trip.truck,
    status: { $in: ["active", "returning"] },
    _id: { $ne: trip._id },
  });

  if (conflictingTruckTrip) {
    return res.status(400).json({
      message: "This truck is already being used on another active trip",
    });
  }

  const conflictingDriverTrip = await DeliveryTrip.findOne({
    primaryDriver: trip.primaryDriver,
    status: { $in: ["active", "returning"] },
    _id: { $ne: trip._id },
  });

  if (conflictingDriverTrip) {
    return res.status(400).json({
      message: "This driver is already on another active trip",
    });
  }

  const now = new Date();

  trip.status = "active";
  trip.startedAt = now;
  trip.startedBy = req.user._id;
  trip.startedByName =
    req.user?.name || req.user?.email || "Unknown User";

  await trip.save();

  const orderIds = trip.stops.map((stop) => stop.order);

  await Order.updateMany(
    {
      _id: { $in: orderIds },
    },
    {
      $set: {
        isBeingDelivered: true,
        deliveryStartedAt: now,
        deliveryStartedBy: trip.primaryDriver,
        deliveryStartedByName: trip.primaryDriverName,
        assignedDriver: trip.primaryDriver,
        assignedDriverName: trip.primaryDriverName,
        assignedDriverEmail: trip.primaryDriverEmail,
        assignedDeliveryDate: trip.deliveryDate,
        deliveryTrip: trip._id,
      },
    }
  );

  const updatedTrip = await DeliveryTrip.findById(trip._id)
    .populate("truck", "name plateNumber description isActive")
    .populate("primaryDriver", "name email dept profilePic")
    .populate("crewMembers.user", "name email dept profilePic")
    .populate({
      path: "stops.order",
      select:
        "approvedData assignedDriverName routeStopOrder isBeingDelivered isDelivered deliveryStartedAt deliveryStartedBy deliveryStartedByName",
    });

  res.status(200).json(updatedTrip);
});




// ----------------------------
// Update one delivery-trip stop
// pending -> arrived -> completed
// ----------------------------
export const updateDeliveryTripStopStatus = asyncHandler(
  async (req, res) => {
    const trip = await DeliveryTrip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Delivery trip not found",
      });
    }

    const requestUserId = String(req.user?._id || "");
    const primaryDriverId = String(trip.primaryDriver || "");

    const isBackupDriver = trip.crewMembers.some(
      (member) =>
        String(member.user || "") === requestUserId &&
        member.role === "backup-driver"
    );

    const userDept = String(
      req.user?.dept || req.user?.clearance || ""
    ).toLowerCase();

    const canManageTrips =
      req.user?.isAdmin === true || userDept === "company";

    if (
      !canManageTrips &&
      requestUserId !== primaryDriverId &&
      !isBackupDriver
    ) {
      return res.status(403).json({
        message:
          "Only the primary driver, backup driver, Company, or Admin can update this stop",
      });
    }

    if (trip.status !== "active") {
      return res.status(400).json({
        message: "The trip must be active before updating stops",
      });
    }

    const requestedStatus = String(
      req.body?.status || ""
    ).toLowerCase();

    const allowedStatuses = [
      "pending",
      "arrived",
      "completed",
    ];

    if (!allowedStatuses.includes(requestedStatus)) {
      return res.status(400).json({
        message:
          "Stop status must be pending, arrived, or completed",
      });
    }

    const stop = trip.stops.id(req.params.stopId);

    if (!stop) {
      return res.status(404).json({
        message: "Delivery stop not found",
      });
    }

    stop.status = requestedStatus;

    if (requestedStatus === "arrived") {
      stop.arrivedAt = new Date();
    }

    if (requestedStatus === "completed") {
      stop.completedAt = new Date();

      const nextStop = [...trip.stops]
        .sort(
          (a, b) =>
            Number(a.stopOrder || 0) -
            Number(b.stopOrder || 0)
        )
        .find(
          (tripStop) =>
            String(tripStop._id) !== String(stop._id) &&
            String(tripStop.status || "pending").toLowerCase() !==
              "completed"
        );

      if (nextStop) {
        nextStop.status = "active";
      }

      await Order.findByIdAndUpdate(stop.order, {
        $set: {
          isDelivered: true,
          deliveredAt: new Date(),
          isBeingDelivered: false,
        },
      });
    }

    await trip.save();

    const updatedTrip = await DeliveryTrip.findById(trip._id)
      .populate(
        "truck",
        "name plateNumber description isActive"
      )
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
          "approvedData assignedDriverName assignedDeliveryDate routeStopOrder isBeingDelivered isDelivered deliveredAt",
      });

    res.status(200).json(updatedTrip);
  }
);





// ----------------------------
// Mark trip as returning
// ----------------------------
export const markTripReturning = asyncHandler(async (req, res) => {
  const trip = await DeliveryTrip.findById(req.params.id);

  if (!trip) {
    return res.status(404).json({
      message: "Delivery trip not found",
    });
  }

  const requestUserId = String(req.user?._id || "");
  const primaryDriverId = String(trip.primaryDriver || "");

  const userDept = String(
    req.user?.dept || req.user?.clearance || ""
  ).toLowerCase();

  const canManageTrips =
    req.user?.isAdmin === true || userDept === "company";

  if (!canManageTrips && requestUserId !== primaryDriverId) {
    return res.status(403).json({
      message:
        "Only the primary driver, Company, or Admin can mark this trip as returning",
    });
  }

  trip.status = "returning";
  await trip.save();

  res.status(200).json(trip);
});

// ----------------------------
// Complete trip and release truck
// ----------------------------
export const completeDeliveryTrip = asyncHandler(async (req, res) => {
  const trip = await DeliveryTrip.findById(req.params.id);

  if (!trip) {
    return res.status(404).json({
      message: "Delivery trip not found",
    });
  }

  const requestUserId = String(req.user?._id || "");
  const primaryDriverId = String(trip.primaryDriver || "");

  const userDept = String(
    req.user?.dept || req.user?.clearance || ""
  ).toLowerCase();

  const canManageTrips =
    req.user?.isAdmin === true || userDept === "company";

  if (!canManageTrips && requestUserId !== primaryDriverId) {
    return res.status(403).json({
      message:
        "Only the primary driver, Company, or Admin can complete this trip",
    });
  }

  const now = new Date();

  trip.status = "completed";
  trip.returnedToWarehouseAt = now;
  trip.completedAt = now;

  await trip.save();

  const orderIds = trip.stops.map((stop) => stop.order);

  await Order.updateMany(
    {
      _id: { $in: orderIds },
      isDelivered: true,
    },
    {
      $set: {
        isBeingDelivered: false,
      },
    }
  );

  res.status(200).json(trip);
});



