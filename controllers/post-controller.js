import postSchema from "../Models/postSchema.js";

export const createPost = async (req, res) => {
  try {
    const doc = new postSchema({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.body.userId,
    });

    const post = await doc.save();
    console.log(post);
    return res.status(200).json({
      massage: "Successfully created",
      status: true,
      post: doc,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot create post",
      status: false,
    });
  }
};

export const getPost = async (req, res) => {
  const post = await postSchema.find().populate("user").exec();
  console.log(post);

  if (!post) {
    console.log(err);
    res.status(500).json({
      message: "Cannot create post",
      status: false,
    });
  }

  return res.status(200).json({
    post: post,
  });
};

export const getPostById = async (req, res) => {
  if (!req.params.id) {
    res.status(500).json({
      message: "Cannot show post by id",
      status: false,
    });
  }

  const postId = req.params.id;
  postSchema
    .findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          res.status(504).json({
            message: "Cannot return post",
            status: false,
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Post not found",
            status: false,
          });
        }

        res.json(doc);
      }
    )
    .populate("user");
};

export const deletePostAll = async (req, res) => {
  if (await postSchema.deleteMany().exec()) {
    return res
      .status(200)
      .json({ message: "All post successfully deleted", status: true });
  }
};

export const deleteById = async (req, res) => {
  const idPost = req.params.id;
  postSchema
    .findOneAndDelete(
      {
        _id: idPost,
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          res.status(500).json({
            message: "Cannot delete post by id",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Post not exist",
            status: false,
          });
        }

        res.json({
          message: "post deleted",
          status: true,
        });
      }
    )
    .clone();
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;

  // console.log(await postSchema.findById(postId));
  if (await postSchema.findById(postId)) {
    const updatePost = await postSchema
      .updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          tags: req.body.tags,
          user: req.body.userId,
        }
      )
      .exec();

    return res.status(200).json({
      message: "post updated",
      status: true,
    });
  }
  return res.status(404).json({
    message: "post not exist",
    status: false,
  });
};
