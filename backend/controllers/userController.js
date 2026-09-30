




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
  isApproved: false,
});

if (user) {
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    dept: user.dept,
    procurement: user.procurement,
    isAdmin: user.isAdmin,
    isApproved: user.isApproved,
    profilePic: user.profilePic || "",
    message: "Account created. Waiting for administrator approval.",
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

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (user.isApproved === false) {
    res.status(403);
    throw new Error(
      "Your account is waiting for administrator approval."
    );
  }

  const token = generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    dept: user.dept,
    isAdmin: user.isAdmin,
    procurement: user.procurement,
    isApproved: user.isApproved,
    profilePic: user.profilePic || "",
    token,
  });
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



if (req.body.hasOwnProperty("isApproved")) {
  user.isApproved = req.body.isApproved;
}


    
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      dept: updatedUser.dept,

      
isAdmin: updatedUser.isAdmin,
isApproved: updatedUser.isApproved,
procurement: updatedUser.procurement,

      
      profilePic: updatedUser.profilePic || "",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update logged-in user's profile picture
// @route   PUT /api/users/profile-pic
// @access  Private



export const updateMyProfilePic = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Profile picture is required.");
  }

  const profilePic =
    req.file.path ||
    req.file.secure_url ||
    "";

  if (!profilePic) {
    res.status(400);
    throw new Error("Could not save profile picture.");
  }

  user.profilePic = profilePic;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    dept: updatedUser.dept,
    isAdmin: updatedUser.isAdmin,
    procurement: updatedUser.procurement,
    profilePic: updatedUser.profilePic || "",
  });
});


// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await User.deleteOne({ _id: user._id });

  res.json({
    message: "User deleted successfully",
  });
});






