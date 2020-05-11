const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

//DB url
const db_url = require("../config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db_url, options)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error -> ", err));