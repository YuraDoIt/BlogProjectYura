import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";

import { PostService, UserService } from "./controllers/controller-export.js";
import checkAuth from "./utils/check-auth.js";
import handleValidationError from "./validations/handleValidationError.js";
import {
  loginValidation,
  postValidation,
  registerValidation,
} from "./validations/validations.js";

dotenv.config();
const port = 3001;
const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("succesfully connected");
  })
  .catch(() => {
    console.log("error happend");
  });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PostRouter = express.Router();
PostRouter.get("/", PostService.getPost);
PostRouter.get("/:id", PostService.getPostById);
PostRouter.post("/", PostService.createPost);
PostRouter.put("/:id", PostService.updatePost);
PostRouter.delete("/", PostService.deletePostAll);
PostRouter.delete("/:id", postValidation, PostService.deleteById);
app.use("/posts", PostRouter);

app.post(
  "/auth/login",
  loginValidation,
  handleValidationError,
  UserService.authentification
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationError,
  UserService.register
);
app.get("/auth/me", checkAuth, UserService.myInfo);

// app.get("/posts", PostService.getPost);
// app.get("/posts/:id", PostService.getPostById);
// app.post("/posts", postValidation, PostService.createPost);
// app.put("/posts/:id", postValidation, PostService.updatePost);
// app.delete("/posts", postValidation, PostService.deletePostAll);
// app.delete("/posts/:id", postValidation, PostService.deleteById);

app.post("/upload", upload.single("image"), (req, res) => {
  res.status(200).json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(port, () => {
  console.log(`App listen ${port}`);
});
