const jwt = require("jsonwebtoken");
const { error,success } = require("../utils/responseWrapper");
const reset = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Authorization header is required"));
  }
  const resetToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_PRIVATE_KEY);
    req.email = decoded.email;
    next();

  } catch (e) {
    return res.send(
      error(
        401,
        "Link is expired, Password not reset, Please enter the email again for the link"
      )
    );
  }
};
module.exports = reset;
