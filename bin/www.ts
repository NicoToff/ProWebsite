import http from "http";
import { app } from "../app";
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
server.listen(port);

function normalizePort(val: string) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
