const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo.routes");

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todos";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/todos", todoRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
