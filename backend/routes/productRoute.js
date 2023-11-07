import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();
import {
  getproducts,
  getproductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getproducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getproductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
