import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoute from "./route/authRoute.js"
import db from "./config/db.js";
dotenv.config();
const app = express();
db();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth",authRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});