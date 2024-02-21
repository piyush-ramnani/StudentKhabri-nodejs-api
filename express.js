const express = require("express");
const app = express();

//--MIDDLEWARE--
app.use(express.json());

const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");

app.get("/", (req, res) => {
  res.redirect("/api/v1");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
