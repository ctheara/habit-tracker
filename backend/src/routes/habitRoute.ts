import { Router } from "express";

import { protectRoute } from "../middlewares/authMiddleware.js";

const habitRoute = Router();

habitRoute.post("/create", protectRoute, (req, res) => {
  res.send("Habit created");
});

export default habitRoute;
