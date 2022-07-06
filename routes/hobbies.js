"use strict";
const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const dicePath = path.join(__dirname, "../public/images/hobbies/dice");
const popSciencePath = path.join(__dirname, "../public/images/hobbies/pop-science");
const urlSciencePath = path.join(__dirname, "../input/links-to-pop-science.json");

router.get("/", async function (req, res, next) {
    // Sending dice images from folder
    const dice = await fs.readdir(dicePath);
    // Sending channel images and informations
    const channelsImages = await fs.readdir(popSciencePath); // All images in this folder
    let channelUrls = await fs.readFile(urlSciencePath); // URLs to channels are stored in this JSON file
    channelUrls = JSON.parse(channelUrls?.toString());

    const channels = [];
    channelsImages.forEach((image, i) => {
        channels.push({
            image,
            path: channelUrls[i]?.url,
            name: channelUrls[i]?.url.split("/")?.pop(), // Gets last element of the URL
        });
    });

    res.status(200).render("hobbies", { dice, channels });
});

module.exports = router;
