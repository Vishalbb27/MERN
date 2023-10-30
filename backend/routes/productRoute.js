import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();
import {
  getproducts,
  getproductById,
} from "../controllers/productController.js";

router.route("/").get(getproducts);
router.route("/:id").get(getproductById);

export default router;
