import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    next(errorHandler(400, "User exist"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "Signup successfull !" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, "jwtsecretkey");
    const { password: pass, ...rest } = validUser._doc;
    const expirationTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    res
      .cookie("access", token, {
        expires: expirationTime,
        httpOnly: true,
      })
      .status(200)
      .json({ rest, message: "Sigin successfull" });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "jwtsecretkey");
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access", token, { httpOnly: true })
        .status(200)
        .json({ rest });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          "_" +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "jwtsecretkey");
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access", token, { httpOnly: true })
        .status(200)
        .json({ rest });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access");
    res.status(200).json({ message: "User has been logged out!" });
  } catch (error) {
    next(error);
  }
};
