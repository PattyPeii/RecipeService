const express = require("express");
const { getCategory } = require("../controllers/CategoryController");

const router = express.Router();

router.get("/", getCategory);

module.exports = router;
