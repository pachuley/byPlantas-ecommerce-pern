const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const verifyToken = async (req, res, next) => {
  let token = req.get("token");
  await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ auth: false, error: err });
    }
    req.user = decoded.user;
  });
  next();
};
const verifyRoleAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === "ADMIN_ROLE") {
    next();
  } else {
    res.json({ auth: false, error: "El Usuario no es administrador" });
  }
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
