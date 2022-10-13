const express = require("express");
const mongoose = require("mongoose");
const memberRouter = require("./routes/MemberRoutes");

const app = express();

require("dotenv").config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/members", memberRouter);

console.log(process.env.MONGODB_URI);

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});

module.exports = app;
