import * as express from "express";
export const router = express.Router();

router.get("/", function (req, res, next) {
    res.status(200).render("contact");
    return router;
});
