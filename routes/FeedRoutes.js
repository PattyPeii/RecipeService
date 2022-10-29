const express = require("express");
const { getFeed } = require("../controllers/FeedController");

const router = express.Router();

router.get("/", getFeed);

module.exports = router;
