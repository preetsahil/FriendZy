const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!caption) {
      return res.send(error(400, "Caption and postImg are required"));
    }

    const owner = req._id;

    const user = await User.findById(req._id);

    const post = await Post.create({
      owner,
      caption,
    });

    user.posts.push(post._id);
    await user.save();

    return res.json(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const likeAndUnlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserID = req._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    if (post.likes.includes(curUserID)) {
      const index = post.likes.indexOf(curUserID);
      post.likes.splice(index, 1);
      await post.save();
      return res.send(success(200, "post unliked"));
    } else {
      post.likes.push(curUserID);
      await post.save();
      return res.send(success(200, "post liked"));
    }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;

    const curUserID = req._id;
    const post = await Post.findById(postId);

    if (post.owner.toString() !== curUserID) {
      return res.send(error(403, "Only owners can update their posts"));
    }

    if (caption) {
      post.caption = caption;
    }

    await post.save();
    return res.send(success(200, { post }));
  } catch (e) {
    console.log(e);
    return res.send(error(500, e.message));
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);
    const curUser = await User.findById(curUserId);

    if (!post) {
      return res.send(error(404, "Post not found"));
    }
    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, "Only owners can delete their posts"));
    }

    const index = curUser.posts.indexOf(postId);
    curUser.posts.splice(index, 1);
    await curUser.save();
    await post.deleteOne();

    return res.send(success(200, "post deleted successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
module.exports = {
  createPostController,
  likeAndUnlikePost,
  updatePostController,
  deletePost,
};
