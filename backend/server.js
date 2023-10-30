import express from "express";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoute.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

import connectDB from "./config/db.js";
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes); //It is directed to routes

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
