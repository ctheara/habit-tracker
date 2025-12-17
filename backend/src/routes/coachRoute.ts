import { Router } from "express";

import { protectRoute } from "../middlewares/authMiddleware.js";
import { coachRateLimiter } from "../middlewares/rateLimitMiddleware.js";
import { validateCoachMessage } from "../middlewares/validateInput.js";
import coach from "../controllers/coachController.js";

const coachRoute = Router();

coachRoute.post(
  "/chat",
  protectRoute,
  coachRateLimiter,
  validateCoachMessage,
  coach.sendAiMessage
);

export default coachRoute;
