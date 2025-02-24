import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// import { authMiddleware } from "../middlewares/authenticate.js";
import { createUser, findAUserByEmail } from "../dao/userDAO.js";
import { User } from "../models/userModel.js";

const signUpUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    console.log("Input missing error");
    res.status(400).send("Required input fields missing");
    // throw new Error("Required input fieldsmissing");
  }

  // stailize the email and other input fields
  // find is user already exisiting

  // hashed password, bcrypt (different long salt for every password, generate ran number)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // put user in database
  try {
    const user: User = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    const userResult = await createUser(user);

    if (userResult) {
      const token = generateToken(userResult.id, email);
      res.status(201).json({ token: token });
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Error signing user up" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findAUserByEmail(email);
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = generateToken(user.id, email);
      res.status(201).json({ token: token });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ message: "Login Error" });
  }
});

const generateToken = (id: number, email: string) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!jwtSecretKey) {
    throw new Error("JWT_SECRET_KEY is not set in the environment variables");
  }

  const token = jwt.sign({ id: id, email: email }, jwtSecretKey, {
    expiresIn: "1h",
  });
  return token;
  // client can store the token as a HttpOnly cookie
  // document.cookie = `token=${token}`
};

// Strech goal
// const forgotPassword = asyncHandler(async (req, res) => {});

export { signUpUser, loginUser };
