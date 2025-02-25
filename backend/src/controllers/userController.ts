import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// import { authMiddleware } from "../middlewares/authenticate.js";
import { createUser, findAUserByEmail } from "../dao/userDAO.js";
import { User } from "../models/userModel.js";

const signUpUser = async (req: any, res: any, next: any) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    console.log("Input missing error");
    throw { statusCode: 400, message: "Required input fields missing" };
  }

  // stailize the email and other input fields
  // find is user already exisiting

  // hashed password, bcrypt (different long salt for every password, generate ran number)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

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
      return res.status(201).json({ token: token });
    }
  } catch (err: any) {
    next(err);
  }
};

const loginUser = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  try {
    const user = await findAUserByEmail(email);
    if (!user) {
      throw { statusCode: 401, message: "User not found" };
    }
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = generateToken(user.id, email);
      return res.status(201).json({ token: token });
    } else {
      throw { statusCode: 401, message: "Unauthorized" };
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const generateToken = (id: number, email: string) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!jwtSecretKey) {
    throw {
      statusCode: 500,
      message: "JWT secret key is not set in the environment variables",
    };
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
