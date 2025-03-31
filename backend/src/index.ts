import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.js";

import userRouter from "./routes/userRoute.js";
import habitRoute from "./routes/habitRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();

// Initialization
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/user", userRouter);
app.use("/habit", habitRoute);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.use(errorHandler);

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API Docs available at http://localhost:${port}/api-docs`);
});
