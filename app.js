const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

const swaggerUi = require('swagger-ui-express')

const swaggerCategoryRoutesFile = require('./swagger_output_CategoryRoutes.json')
const swaggerFeedRoutesFile = require('./swagger_output_FeedRoutes.json')
const swaggerIngrediantRoutesFile = require('./swagger_output_IngrediantRoutes.json')
const swaggerRecipeRoutesFile = require('./swagger_output_RecipeRoutes.json')


require("dotenv").config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
require("./mongodb");

// routes definitions
const recipeRoutes = require("./routes/RecipeRoutes");
const ingrediantRoutes = require("./routes/IngrediantRoutes");
const feedRoutes = require("./routes/FeedRoutes");

app.get("/", (req, res) => res.send("Recipe Service On!!"));
app.use("/recipe", recipeRoutes);
app.use("/ingrediant", ingrediantRoutes);
app.use("/feed", feedRoutes);

// swagger doc
var options = {}

app.use(
  "/doc/FeedRoutes",
  swaggerUi.serveFiles(swaggerFeedRoutesFile, options),
  swaggerUi.setup(swaggerFeedRoutesFile)
);

app.use(
  "/doc/CategoryRoutes",
  swaggerUi.serveFiles(swaggerCategoryRoutesFile, options),
  swaggerUi.setup(swaggerCategoryRoutesFile)
);

app.use(
  "/doc/IngrediantRoutes",
  swaggerUi.serveFiles(swaggerIngrediantRoutesFile, options),
  swaggerUi.setup(swaggerIngrediantRoutesFile)
);

app.use(
  "/doc/RecipeRoutes",
  swaggerUi.serveFiles(swaggerRecipeRoutesFile, options),
  swaggerUi.setup(swaggerRecipeRoutesFile)
);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});

module.exports = app;
