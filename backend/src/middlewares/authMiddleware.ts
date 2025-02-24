import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protectRoute = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const userToken = req.headers.authorization.split(" ")[1];

      if (!jwtSecretKey) {
        throw new Error(
          "JWT_SECRET_KEY is not set in the environment variables"
        );
      }

      const decoded: any = jwt.verify(userToken, jwtSecretKey);

      if (decoded) {
        req.user = decoded;
        next();
      }
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(400).json({ message: "Token invalid or not provided" });
  }
});

export { protectRoute };
