import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.js";

import { userRouter } from "./routes/userRoute.js";

dotenv.config();

// Initialization
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/user", userRouter);

app.get("/", (req, res, next) => {
  res.send("Hello, TypeScript with Node.js!");
});

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API Docs available at http://localhost:${port}/api-docs`);
});
