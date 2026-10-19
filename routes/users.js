const mongoose = require("mongoose");
const plm = require('passport-local-mongoose').default;

mongoose.connect("mongodb://127.0.0.1:27017/Pinterest");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  dp: {
    type: String,
    // assuming the profile picture is stored as a URL or file path
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
