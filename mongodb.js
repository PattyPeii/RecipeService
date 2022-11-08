const mongoose = require("mongoose");

mongoose.connect(
  'mongodb+srv://admin:Zxcv1234!@swa.6kfmj91.mongodb.net/?retryWrites=true&w=majority',
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
