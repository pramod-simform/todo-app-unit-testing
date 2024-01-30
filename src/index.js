const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const logger = require("./core/Logger");
const todoRoute = require("./routes/todo.route");
const loggerMiddleware = require("./middlewares/logger.middleware");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(cors({ origin: "*" }));

app.use(loggerMiddleware.logger());

app.use("/api/todo", todoRoute);
app.get("/", (req, res) => {
  return res.json("Server running!")
});

app.use((req, res, next) => {
  res.status(404).json({"error": "Not Found!"});
});

const server = app.listen(port, () =>
  logger.info(`API started, Port: ${port}`)
);

module.exports = { app, server };
