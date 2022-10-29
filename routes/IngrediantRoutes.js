const express = require("express");
const { createIngrediant, getIngrediant, deleteIngrediant, getIngrediantByID, updateIngrediant } = require("../controllers/IngrediantController");

const router = express.Router();

router.get("/", getIngrediant).post("/", createIngrediant);
router.route("/:id").get(getIngrediantByID).put(updateIngrediant).delete(deleteIngrediant);

module.exports = router;
