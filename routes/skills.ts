import * as express from "express";
export const router = express.Router();
import path from "path";
import fs from "fs";
const fsPromises = fs.promises;

const skillPath = path.join(__dirname, "../public/images/skills"); // All skill logos are in this folder

router.get("/", async function (req, res, next) {
    const images = await fsPromises.readdir(skillPath);
    res.status(200).render("skills", { images });
    return router;
});
