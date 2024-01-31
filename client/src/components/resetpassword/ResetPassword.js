import React, { useState } from "react";
import "./ResetPassword.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";
import store from "../../redux/store";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords Don't Match");
      setConfirmPassword("");
      setPassword("");
    } else {
      let url = "http://localhost:4000";
      if (process.env.NODE_ENV === "production") {
        url = process.env.REACT_APP_SERVER_BASE_URL;
      }
      const token = localStorage.getItem("RESET_TOKEN");
      try {
        const response = await axios.post(
          `${url}/auth/reset`,
          {
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
        if (response.data.statusCode === 401) {
            store.dispatch(
              showToast({
                type: TOAST_FAILURE,
                message: response.data.message,
              })
            );
            navigate('/forget')
        }
        if (response.data.statusCode === 500) {
             store.dispatch(
               showToast({
                 type: TOAST_FAILURE,
                 message: response.data.message,
               })
             );
        }
        if (response.data.statusCode === 200) {
             store.dispatch(
               showToast({
                 type: TOAST_SUCCESS,
                 message: response.data.message,
               })
             );
          
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="ResetPassword">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmpassword"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
          <input type="submit" className="submit" value="Reset Password" />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
