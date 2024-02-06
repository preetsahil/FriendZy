const router = require("express").Router();
const authController = require("../controllers/authController");
const reset = require("../middlewares/reset");

router.post("/signup", authController.signupController);
router.post("/login", authController.loginController);
router.post("/forget", authController.forgetPasswordController);
router.post("/reset",reset,authController.resetController)
router.get("/refresh", authController.refreshAccessTokenController);
router.post("/logout", authController.logoutController);


module.exports = router;
