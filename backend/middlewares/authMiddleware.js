/* import User from "../models/userModal.js";

import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read JWT FROM the "jwt" cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(403);
      throw new Error("Not Authorized or Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("No token , Login Please");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You Do Not have Clearance");
  }
});


*/



//best
/*
import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1) Try Authorization header: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2) Fallback: cookie named "jwt" (optional)
  if (!token && req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token invalid");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  res.status(401);
  throw new Error("You do not have clearance");
});

*/



import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1) From Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2) Fallback: cookie
  if (!token && req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token invalid");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  res.status(401);
  throw new Error("You do not have clearance");
});

// ✅ New middleware: Admin OR Procurement
export const isAdminOrProcurement = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.dept === "Procurement")) {
    return next();
  }
  res.status(403);
  throw new Error("You do not have clearance (Admin/Procurement only)");
});
