const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { User } = require("../db");
const verifyToken = (req, res, next) => {
  //middleware
  let token = req.header("token");
  if (!token) token = req.body.headers["token"];
  if (!token)
    return res.status(401).send({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ msg: "token is not valid" });
  }
};
const verifyRoleAdmin = (req, res, next) => {
  let user = req.user.user;
  User.findByPk(user.id)
    .then((user) => {
      if (user.role === "ADMIN_ROLE") {
        next();
      } else {
        res.status(401).send({ msg: "Unauthorized!" });
      }
    })
    .catch((err) => {
      res.status(401).send({ msg: "Unauthorized" });
    });
};
const verifyRoleVendor = (req, res, next) => {
  const user = req.user;
  if (user.role === "VENDOR_ROLE") {
    next();
  } else {
    res.json({ auth: false, error: "El Usuario no es vendedor" });
  }
};
module.exports = { verifyToken, verifyRoleAdmin, verifyRoleVendor };
