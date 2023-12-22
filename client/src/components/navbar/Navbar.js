import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import {  useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const myProfile=useSelector((state)=>state.appConfigReducer.myProfile)
function handleLogoutClicked(){}
  
  return (
    <div className="Navbar">
      <div className="container">
        <h2
          className="banner hover-link"
          onClick={() => {
            navigate("/");
          }}
        >
          FriendZy
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => {
              navigate(`/profile/${myProfile?._id}`);
            }}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
