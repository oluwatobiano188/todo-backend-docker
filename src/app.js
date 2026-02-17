const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo.routes");
const logger = require("./logger");

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todos";

mongoose.connect(MONGO_URI)
  .then(() => logger.info("MongoDB connected"))
  .catch(err => logger.error(err));

app.use("/todos", todoRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
