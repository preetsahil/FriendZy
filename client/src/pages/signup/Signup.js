import React, { useState } from "react";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords Don't Match");
      setConfirmPassword("");
      setPassword("");
    } else {
      try {
        const response=await axiosClient.post("/auth/signup", {
          name,
          email,
          password,
        });
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="heading">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />

          <input type="submit" className="submit" value="Sign up" />
        </form>

        <p className="subheading">
          Do not have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
