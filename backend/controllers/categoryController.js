 import Category from "../models/categoryModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user.id,
      title: req.body.title,
    });

    res.status(201).json(category);
  } catch (error) {
    res.json(error);
  }
});

export const allCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find().populate("user", "name email");

    res.status(201).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.json(error);
  }
});


export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    id: req.params.id,
  });
});






