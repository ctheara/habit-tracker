import express from "express";

import { signUpUser, loginUser } from "../controllers/userController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signUpUser);

userRouter.post("/login", loginUser);

userRouter.get("/me", protectRoute, (req, res) => {
  res.send("you are Me");
});

userRouter.get("/:{id}", (req, res) => {
  // const { id } = req.params;
});

export { userRouter };
