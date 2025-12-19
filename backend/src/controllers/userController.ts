import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// import { authMiddleware } from "../middlewares/authenticate.js";
import { createUser, findAUserByEmail, getAUser } from "../dao/userDAO.js";
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

      // use http-only cookies over local session storage to prevent XSS attacks
      const cookieOptions = getCookieOptions();
      res.cookie("authToken", token, cookieOptions);

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

      // use http-only cookies over local session storage to prevent XSS attacks
      const cookieOptions = getCookieOptions();
      res.cookie("authToken", token, cookieOptions);

      return res.status(200).json({ token: token });
    } else {
      throw { statusCode: 401, message: "Unauthorized" };
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const logoutUser = async (req: any, res: any, next: any) => {
  const cookieOptions = getCookieOptions();
  res.clearCookie("authToken", cookieOptions);

  console.log("logout successfully");
  res.status(200).json({ message: "Logged out successfully" });
};

const getUser = async (req: any, res: any, next: any) => {
  try {
    const result = await getAUser(req.user.id);

    if (result) {
      const mappedUser = mapUserResult(result);
      return res.status(200).json(mappedUser);
    } else {
      throw { statusCode: 500, message: "Cannot find user" };
    }
  } catch (err) {
    console.warn(`Error while getting user ${JSON.stringify(err)}`);
    next(err);
  }
};

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction, // Only require HTTPS in production
    sameSite: isProduction ? ("None" as const) : ("Lax" as const), // "None" for cross-origin in production, "Lax" for same-site in development
    maxAge: 1000 * 60 * 60 * 8, // 8 hours expiration
  };
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

const mapUserResult = (user: any) => {
  if (user) {
    const mappeUser: User = {
      userId: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      createdAt: user.create_date,
      updatedAt: user.updated_date,
    };
    return mappeUser;
  } else {
    throw { statusCode: 500, message: "Error mapping responce" };
  }
};

export { signUpUser, loginUser, logoutUser, getUser };
