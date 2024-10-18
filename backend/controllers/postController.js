const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const getPosts = async (req, res) => {
  try {
    const posts = req.query.cat
      ? await Post.find({ cat: req.query.cat }).populate("uid", "username")
      : await Post.find().populate("uid", "username");
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("uid", "username");
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = userInfo;
    next();
  });
};

const verifyPostOwnership = async (req, res, next) => {
  try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).send("Post not found");

      if (post.uid.toString() !== req.user.id) {
          return res.status(403).send("You do not own this post.");
      }
      next();
  } catch (error) {
      console.error("Ownership verification failed:", error);
      return res.status(500).send("Internal Server Error");
  }
};


const addPost = async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.img,
    cat: req.body.cat,
    uid: req.user.id,
  });

  try {
    await newPost.save();
    return res.json("Post has been created.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post || post.uid.toString() !== userInfo.id) {
      return res.status(403).json("You can delete only your post!");
    }

    await Post.findByIdAndDelete(postId);
    return res.json("Post has been deleted!");
  });
};

const updatePost = async (req, res) => {
  const { title, desc, img, cat } = req.body;

  try {
      const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { title, desc, img, cat },
          { new: true, runValidators: true }
      );

      if (!updatedPost) {
          return res.status(404).send("Post not found");
      }

      res.status(200).json(updatedPost);
  } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).send("Internal Server Error");
  }
};



module.exports = {
  getPosts,
  getPost,
  verifyToken,
  addPost,
  deletePost,
  verifyPostOwnership,
  updatePost,
};


