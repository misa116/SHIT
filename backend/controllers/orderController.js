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






export const updateOrderHoldStatus = async (req, res) => {
  try {
    const { isOnHold } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.isOnHold = Boolean(isOnHold);
    order.holdDate = isOnHold ? new Date() : null;
    order.holdBy = isOnHold ? req.user?.name || req.user?.email || "Unknown" : "";

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};






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



















*/


























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
  const { orderItems, approvedData, requisitionSteps, supplier, bundles = [] } = req.body;

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
  const savedBundles =
    Array.isArray(bundles) && bundles.length > 0
      ? bundles.map((bundle, index) => ({
          bundleKey: bundle.bundleKey || `bundle-${index + 1}`,
          bundleLabel: bundle.bundleLabel || bundle.label || "",
          isBuilt: false,
          factoryStatus: "pending",
        }))
      : Array.from(
          new Set(
            itemsWithCategory
              .map((item) => item.bundleKey)
              .filter((key) => key && key !== "no-bundle")
          )
        ).map((bundleKey) => ({
          bundleKey,
          bundleLabel:
            itemsWithCategory.find((item) => item.bundleKey === bundleKey)
              ?.bundleLabel || "",
          isBuilt: false,
          factoryStatus: "pending",
        }));

  const createOrder = await Order.create({
    orderItems: itemsWithCategory,
    bundles: savedBundles,
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






export const updateOrderHoldStatus = async (req, res) => {
  try {
    const { isOnHold } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.isOnHold = Boolean(isOnHold);
    order.holdDate = isOnHold ? new Date() : null;
    order.holdBy = isOnHold ? req.user?.name || req.user?.email || "Unknown" : "";

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};






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
// Mark one bundle as built / not built
// ----------------------------
export const updateBundleBuiltStatus = asyncHandler(async (req, res) => {
  const { id, bundleKey } = req.params;
  const { isBuilt } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const decodedBundleKey = decodeURIComponent(bundleKey);
  const nextBuilt = Boolean(isBuilt);
  const now = new Date();

  if (!Array.isArray(order.bundles)) {
    order.bundles = [];
  }

  let bundle = order.bundles.find(
    (b) => String(b.bundleKey) === String(decodedBundleKey)
  );

  // For old orders that do not have a saved bundles array yet
  if (!bundle) {
    const matchingItem = order.orderItems.find(
      (item) => String(item.bundleKey || "no-bundle") === String(decodedBundleKey)
    );

    bundle = {
      bundleKey: decodedBundleKey,
      bundleLabel: matchingItem?.bundleLabel || "",
      isBuilt: false,
      factoryStatus: "pending",
    };

    order.bundles.push(bundle);
    bundle = order.bundles[order.bundles.length - 1];
  }

  bundle.isBuilt = nextBuilt;
  bundle.builtAt = nextBuilt ? now : undefined;
  bundle.builtBy = nextBuilt ? req.user._id : undefined;
  bundle.factoryStatus = nextBuilt ? "built" : "pending";

  order.orderItems.forEach((item) => {
    if (String(item.bundleKey || "no-bundle") === String(decodedBundleKey)) {
      item.isBuilt = nextBuilt;
      item.builtAt = nextBuilt ? now : undefined;
      item.builtBy = nextBuilt ? req.user._id : undefined;
      item.factoryStatus = nextBuilt ? "built" : "pending";
    }
  });

  const realBundles = order.bundles.filter(
    (b) => b.bundleKey && b.bundleKey !== "no-bundle"
  );

  const allBundlesBuilt =
    realBundles.length > 0 && realBundles.every((b) => b.isBuilt);

  order.isBuilt = allBundlesBuilt;
  order.builtAt = allBundlesBuilt ? now : undefined;
  order.builtBy = allBundlesBuilt ? req.user._id : undefined;
  order.factoryStatus = allBundlesBuilt ? "built" : "pending";

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
  const { orderItems, approvedData, requisitionSteps, supplier, bundles = [] } = req.body;

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
  const savedBundles =
    Array.isArray(bundles) && bundles.length > 0
      ? bundles.map((bundle, index) => ({
          bundleKey: bundle.bundleKey || `bundle-${index + 1}`,
          bundleLabel: bundle.bundleLabel || bundle.label || "",
          isBuilt: false,
          factoryStatus: "pending",
        }))
      : Array.from(
          new Set(
            itemsWithCategory
              .map((item) => item.bundleKey)
              .filter((key) => key && key !== "no-bundle")
          )
        ).map((bundleKey) => ({
          bundleKey,
          bundleLabel:
            itemsWithCategory.find((item) => item.bundleKey === bundleKey)
              ?.bundleLabel || "",
          isBuilt: false,
          factoryStatus: "pending",
        }));

  const createOrder = await Order.create({
    orderItems: itemsWithCategory,
    bundles: savedBundles,
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

order.isBeingDelivered = false;
order.deliveryStartedAt = undefined;
order.deliveryStartedBy = undefined;
order.deliveryStartedByName = "";

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






export const updateOrderHoldStatus = async (req, res) => {
  try {
    const { isOnHold } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.isOnHold = Boolean(isOnHold);
    order.holdDate = isOnHold ? new Date() : null;
    order.holdBy = isOnHold ? req.user?.name || req.user?.email || "Unknown" : "";

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};






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



export const updateOrderJobsite = asyncHandler(async (req, res) => {
  const { jobsiteAddress, jobsiteLat, jobsiteLng } = req.body;

const order = await Order.findById(req.params.id);

if (!order) {
  return res.status(404).json({ message: "Order not found" });
}

const userDept = String(
  req.user?.dept || req.user?.clearance || ""
).toLowerCase();

const canManageMapPins =
  req.user?.isAdmin || userDept === "company";

if (!canManageMapPins) {
  return res.status(403).json({
    message: "Only Company department or Admin users can update jobsite pins",
  });
}

const latNumber =
    jobsiteLat === "" || jobsiteLat === null || jobsiteLat === undefined
      ? null
      : Number(jobsiteLat);

  const lngNumber =
    jobsiteLng === "" || jobsiteLng === null || jobsiteLng === undefined
      ? null
      : Number(jobsiteLng);

  if (
    latNumber !== null &&
    (!Number.isFinite(latNumber) || latNumber < -90 || latNumber > 90)
  ) {
    return res.status(400).json({ message: "Invalid latitude" });
  }

  if (
    lngNumber !== null &&
    (!Number.isFinite(lngNumber) || lngNumber < -180 || lngNumber > 180)
  ) {
    return res.status(400).json({ message: "Invalid longitude" });
  }

  order.approvedData = {
    ...(order.approvedData?.toObject
      ? order.approvedData.toObject()
      : order.approvedData || {}),
    jobsiteAddress: jobsiteAddress || "",
    jobsiteLat: latNumber,
    jobsiteLng: lngNumber,
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});





// ----------------------------
// Start live delivery navigation
// ----------------------------
export const startOrderDeliveryNavigation = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.isBeingDelivered = true;
  order.deliveryStartedAt = new Date();
  order.deliveryStartedBy = req.user._id;
  order.deliveryStartedByName =
    req.user?.name || req.user?.email || "Unknown User";

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

// ----------------------------
// Clear live delivery navigation
// ----------------------------
export const clearOrderDeliveryNavigation = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.isBeingDelivered = false;
  order.deliveryStartedAt = undefined;
  order.deliveryStartedBy = undefined;
  order.deliveryStartedByName = "";

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});







// ----------------------------
// Mark one bundle as built / not built
// ----------------------------
export const updateBundleBuiltStatus = asyncHandler(async (req, res) => {
  const { id, bundleKey } = req.params;
  const { isBuilt } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const decodedBundleKey = decodeURIComponent(bundleKey);
  const nextBuilt = Boolean(isBuilt);
  const now = new Date();

  if (!Array.isArray(order.bundles)) {
    order.bundles = [];
  }

  let bundle = order.bundles.find(
    (b) => String(b.bundleKey) === String(decodedBundleKey)
  );

  // For old orders that do not have a saved bundles array yet
  if (!bundle) {
    const matchingItem = order.orderItems.find(
      (item) => String(item.bundleKey || "no-bundle") === String(decodedBundleKey)
    );

    bundle = {
      bundleKey: decodedBundleKey,
      bundleLabel: matchingItem?.bundleLabel || "",
      isBuilt: false,
      factoryStatus: "pending",
    };

    order.bundles.push(bundle);
    bundle = order.bundles[order.bundles.length - 1];
  }

  bundle.isBuilt = nextBuilt;
  bundle.builtAt = nextBuilt ? now : undefined;
  bundle.builtBy = nextBuilt ? req.user._id : undefined;
  bundle.factoryStatus = nextBuilt ? "built" : "pending";

  order.orderItems.forEach((item) => {
    if (String(item.bundleKey || "no-bundle") === String(decodedBundleKey)) {
      item.isBuilt = nextBuilt;
      item.builtAt = nextBuilt ? now : undefined;
      item.builtBy = nextBuilt ? req.user._id : undefined;
      item.factoryStatus = nextBuilt ? "built" : "pending";
    }
  });

  const realBundles = order.bundles.filter(
    (b) => b.bundleKey && b.bundleKey !== "no-bundle"
  );

  const allBundlesBuilt =
    realBundles.length > 0 && realBundles.every((b) => b.isBuilt);

  order.isBuilt = allBundlesBuilt;
  order.builtAt = allBundlesBuilt ? now : undefined;
  order.builtBy = allBundlesBuilt ? req.user._id : undefined;
  order.factoryStatus = allBundlesBuilt ? "built" : "pending";

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





