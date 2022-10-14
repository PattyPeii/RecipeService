const express = require("express");
const { getCategory } = require("../controllers/CategoryController");
const { createRecipe, getRecipe, deleteRecipe, getRecipeByID, updateRecipe } = require("../controllers/RecipeController");

const router = express.Router();

router.get("/", getRecipe).post("/", createRecipe);
router.route("/:id").get(getRecipeByID).put(updateRecipe).delete(deleteRecipe);

module.exports = router;
