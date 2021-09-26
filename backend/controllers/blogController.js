import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// @DESC    FETCH ALL POSTS
// @ROUTE   GET /api/posts
// @ACCESS  PUBLIC
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @DESC    FETCH USERS POSTS
// @ROUTE   GET /api/user/posts
// @ACCESS  PRIVATE
const getUsersPosts = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Post.countDocuments({
    $or: [{ user: req.user.id }],
    ...keyword,
  });
  const posts = await Post.find({ $or: [{ user: req.user.id }], ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @DESC    FETCH SINGLE POST
// @ROUTE   GET /api/posts/:id
// @ACCESS  PUBLIC
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @DESC    DELETE A POST
// @ROUTE   DELETE /api/posts/:id
// @ACCESS  PRIVATE
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: "Post Removed" });
  } else {
    res.status(400);
    throw new Error("Post not found");
  }
});

// @DESC    CREATE A POST
// @ROUTE   POST /api/posts
// @ACCESS  PRIVATE
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    title: "Sample Title",
    author: "Sample Author",
    user: req.user.id,
    body: "Sample Body",
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @DESC    UPDATE A POST
// @ROUTE   PUT /api/posts/:id
// @ACCESS  PRIVATE
const updatePost = asyncHandler(async (req, res) => {
  const { title, author, body } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.author = author;
    post.body = body;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export {
  getPostById,
  getPosts,
  getUsersPosts,
  createPost,
  updatePost,
  deletePost,
};
