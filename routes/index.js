"use strict";
const router = require("express").Router();

let loading = "25";

router.get("/", function (req, res, next) {
    res.status(200).render("index", { loading });
});

module.exports = router;
