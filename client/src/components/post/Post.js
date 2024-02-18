import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";

function Post({ post }) {
  const [isOpen,setisOpen]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handlePostLiked() {
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    ) 
  }

  return (
    <div className="Post">
      <div className="header">
        <div
          className="heading"
          onClick={() => navigate(`/profile/${post.owner?._id}`)}
        >
          <Avatar src={post.owner?.avatar?.url} />
          <h4>{post.owner?.name}</h4>
        </div>
        <div className="update" onClick={() => setisOpen(!isOpen)}>
          <BsThreeDotsVertical />
        </div>
        {isOpen && (
        <ul className="dropdown">
          <li>Update Post</li>
          <li>Delete Post</li>
        </ul>
        )}
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLiked}>
          {post.isLiked ? (
            <AiFillHeart style={{ color: "red" }} className="icon" />
          ) : (
            <AiOutlineHeart className="icon" />
          )}
          <h4>
            {post.likesCount > 1
              ? `${post.likesCount} likes`
              : `${post.likesCount} like`}
          </h4>
        </div>
        <p className="caption">{post.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
