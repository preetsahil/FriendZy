const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User is not registered");
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(403).send("Incorrect password");
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    return res.status(200).send({ accessToken, refreshToken });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const refreshAccessTokenController = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh Token is Required");
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });

    return res.status(201).json({ accessToken });
  } catch (e) {
    console.log(e);
    return res.status(401).send("Invalid Refresh token");
  }
};

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    // console.log(token);
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
    // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
};
