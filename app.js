const express = require("express");
const path = require("path");
const app = express();

const indexRouter = require("./routes/index");
const expressLayouts = require("express-ejs-layouts");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

app.use("/", indexRouter);

module.exports = { app };
