import { Router } from "express";

import { protectRoute } from "../middlewares/authMiddleware.js";
import { coachRateLimiter } from "../middlewares/rateLimitMiddleware.js";
import coach from "../controllers/coachController.js";

const coachRoute = Router();

coachRoute.post("/chat", protectRoute, coachRateLimiter, coach.sendAiMessage);

export default coachRoute;
