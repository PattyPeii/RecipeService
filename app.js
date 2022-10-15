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

app.get('/', (req, res) => res.send('Recipe Service On!!'));
app.use("/recipe", recipeRoutes);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});

module.exports = app;
