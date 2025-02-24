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

      if (jwt.verify(userToken, jwtSecretKey)) {
        next();
      }
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(400).json({ message: "Token invalid or not provided" });
  }

  // const token = req.header(tokenHeaderKey);
  // if (jwt.verify(token, jwtSecretKey)) {
  // return res.send("Successfully Verified");
  // } else {
  //   return res.status(401).send(Error);
  // }
});

export { protectRoute };
