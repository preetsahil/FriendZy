const router = require("express").Router();
const postsController = require("../controllers/postsController");
const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, postsController.createPostController);
router.post("/like", requireUser, postsController.likeAndUnlikePost);
// router.post("/comment", requireUser, postsController.commentController);
router.put("/", requireUser, postsController.updatePostController);
router.delete("/", requireUser, postsController.deletePost);

module.exports = router;
