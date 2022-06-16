"use strict";
const express = require("express");
const router = express.Router();

let loading = "20";

router.get("/", function (req, res, next) {
    res.status(200).render("index", { loading });
});

module.exports = router;
