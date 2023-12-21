import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import dummyUserImg from "../../assets/user.png";

function UpdateProfile() {


  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={dummyUserImg} alt="" />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
            //   onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form>
            <input
            //   value={name}
              type="text"
              placeholder="Your Name"
            //   onChange={(e) => setName(e.target.value)}
            />
            <input
            //   value={bio}
              type="text"
              placeholder="Your Bio"
            //   onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="submit"
              className="btn-primary"
            //   onClick={handleSubmit}
            />
          </form>
          <button className="delete-account btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
