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
    channelUrls = channelUrls?.toString()?.split(";");
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
/*
https://www.youtube.com/c/SciShowhttps://www.youtube.com/c/inanutshellhttps://www.youtube.com/c/ScienceClichttps://www.youtube.com/c/TomScottGohttps://www.youtube.com/user/Computerphilehttps://www.youtube.com/c/BaladeMentaleChainehttps://www.youtube.com/c/Voxhttps://www.youtube.com/c/Wendoverproductionshttps://www.youtube.com/c/ScienceEtonnantehttps://www.youtube.com/c/VICEhttps://www.youtube.com/c/PowerCertAnimatedVideoshttps://www.youtube.com/c/JustHaveaThink
*/
