const router = require("express").Router();
const UserController = require("../controllers/userController");
const requireUser = require("../middlewares/requireUser");

router.post(
  "/follow",
  requireUser,
  UserController.followOrUnfollowUserController
);
router.get(
  "/getPostsOfFollowing",
  requireUser,
  UserController.getPostsOfFollowing
);

module.exports = router;
