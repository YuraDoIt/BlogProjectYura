import postSchema from "../Models/postSchema.js";

export const createPost = async (req, res) => {
  try {
    const doc = new postSchema({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    console.log(post);
    return res.status(200).json({
      massage: "Successfully created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot create post",
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await postSchema.find({ title: req.body.title });
    console.log(post);

    return res.status(200).json({
      massage: "Successfully created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot create post",
    });
  }
};
