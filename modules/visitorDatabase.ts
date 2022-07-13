import { Request, Response, NextFunction } from "express";
import { db } from "../db/db";

export const visitorDatabase = async (req: Request, res: Response, next: NextFunction) => {
    // #region Creating or Retrieving visitor
    const visitorIpAddress = req.ip;

    if (visitorIpAddress === "::1") {
        return next();
    }

    let [[visitor]] = await db
        .promise()
        .query(`SELECT * FROM visitor WHERE ipAddress = ?`, [visitorIpAddress]);

    let visitorId;
    if (visitor == null) {
        const [result] = await db
            .promise()
            .query(`INSERT INTO visitor (ipAddress) VALUES (?)`, [visitorIpAddress]);
        visitorId = result.insertId;
    } else {
        visitorId = visitor.id;
    }
    // #endregion

    // #region Creating or Retrieving pageSeen
    // Checking if visitor has seen the current page or not
    const url = req.url;
    let [[pageSeen]] = await db
        .promise()
        .query(`SELECT * FROM pageSeen WHERE visitor_id = ? AND url = ?`, [visitorId, url]);
    let pageSeenId;
    if (pageSeen == null) {
        const [result] = await db
            .promise()
            .query(`INSERT INTO pageSeen (url,visitor_id) VALUES (?,?)`, [url, visitorId]);
        pageSeenId = result.insertId;
    } else {
        pageSeenId = pageSeen.id;
    }
    // #endregion

    // #region Creating new timestamp for the visit
    const now = new Date(Date.now());
    await db.promise().query(`INSERT INTO timestamp (value, pageSeen_id) VALUES (?,?)`, [now, pageSeenId]);
    // #endregion
    return next();
};
