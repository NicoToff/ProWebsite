import * as express from "express";
export const router = express.Router();

router.get("/alarm", function (req, res, next) {
    res.status(200).render("projects/alarm");
    return router;
});

router.get("/current", function (req, res, next) {
    res.status(200).render("projects/current");
    return router;
});

router.get("/helha-revision", function (req, res, next) {
    res.status(200).render("projects/helha-revision");
    return router;
});

router.get("/project1", function (req, res, next) {
    res.status(200).render("projects/project1");
    return router;
});

router.get("/project2", function (req, res, next) {
    res.status(200).render("projects/project2");
    return router;
});
