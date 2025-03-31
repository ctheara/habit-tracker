import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protectRoute = asyncHandler(async (req: any, res: any, next: any) => {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    if (!jwtSecretKey) {
      throw new Error("JWT_SECRET_KEY is not set in the environment variables");
    }

    const userToken = req.cookies?.authToken;

    if (!userToken) {
      return res.status(400).json({ message: "Token invalid or not provided" });
    }

    const decoded = jwt.verify(userToken, jwtSecretKey);

    if (decoded) {
      req.user = decoded;
      console.log("authenticated");
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export { protectRoute };
