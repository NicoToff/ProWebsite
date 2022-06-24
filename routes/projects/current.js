"use strict";
const router = require("express").Router();

router.get("/", function (req, res, next) {
    res.status(200).render("projects/current");
});

module.exports = router;
