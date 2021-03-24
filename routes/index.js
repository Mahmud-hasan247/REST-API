const express = require("express");
const router = express.Router();

// root route
router.get("/", (req, res) => {
  res.send("This is the home page!");
});

// not found
router.get("*", (req, res) => {
  res.send("Not Found");
});
module.exports = router;
