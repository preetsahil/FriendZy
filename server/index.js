const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./dbConnect");
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const cloudinary = require("cloudinary").v2;

//middlewares
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
dotenv.config("./.env");

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.status(200).send("server is OK");
});
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 4001;
connectDB();

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
