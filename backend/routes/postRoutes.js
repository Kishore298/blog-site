const express = require('express');
const { getPosts,getPost,verifyToken,verifyPostOwnership,addPost,updatePost,deletePost} = require("../controllers/postController");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/",verifyToken, addPost);
router.put("/:id",verifyToken,verifyPostOwnership, updatePost);
router.delete("/:id",verifyToken,verifyPostOwnership, deletePost);

module.exports = router;
