"use strict";
const router = require("express").Router();

router.get("/alarm", function (req, res, next) {
    res.status(200).render("projects/alarm");
});

router.get("/current", function (req, res, next) {
    res.status(200).render("projects/current");
});

router.get("/helha-revision", function (req, res, next) {
    res.status(200).render("projects/helha-revision");
});

router.get("/project1", function (req, res, next) {
    res.status(200).render("projects/project1");
});

router.get("/project2", function (req, res, next) {
    res.status(200).render("projects/project2");
});

module.exports = router;
