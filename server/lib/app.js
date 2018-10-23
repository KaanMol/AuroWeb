global._config = require("../config");
global._core = require("./loader");
global._root = process.cwd();

const express = require("express");
const app = express();
const cluster = require("cluster");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const http = require('http').createServer(app);
const https = _config.server.protocols.https.enabled ? require("https").createServer({
    key: fs.readFileSync(_config.server.protocols.https.ssl.key, "utf8"),
    cert: fs.readFileSync(_config.server.protocols.https.ssl.cert, "utf8")
}, app) : undefined;

const io = require("socket.io")(http);
const socketioJwt = require("socketio-jwt");

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${_config.server.host}/${_config.app.name}`, { useMongoClient: true })

if (_config.env === "development") {
    app.set("subdomain offset", 1);
}

if (cluster.isMaster) {
    const cpuCount = require("os").cpus().length;
    for (let i = 0; i < cpuCount; i++) {
        const worker = cluster.fork();
    }

    cluster.on("exit",
        (worker) => {
            console.log("Worker %d died :(", worker.id);
            cluster.fork();
        });
} else {

    app.use(cors());
    app.use("/", require("./route"));

    io.sockets
        .on('connection', socketioJwt.authorize({
            secret: global._config.server.jwtSecret,
            timeout: 15000
        })).on('authenticated', async function (socket) {
            socket.on('ping', async function () {
                socket.emit("pong")
            })
        })

    if (_config.server.protocols.https.enabled) {
       https.listen(_config.server.protocols.https.port);
       console.log("\x1b[1m\x1b[36m%s\x1b[0m", `worker ${cluster.worker.id}: ${_config.app.name} started! - https://${_config.server.host}:${_config.server.protocols.https.port}`);
    }
    
    http.listen(_config.server.protocols.http.port);
    console.log("\x1b[1m\x1b[35m%s\x1b[0m", `worker ${cluster.worker.id}: ${_config.app.name} started! - http://${_config.server.host}:${_config.server.protocols.http.port}`);
    
}
