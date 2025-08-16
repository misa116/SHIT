 import User from "../models/userModal.js";

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







/*
import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the cookie named 'jwt'
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to the request object, excluding the password
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(403);
      throw new Error("Not authorized or token failed");
    }
  } else {
    res.status(401);
    throw new Error("No token found, please login");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  // Check if the logged in user has admin privileges
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You do not have clearance");
  }
});

*/
