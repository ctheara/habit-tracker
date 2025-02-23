import express from "express";
import dotenv from "dotenv";

import { userRouter } from "./routes/userRoute.js";

dotenv.config();

// Server Initialization
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Routes
app.use("/user", userRouter);

app.get("/", (req, res, next) => {
  res.send("Hello, TypeScript with Node.js!");
});

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY);
});
