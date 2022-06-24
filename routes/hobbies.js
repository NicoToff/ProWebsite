"use strict";
const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const dicePath = path.join(__dirname, "../public/images/hobbies/dice");

router.get("/", async function (req, res, next) {
    const dice = await fs.readdir(dicePath);
    res.status(200).render("hobbies", { dice });
});

module.exports = router;
