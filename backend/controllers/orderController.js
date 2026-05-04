/*
// controllers/orderController.js
import Order from "../models/orderModal.js";
import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ----------------------------
// Helper: adjust stock depending on requisition type
// ----------------------------
const adjustStockByRequisitionType = async (order) => {
  let requisitionType = "UNKNOWN";

  // Handle string or object for requisitionSteps
  if (order?.requisitionSteps) {
    if (typeof order.requisitionSteps === "string") {
      requisitionType = order.requisitionSteps.toUpperCase();
    } else {
      requisitionType = (
        order.requisitionSteps.type ||
        order.requisitionSteps.method ||
        "UNKNOWN"
      ).toUpperCase();
    }
  } else if (order?.approvedData?.requisitionType) {
    requisitionType = order.approvedData.requisitionType.toUpperCase();
  } else if (order?.approvedData?.type) {
    requisitionType = order.approvedData.type.toUpperCase();
  }

  for (let item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (!product) continue;

    if (requisitionType === "PURCHASE REQUISITION") {
      product.stock += item.qty; // add stock
    } else if (requisitionType === "FACTORY REQUISITION") {
      product.stock -= item.qty; // subtract stock
    }

    await product.save({ validateBeforeSave: true });
  }
};

// ----------------------------
// Create a new order
// ----------------------------
export const newOrder = asyncHandler(async (req, res) => {
  const { orderItems, approvedData, requisitionSteps, supplier } = req.body;

  const itemsWithCategory = await Promise.all(
    orderItems.map(async (x) => {
      const productId = x.product || x._id;
      const product = await Product.findById(productId);

      return {
        product: productId,
        name: x.name || product?.name,
        qty: x.qty,
        category: product?.category || "Uncategorized",
        stock: product?.stock || 0,
        supplier: x.supplier || product?.supplier || "",
        price: x.price || product?.price || 0,
        bundleKey: x.bundleKey || "",
        bundleLabel: x.bundleLabel || "",
        images:
          Array.isArray(x.images) && x.images.length > 0
            ? x.images
            : Array.isArray(product?.images)
            ? product.images
            : [],
        image: x.image || product?.image || "",
      };
    })
  );

  const createOrder = await Order.create({
    orderItems: itemsWithCategory,
    user: req.user._id,
    approvedData,
    supplier,
    requisitionSteps,
  });

  res.status(201).json(createOrder);
});

// ----------------------------
// Get all orders (admin/procurement)
// ----------------------------
export const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort("-createdAt")
    .populate("user", "name email dept");

  res.status(200).json({ orders });
});

// ----------------------------
// Get my orders (logged-in user)
// ----------------------------
export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort("-createdAt")
    .lean();

  for (let order of orders) {
    for (let item of order.orderItems) {
      const product = await Product.findById(item.product);
      item.category = product?.category || "Uncategorized";
    }
  }

  res.status(200).json({ orders });
});

// ----------------------------
// Get order details by ID
// ----------------------------
export const orderDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .lean();

  if (!order) return res.status(404).json({ message: "Order not found" });

  for (let item of order.orderItems) {
    const product = await Product.findById(item.product);
    item.category = product?.category || "Uncategorized";
  }

  res.status(200).json({ order });
});

// ----------------------------
// Update order (delivery or factory requisition)
// ----------------------------
export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  await adjustStockByRequisitionType(order);

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

// ----------------------------
// Receive order (procurement / purchase requisition)
// ----------------------------
export const updateOrderProcurement = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  await adjustStockByRequisitionType(order);

  order.isReceived = true;
  order.receivedAt = Date.now();
  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

// ----------------------------
// Delete an order (admin/procurement)
// ----------------------------
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  await order.deleteOne();
  res.status(200).json({ message: "Order deleted successfully" });
});
*/









// controllers/orderController.js
import Order from "../models/orderModal.js";
import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ----------------------------
// Helper: adjust stock depending on requisition type
// ----------------------------
const adjustStockByRequisitionType = async (order) => {
  let requisitionType = "UNKNOWN";

  // Handle string or object for requisitionSteps
  if (order?.requisitionSteps) {
    if (typeof order.requisitionSteps === "string") {
      requisitionType = order.requisitionSteps.toUpperCase();
    } else {
      requisitionType = (
        order.requisitionSteps.type ||
        order.requisitionSteps.method ||
        "UNKNOWN"
      ).toUpperCase();
    }
  } else if (order?.approvedData?.requisitionType) {
    requisitionType = order.approvedData.requisitionType.toUpperCase();
  } else if (order?.approvedData?.type) {
    requisitionType = order.approvedData.type.toUpperCase();
  }

  for (let item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (!product) continue;

    if (requisitionType === "PURCHASE REQUISITION") {
      product.stock += item.qty; // add stock
    } else if (requisitionType === "FACTORY REQUISITION") {
      product.stock -= item.qty; // subtract stock
    }

    await product.save({ validateBeforeSave: true });
  }
};

// ----------------------------
// Create a new order
// ----------------------------
export const newOrder = asyncHandler(async (req, res) => {
  const { orderItems, approvedData, requisitionSteps, supplier } = req.body;

  const itemsWithCategory = await Promise.all(
    orderItems.map(async (x) => {
      const productId = x.product || x._id;
      const product = await Product.findById(productId);

      return {
        product: productId,
        name: x.name || product?.name,
        qty: x.qty,
        category: product?.category || "Uncategorized",
        stock: product?.stock || 0,
        supplier: x.supplier || product?.supplier || "",
        price: x.price || product?.price || 0,
        bundleKey: x.bundleKey || "",
        bundleLabel: x.bundleLabel || "",
        images:
          Array.isArray(x.images) && x.images.length > 0
            ? x.images
            : Array.isArray(product?.images)
            ? product.images
            : [],
        image: x.image || product?.image || "",
      };
    })
  );

  const createOrder = await Order.create({
    orderItems: itemsWithCategory,
    user: req.user._id,
    approvedData,
    supplier,
    requisitionSteps,
  });

  res.status(201).json(createOrder);
});

// ----------------------------
// Get all orders (admin/procurement)
// ----------------------------
export const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort("-createdAt")
    .populate("user", "name email dept");

  res.status(200).json({ orders });
});

// ----------------------------
// Get my orders (logged-in user)
// ----------------------------
export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort("-createdAt")
    .lean();

  for (let order of orders) {
    for (let item of order.orderItems) {
      const product = await Product.findById(item.product);
      item.category = product?.category || "Uncategorized";
    }
  }

  res.status(200).json({ orders });
});

// ----------------------------
// Get order details by ID
// ----------------------------
export const orderDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .lean();

  if (!order) return res.status(404).json({ message: "Order not found" });

  for (let item of order.orderItems) {
    const product = await Product.findById(item.product);
    item.category = product?.category || "Uncategorized";
  }

  res.status(200).json({ order });
});

// ----------------------------
// Update order (delivery or factory requisition)
// ----------------------------
export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  await adjustStockByRequisitionType(order);

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

// ----------------------------
// Receive order (procurement / purchase requisition)
// ----------------------------
export const updateOrderProcurement = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  await adjustStockByRequisitionType(order);

  order.isReceived = true;
  order.receivedAt = Date.now();
  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});



export const updateOrderDeliveryDate = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.approvedData = {
    ...order.approvedData,
    deliveryDate: req.body.deliveryDate,
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});







// ----------------------------
// Delete an order (admin/procurement)
// ----------------------------
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  await order.deleteOne();
  res.status(200).json({ message: "Order deleted successfully" });
});


