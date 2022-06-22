"use strict";
const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const skillPath = path.join(__dirname, "../public/images/skills");

router.get("/", async function (req, res, next) {
    const images = await fs.readdir(skillPath);
    res.status(200).render("skills", { images });
});

module.exports = router;
