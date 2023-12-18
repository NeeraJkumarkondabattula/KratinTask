const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = await req.body.headers.Authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Auth Failed",
        success: false,
      });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
};
