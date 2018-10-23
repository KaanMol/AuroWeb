const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const fs = require("fs");
const dirName = `${process.cwd()}/modules/api`;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use(function (req, res, next) {
    console.log(req.originalUrl);
    if (req.subdomains.length === 1 && req.subdomains[0] === global._config.app.subdomains.API) {
        req.url = `/api${req.originalUrl}`;
    } else if (req.subdomains.length === 1 && req.subdomains[0] === global._config.app.subdomains.CDN) {
        req.url = `/cdn${req.originalUrl}`;
    } else {
        req.url = `/client${req.originalUrl}`;
    }
    req.originalUrl = req.url;
    next();
});

//Add an unless route by this format

// FORMAT: /\/HERE_PATH*/
// EXAMPLE: // /\/api\/register*/



router.use(jwt({ secret: global._config.server.jwtSecret, requestProperty: "auth" }).unless({ path: [/\/client*/, /\/cdn*/, /\/auth\/register/, /\/auth\/login/, /\/auth\/refresh/]  }));

router.use(function (err, req, res, next) {
    if (err.code === "credentials_required") {
        return global._core.error("AUT8", res);
    } else if (err.code === "invalid_token") {
        return global._core.error("AUT9", res);
    }
    next();
});

router.use(`${global._config.app.subdomains.CDN}`, express.static(`${_root}/modules/cdn`));

router.use("/client", express.static(`${_root}/modules/client`));
router.get("/client/*", function(req, res) {
    res.sendFile(`${_root}/modules/client/index.html`);
});

fs.readdirSync(dirName).forEach(function (file) {
    if (fs.lstatSync(`${dirName}/${file}`).isDirectory()) {
        router.use(`/api/${file}`, require(`${dirName}/${file}/routes/${file}.route`));
    }
});

module.exports = router;
