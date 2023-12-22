import React from 'react'
import "./Profile.scss"
import Post from '../post/Post'
import userImg from "../../assets/user.png";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
  const navigate=useNavigate();
  const myProfile=useSelector((state)=>state.appConfigReducer.myProfile)
  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="right-part">
            <div className="profile-card">
                <img className="user-img" src={myProfile?.avatar?.url} alt=''/>
                <h3 className="user-name">Sahilpreet Singh</h3>
                <div className="follower-info">
                    <h4>40 Followers</h4>
                    <h4>12 Following</h4>
                </div>
                <button className='follow btn-primary'>Follow</button>
                <button className='update-profile btn-secondary' onClick={()=>navigate("/updateProfile")}>Update Profile</button>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Profile