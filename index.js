import * as dotenv from "dotenv";
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
import { createPost, getPost } from "./controllers/post-controller.js";

dotenv.config();
const port = 3001;
const app = express();

await mongoose
  .connect(process.env.MONGO_URL)
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

app.get("/posts", postValidation, getPost);
app.post("/posts", createPost);
// app.put("/posts", updatePost);
// app.delete("/posts", deletePost);

app.listen(port, () => {
  console.log(`App listen ${port}`);
});
