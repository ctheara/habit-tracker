import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.js";

import userRouter from "./routes/userRoute.js";
import habitRoute from "./routes/habitRoute.js";
import coachRoute from "./routes/coachRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();

// Initialization
const app = express();
const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

// TRUST proxy so rateLimit can read the correct IP
app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:3000",
  "https://habit-tracker-fawn-omega.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
      if (!origin) {
        console.log("Request with no origin header - allowing");
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        console.log(`Request from allowed origin: ${origin}`);
        return callback(null, true);
      }

      console.warn(`CORS blocked request from origin: ${origin}`);
      return callback(
        new Error(`CORS policy does not allow access from origin: ${origin}`),
        false
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Handle preflight requests
app.options("*", cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/v1/users", userRouter);
app.use("/v1/habits", habitRoute);
app.use("/v1/coaches", coachRoute);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
  console.log("ping");
});

app.use(errorHandler);

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on ${baseUrl}`);
  console.log(`API Docs available at ${baseUrl}/api-docs`);
});
