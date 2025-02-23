import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// import { authMiddleware } from "../middlewares/authenticate.js";
import { createUser } from "../dao/userDAO.js";
import { User } from "../models/userModel.js";

const signUpUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    console.log("Input missing error");
    res.status(400).send("Required input fields missing");
    throw new Error("Required input fieldsmissing");
  }

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
    const result = await createUser(user);
    console.log(`userContorller: reulst: ${result}`);
    res.status(200).send("User created successfully");
  } catch (err) {}

  // respond
});

const loginUser = asyncHandler(async (req, res) => {
  // get res body
  // validate res body
  // check username/password and find user in database
  // respond with generate jwt token for user

  //   authMiddleware;
  const request = req.body;
  console.log(request);

  // const jwtSecretKey = process.env.JWT_SECRET_KEY;
  // const user = { id: 1, email: "user@example.com" };

  // const token = jwt.sign(user, "jwtSecretKey", { expiresIn: "1h" });
  // console.log(token);

  // client can store the token as a HttpOnly cookie
  // document.cookie = `token=${token}`

  try {
    res.send("Successfully Verified");
    // await bcrypt.compare(password, hash);
    // const match = await bcrypt.compare(password, user.passwordHash);

    // if(match) {
    //     //generate token
    // }

    // const token = req.header(tokenHeaderKey);
    // if (jwt.verify(token, jwtSecretKey)) {
    // return res.send("Successfully Verified");
    // } else {
    //   return res.status(401).send(Error);
    // }
  } catch (err) {
    // return res.status(401).send(Error);
  }
});

// const forgotPassword = asyncHandler(async (req, res) => {

//   });

export { signUpUser, loginUser };
