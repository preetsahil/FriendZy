const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;
const { mapPostOutput } = require("../utils/Utils");

const createPostController = async (req, res) => {
  try {
    const { caption, postImg } = req.body;

    if (!postImg) {
      return res.send(error(400, "postImg are required"));
    }

    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "postImg",
    });

    const owner = req._id;

    const user = await User.findById(req._id);

    const post = await Post.create({
      owner,
      caption,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
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

    const post = await Post.findById(postId).populate("owner");

    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    if (post.likes.includes(curUserID)) {
      const index = post.likes.indexOf(curUserID);
      post.likes.splice(index, 1);
    } else {
      post.likes.push(curUserID);
    }
    await post.save();
    aw;
    return res.send(success(200, post));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const commentsController = async (req, res) => {
  try {
    const { postId, text } = req.body;
    if (!postId) {
      return res.send(error(400, "postId is required"));
    }
    if (!text) {
      return res.send(error(400, "text is required"));
    }
    const curUserId = req._id;

    const post = await Post.findById(postId).populate("owner");

    if (!post) {
      return res.send(error(404, "Post not found"));
    }
    const newComment = {
      user: curUserId,
      text,
    };
    post.comments.push(newComment);

    await post.save();
    await post.populate("comments.user");
    return res.send(success(200, { post: mapPostOutput(post, req._id) }));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption, postImg } = req.body;
    if (!postId) {
      return res.send(error(400, "postId is required"));
    }

    const curUserID = req._id;
    const post = await Post.findById(postId);

    if (post.owner.toString() !== curUserID) {
      return res.send(error(403, "Only owners can update their posts"));
    }

    if (caption) {
      post.caption = caption;
    }
    if (postImg) {
      const cloudImg = await cloudinary.uploader.upload(postImg, {
        folder: "postImg",
      });
      post.image.publicId = cloudImg.public_id;
      post.image.url = cloudImg.url;
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
    if (!postId) {
      return res.send(error(400, "postId is required"));
    }

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
  commentsController,
  updatePostController,
  deletePost,
};
