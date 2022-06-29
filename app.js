const express = require("express");
const path = require("path");
const app = express();
const { db } = require("./db/db");

const indexRouter = require("./routes/index");
const skillsRouter = require("./routes/skills");
const contactRouter = require("./routes/contact");
const projectRouter = require("./routes/projects");
// const projectHelhaRevisionRouter = require("./routes/projects/helha-revision");
// const project1Router = require("./routes/projects/project1");
// const project2Router = require("./routes/projects/project2");
// const currentProjectsRouter = require("./routes/projects/current");
// const alarmProjectRouter = require("./routes/projects/alarm");
const hobbiesRouter = require("./routes/hobbies");

const expressLayouts = require("express-ejs-layouts");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

/* ------------------- DATABASE MIDDLEWARE --------------------------- */
app.use(async (req, res, next) => {
    // #region Creating or Retrieving visitor
    const visitorIpAddress = req.ip;

    let [[visitor]] = await db
        .promise()
        .query(`SELECT * FROM visitor WHERE ipAddress = ?`, [visitorIpAddress]);

    let visitorId;
    if (visitor == null) {
        const [result] = await db
            .promise()
            .query(`INSERT INTO visitor (ipAddress) VALUES (?)`, [visitorIpAddress]);
        visitorId = result.insertId;
    } else {
        visitorId = visitor.id;
    }
    // #endregion

    // #region Creating or Retrieving pageSeen
    // Checking if visitor has seen the current page or not
    const url = req.url;
    let [[pageSeen]] = await db
        .promise()
        .query(`SELECT * FROM pageSeen WHERE visitor_id = ? AND url = ?`, [visitorId, url]);
    let pageSeenId;
    if (pageSeen == null) {
        const [result] = await db
            .promise()
            .query(`INSERT INTO pageSeen (url,visitor_id) VALUES (?,?)`, [url, visitorId]);
        pageSeenId = result.insertId;
    } else {
        pageSeenId = pageSeen.id;
    }
    // #endregion

    // #region Creating new timestamp for the visit
    const now = new Date(Date.now());
    await db.promise().query(`INSERT INTO timestamp (value, pageSeen_id) VALUES (?,?)`, [now, pageSeenId]);
    // #endregion
    next();
});

app.use("/", indexRouter);
app.use("/skills", skillsRouter);
app.use("/contact", contactRouter);
app.use("/projects", projectRouter);
app.use("/hobbies", hobbiesRouter);
// app.use("/project1", project1Router);
// app.use("/project2", project2Router);
// app.use("/current", currentProjectsRouter);
// app.use("/alarm", alarmProjectRouter);

module.exports = { app };
