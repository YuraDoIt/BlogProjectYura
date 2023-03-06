import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
