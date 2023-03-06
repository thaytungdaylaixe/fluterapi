const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

const connectDB = require("./config/db");
connectDB();

const UserRoute = require("./user/user.router");

app.use(bodyParser.json());

app.use("/users", UserRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server Listening on port http://localhost:${port}`);
});
