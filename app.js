const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.MONGODB_URI);

//MongoDB connection
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

// routes definitions
const recipeRoutes = require("./routes/RecipeRoutes");

app.get('/', (req, res) => res.send('Recipe Service On!!'));

app.use("/recipe", recipeRoutes);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});

module.exports = app;
