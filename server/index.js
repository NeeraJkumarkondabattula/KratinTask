const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const userRoute = require("./route/userRoute");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 3434;

mongoose
  .connect(process.env.MongoUrl)
  .then(() => console.log("database connected.."));

app.listen(PORT, () => {
  console.log("server running on port: " + PORT);
});
