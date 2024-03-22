const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.status(200).json({
    message: "My profile",
  });
});

module.exports = router;
