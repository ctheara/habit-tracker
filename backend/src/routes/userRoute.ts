import express from "express";

import { signUpUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUpUser);

userRouter.post("/login", loginUser);

userRouter.get("/:{id}", (req, res) => {
  // const { id } = req.params;
});

export { userRouter };
