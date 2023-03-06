import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import * as UserService from "./controllers/user-controller.js";
import checkAuth from "./utils/check-auth.js";
import {
  registerValidation,
  loginValidation,
  postValidation,
} from "./validations/validations.js";
import * as PostService from "./controllers/post-controller.js";

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

app.post("/auth/login", loginValidation, UserService.authentification);
app.post("/auth/register", registerValidation, UserService.register);
app.get("/auth/me", checkAuth, UserService.myInfo);

app.get("/posts", postValidation, PostService.getPost);
app.get("/posts/:id", postValidation, PostService.getPost);
app.post("/posts", PostService.createPost);
// app.put("/posts", updatePost);
app.delete("/posts", PostService.deleteAll);

app.listen(port, () => {
  console.log(`App listen ${port}`);
});
