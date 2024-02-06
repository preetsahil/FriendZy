import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Follower from "../follower/Follower";
import "./Feed.scss";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

function Feed() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const visibleSuggestions=feedData?.suggestions?.slice(0,5)
  useEffect(() => {
    dispatch(getFeedData());
  },[dispatch]);
  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          {feedData?.posts?.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className="title">You Are Following</h3>
            {feedData?.followings?.map((user) => (
              <Follower user={user} key={user._id} />
            ))}
          </div>
          <div className="suggestions">
            <h3 className="title">Suggested For You</h3>
            {/* {feedData?.suggestions?.map((user) => (
              <Follower user={user} key={user._id} />
            ))} */}
            {visibleSuggestions?.map((user) => (
              <Follower user={user} key={user._id} />
            ))}
              <p style={{
                marginTop:'20px',
                textAlign:'center',
                color:'hwb(180 5% 33%)',
                cursor:'pointer'
              }} onClick={()=>{
                navigate('/suggestions')

              }}>See More Suggestions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
