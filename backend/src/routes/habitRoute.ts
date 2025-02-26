import { Router } from "express";

import { protectRoute } from "../middlewares/authMiddleware.js";
import habit from "../controllers/habitController.js";

const habitRoute = Router();

habitRoute.post("/create", protectRoute, habit.createHabit);

habitRoute.get("/list", protectRoute, habit.getAllHabits);

habitRoute.get("/:habitId", protectRoute, habit.getAHabit);

habitRoute.put("/:habitId", protectRoute, habit.updateAHabit);

habitRoute.delete("/:habitId", protectRoute, habit.deleteAHabit);

export default habitRoute;
