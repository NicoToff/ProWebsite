"use strict";
const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const dicePath = path.join(__dirname, "../public/images/hobbies/dice");
const popSciencePath = path.join(__dirname, "../public/images/hobbies/pop-science");
const urlSciencePath = path.join(__dirname, "../input/links-to-pop-science.txt");

router.get("/", async function (req, res, next) {
    // Sending dice images from folder
    const dice = await fs.readdir(dicePath);
    // Sending channel images and informations
    const channelsImages = await fs.readdir(popSciencePath); // All images are there
    let channelUrls = await fs.readFile(urlSciencePath); // URLs to channels are stored in this file
    channelUrls = channelUrls?.toString()?.split("\r\n");
    const channels = [];
    channelsImages.forEach((image, i) => {
        channels.push({
            image,
            path: channelUrls[i],
            name: channelUrls[i]?.split("/")?.pop(), // Gets last element of the URL
        });
    });

    res.status(200).render("hobbies", { dice, channels });
});

module.exports = router;
