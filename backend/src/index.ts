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
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://habit-tracker-fawn-omega.vercel.app",
      ];
      // Allow requests from Postman and curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from origin ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
  console.log(`Server is running on ${baseUrl}`);
  console.log(`API Docs available at ${baseUrl}/api-docs`);
});
