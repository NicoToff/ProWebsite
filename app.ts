import express from "express";
export const app = express();
import path from "path";
// import { visitorDatabase } from "./modules/visitorDatabase";

import { router as indexRouter } from "./routes/index";
import { router as skillsRouter } from "./routes/skills";
import { router as contactRouter } from "./routes/contact";
import { router as projectRouter } from "./routes/projects";
import { router as hobbiesRouter } from "./routes/hobbies";

import expressLayouts from "express-ejs-layouts";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);
// app.use(visitorDatabase);

app.use("/", indexRouter);
app.use("/skills", skillsRouter);
app.use("/contact", contactRouter);
app.use("/projects", projectRouter);
app.use("/hobbies", hobbiesRouter);
