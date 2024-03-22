const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

//routes
router.post("/signup", register);
//router.post("/login", login);
//router.post("/logout", logout);

module.exports = router;
