const router = require("express").Router();
const UserController = require("../controllers/userController");
const requireUser = require("../middlewares/requireUser");

router.post(
  "/follow",
  requireUser,
  UserController.followOrUnfollowUserController
);
router.get(
  "/getFeedData",
  requireUser,
  UserController.getFeedData
);
router.delete("/", requireUser, UserController.deleteMyProfile);
router.get("/getMyInfo", requireUser, UserController.getMyInfo);
router.put("/", requireUser, UserController.updateMyProfile);
router.post("/getUserProfile", requireUser, UserController.getUserProfile);

module.exports = router;
