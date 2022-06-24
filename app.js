const express = require("express");
const path = require("path");
const app = express();

const indexRouter = require("./routes/index");
const skillsRouter = require("./routes/skills");
const contactRouter = require("./routes/contact");
const projectHelhaRevisionRouter = require("./routes/projects/helha-revision");
const project1Router = require("./routes/projects/project1");
const project2Router = require("./routes/projects/project2");
const currentProjectsRouter = require("./routes/projects/current");
const alarmProjectRouter = require("./routes/projects/alarm");

const hobbiesRouter = require("./routes/hobbies");

const expressLayouts = require("express-ejs-layouts");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

app.use("/", indexRouter);
app.use("/skills", skillsRouter);
app.use("/contact", contactRouter);
app.use("/helha-revision", projectHelhaRevisionRouter);
app.use("/hobbies", hobbiesRouter);
app.use("/project1", project1Router);
app.use("/project2", project2Router);
app.use("/current", currentProjectsRouter);
app.use("/alarm", alarmProjectRouter);

module.exports = { app };
