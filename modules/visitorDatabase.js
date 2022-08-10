const { db } = require("../db/db");
const { generateUUID } = require("./helperFunctions");

const visitorDatabase = async (req, res, next) => {
    // #region Creating or Retrieving visitor's UUID
    const visitorUuid = req.body.uuid; // TODO Need to store this into a cookie

    if (visitorUuid === "::1") {
        return next();
    }

    let [[visitor]] = await db.promise().query(`SELECT * FROM visitor WHERE uuid = ?`, [visitorUuid]);

    let visitorId;
    if (visitor == null) {
        const [result] = await db.promise().query(`INSERT INTO visitor (uuid) VALUES (?)`, [visitorUuid]);
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
    next();
};

module.exports = { visitorDatabase };
