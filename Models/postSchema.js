import mongoose from "mongoose";

export const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
    imageUrl: {
      type: String,
      require: false,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", postSchema);
