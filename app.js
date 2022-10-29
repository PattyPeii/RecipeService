const express = require("express");
const app = express();

require("dotenv").config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // MongoDB connection
// require("./mongodb");

// routes definitions
const recipeRoutes = require("./routes/RecipeRoutes");
const ingrediantRoutes = require("./routes/IngrediantRoutes");
const feedRoutes = require("./routes/FeedRoutes");

app.get('/', (req, res) => res.send('Recipe Service On!!'));
app.use("/recipe", recipeRoutes);
app.use("/ingrediant", ingrediantRoutes);
app.use("/feed", feedRoutes);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});

module.exports = app;
