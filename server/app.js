const express = require("express");
var cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const userroute = require("./routes/userroute");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/v1", userroute);
app.use(errorHandler);

module.exports = app;
