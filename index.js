import express from "express";
import mongoose from "mongoose";
import {
  authentification,
  myInfo,
  register,
} from "./controllers/user-controller.js";
import checkAuth from "./utils/check-auth.js";
import {
  registerValidation,
  loginValidation,
  postValidation,
} from "./validations/validations.js";
import { createPost } from "./controllers/post-controller.js";

const port = 3001;
const app = express();

await mongoose
  .connect(
    "mongodb+srv://yura:12345@cluster0.sidteqi.mongodb.net/blog_db?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("succesfully connected");
  })
  .catch(() => {
    console.log("error happend");
  });

app.use(express.json());

app.post("/auth/login", loginValidation, authentification);
app.post("/auth/register", registerValidation, register);
app.get("/auth/me", checkAuth, myInfo);

app.get("/post/create", postValidation, createPost);

app.listen(port, () => {
  console.log(`App listen ${port}`);
});
