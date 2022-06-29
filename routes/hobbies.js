"use strict";
const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const dicePath = path.join(__dirname, "../public/images/hobbies/dice");
const popSciencePath = path.join(__dirname, "../public/images/hobbies/pop-science");
const urlSciencePath = path.join(__dirname, "../input/links-to-pop-science.txt");

router.get("/", async function (req, res, next) {
    const dice = await fs.readdir(dicePath);
    const channelsImages = await fs.readdir(popSciencePath);
    let channelUrls = await fs.readFile(urlSciencePath);
    channelUrls = channelUrls.toString().split("\r\n");
    const channels = [];
    channelsImages.forEach((image, i) => {
        channels.push({
            image,
            path: channelUrls[i],
        });
    });

    res.status(200).render("hobbies", { dice, channels });
});

module.exports = router;
