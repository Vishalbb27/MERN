import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc Fetch all Products
//@route GET/api/products
//@access Public
const getproducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc Fetch a Products
//@route GET/api/products/:id
//@access Public
const getproductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not Found");
  }
});

//@desc Create a Product
//@route POST/api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    category: "Sample category",
    brand: "sample",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createProduct = await product.save();

  res.status(200).json(createProduct);
});

//@desc Update a Product
//@route PUT/api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

//@desc Delete a Product
//@route DELETE/api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

export {
  getproductById,
  getproducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
