const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    min: [0, "Likes cannot be less than 0"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: function (obj, retObject) {
    retObject.id = retObject._id.toString();
    delete retObject._id;
    delete retObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
