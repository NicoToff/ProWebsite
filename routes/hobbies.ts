import * as express from "express";
export const router = express.Router();
import path from "path";
import fs from "fs";
const fsPromises = fs.promises;

const dicePath: string = path.join(__dirname, "../public/images/hobbies/dice");
const popSciencePath: string = path.join(__dirname, "../public/images/hobbies/pop-science");
const urlSciencePath: string = path.join(__dirname, "../input/links-to-pop-science.json");

type Channel = {
    image: string;
    path: string;
    name: string;
};
type Url = {
    url: string;
};

router.get("/", async function (req, res, next) {
    // Sending dice images from folder
    const dice: string[] = await fsPromises.readdir(dicePath);
    // Sending channel images and informations
    const channelsImages: string[] = await fsPromises.readdir(popSciencePath); // All images in this folder
    let query: Buffer = await fsPromises.readFile(urlSciencePath); // URLs to channels are stored in this JSON file
    const channelUrls: Url[] = JSON.parse(query.toString());

    const channels: Channel[] = [];
    channelsImages.forEach((image: string, i: number) => {
        channels.push({
            image,
            path: channelUrls[i]?.url,
            name: channelUrls[i]?.url?.split("/")?.pop()!, // Gets last element of the URL
        });
    });

    res.status(200).render("hobbies", { dice, channels });
    return router;
});
