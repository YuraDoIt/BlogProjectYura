import { validationResult } from "express-validator";
import userSchema from "../Models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let login = "admin";
let password = "nest";

export const register = async (req, res, err) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new userSchema({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      user: user._doc,
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot register user",
    });
  }
};

export const authentification = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const validPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!validPass) {
      return res.status(404).json({
        message: "Login or password not correct",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot login",
    });
  }
};

export const myInfo = async (req, res) => {
  try {
    const user = await userSchema.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.json({
      success: "found",
    });
  } catch (err) {}
};
