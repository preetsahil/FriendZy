const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./dbConnect");
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
dotenv.config("./.env");
app.get("/", (req, res) => {
  res.status(200).send("server is OK");
});
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

const PORT = process.env.PORT || 4001;
connectDB();

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
