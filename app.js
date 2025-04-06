const express = require("express");
const app = express();
require("dotenv").config();

const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const pool = require("./db/pool");

const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");





app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));




app.use("/", indexRouter);



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
