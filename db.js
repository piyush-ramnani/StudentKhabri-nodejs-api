//SCHEMA DESIGN

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:02041996@practisecluster.agvl9l9.mongodb.net/studentKhabri?appName=mongosh+2.1.3"
);

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const userSchema = new mongoose.Schema({
  userId: String,
  firstname: { type: String },
  lastname: String,
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
});

const Todo = mongoose.model("Todo", TodoSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Todo,
  User,
};
