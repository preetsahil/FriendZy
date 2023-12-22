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
router.get("/getMyPosts", requireUser, UserController.getMyPosts);
router.post("/getUserPosts", requireUser, UserController.getUserPosts);
router.delete("/", requireUser, UserController.deleteMyProfile);
router.get("/getMyInfo", requireUser, UserController.getMyInfo);
router.put("/", requireUser, UserController.updateMyProfile);



module.exports = router;
