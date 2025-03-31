import { Router } from "express";

import {
  signUpUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/userController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", signUpUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

userRouter.get("/me", protectRoute, getUser);

// userRouter.get("/:{id}", (req, res) => {
//   // const { id } = req.params;
// });

export default userRouter;
