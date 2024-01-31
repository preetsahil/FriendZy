const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { error, success } = require("../utils/responseWrapper");
const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      // return res.status(400).send("All fields are required");
      return res.send(error(400, "All fields are required"));
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      // return res.status(409).send("User is already registered");
      return res.send(error(409, "User is already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // const newUser = await User.findById(user._id);   password select:false

    // return res.status(201).send(newUser);
    return res.send(success(201, "user registered successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields are required"));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.send(error(404, "User is not registered"));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.send(error(403, "Incorrect password"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, { accessToken }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res.send(error(401, "Refresh Token in cookie is Required"));
  }
  const refreshToken = cookies.jwt;
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });

    return res.send(success(201, { accessToken }));
  } catch (e) {
    console.log(e);
    return res.send(error(401, "Invalid refresh Token"));
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "user logged out"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const forgetPasswordController = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send(
      error(404, "This email is not registered on the platform! Please SignUp")
    );
  }
  let url = "http://localhost:3000/#";
  if (process.env.NODE_ENV === "production") {
    url = process.env.CORS_ORIGIN;
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sahilcloud56@gmail.com",
      pass: "pqzc lvns yckv crqz",
    },
  });

  transporter.sendMail({
    from: '"Sahil 👻" <sahilcloud56@gmail.com>',
    to: email,
    subject: "Password Reset",
    html: `<p> Password reset link</p>
      <a href='${url}/reset' style='border-radius: 5px;padding: 10px 25px;font-size: 20px;text-decoration: none;margin: 20px;color: #fff;position: relative;display: inline-block;  background-color: #55acee;'>Click here to reset your password</a>`,
  });
  const resetToken = generateResetToken({
    email,
  });
  res.send(success(200, resetToken));
};

const generateResetToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.RESET_TOKEN_PRIVATE_KEY, {
      expiresIn: "5m",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const resetController = async (req, res) => {
  try {
    const email = req.email;
    const { password } = req.body;
    const user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return res.send(success(200, "password updated successfully"));
  } catch (e) {
    return res.send(
      error(500, "internal server error try again!")
    );
  }
};
module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
  logoutController,
  forgetPasswordController,
  resetController,
};
