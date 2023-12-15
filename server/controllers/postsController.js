const getAllPostsController = async (req, res) => {
  // console.log(req._id);
  return res.send("these are the posts");
};

module.exports = {
  getAllPostsController,
};
