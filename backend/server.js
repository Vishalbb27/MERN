import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

const port = process.env.PORT || 5000;

import connectDB from "./config/db.js";
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes); //It is directed to routes
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
