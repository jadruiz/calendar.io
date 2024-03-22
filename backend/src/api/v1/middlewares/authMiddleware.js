const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../config/env");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. No se encontró el token.",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    //Verify token using secret key
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Token inválido o expirado.",
    });
  }
};

module.exports = authMiddleware;
