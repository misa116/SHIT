
import User from "../models/userModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dept } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(403);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    dept,
  });

  if (user) {
    const token = generateToken(res, user._id); // always return token

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dept: user.dept,
      procurement: user.procurement,
      isAdmin: user.isAdmin,
      token, // ✅ added token here
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data, try again");
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = generateToken(res, user._id); // return same way

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dept: user.dept,
      isAdmin: user.isAdmin,
      procurement: user.procurement,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    List users
// @route   GET /api/users
// @access  Private/Admin
export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ msg: "All users", count: users.length, users });
});

// @desc    Edit user clearance
// @route   PUT /api/users/:id
// @access  Private/Admin
export const editUserClr = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.dept = req.body.dept || user.dept;

    if (req.body.hasOwnProperty("isAdmin")) {
      user.isAdmin = req.body.isAdmin;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      dept: updatedUser.dept,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});








/* import User from "../models/userModal.js";
 import { asyncHandler } from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";



export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dept } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(403);
    throw new Error("user Already Exist");
  }  

  const user = await User.create({
    name,
    email,
    password,
    dept,
  });

 if (user) {
      generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      dept: user.dept,
      procurement: user.procurement,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("invalid data try again");
  }
});

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = generateToken(res, user._id);

 res.json({

      _id: user._id,
      name: user.name,
      email: user.email,
      dept: user.dept,
      isAdmin: user.isAdmin,
      procurement: user.procurement,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("invalid Email And Password !!");
  }
});


export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json({ msg: "All users", count: users.length, users });
});


export const editUserClr = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);


if (user) {
    user.name = req.body.name || user.name;
    user.dept = req.body.dept || user.dept;

if(req.body.hasOwnProperty("isAdmin")) {
  user.isAdmin = req.body.isAdmin;
}
        const updatedUser = await user.save();

         res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      dept: user.dept,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(403);
    throw new Error("User not Found");
  }

  });
  */










































  /*
  import User from "../models/userModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dept } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(403);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    dept: dept?.trim() || "Company",
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dept: user.dept,
      procurement: user.procurement,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data, try again");
  }
});

// Sign in user
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dept: user.dept,
      isAdmin: user.isAdmin,
      procurement: user.procurement,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// List all users
export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ msg: "All users", count: users.length, users });
});

// Edit user clearance
export const editUserClr = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.dept = req.body.dept?.trim() || user.dept;

  if (req.body.hasOwnProperty("isAdmin")) {
    user.isAdmin = req.body.isAdmin;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    dept: updatedUser.dept,
    isAdmin: updatedUser.isAdmin,
  });
});
*/