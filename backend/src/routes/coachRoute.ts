import { Router } from "express";

import { protectRoute } from "../middlewares/authMiddleware.js";
import coach from "../controllers/coachController.js";

const coachRoute = Router();

coachRoute.post("/chat", protectRoute, coach.sendAiMessage);

export default coachRoute;
