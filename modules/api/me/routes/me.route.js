const router = require("express").Router();
const controllers = "../controllers";

router.get("/totp", (req, res) => { global._core.protect(require(`${controllers}/set-totp.controller`), req, res) });
router.delete("/totp", (req, res) => { global._core.protect(require(`${controllers}/remove-totp.controller`), req, res) });
router.get("/profile", (req, res) => { global._core.protect(require(`${controllers}/profile.controller`), req, res) });
router.post("/preferences/color", (req, res) => { global._core.protect(require(`${controllers}/color.controller`), req, res) });
router.post("/avatar", (req, res) => { global._core.protect(require(`${controllers}/avatar.controller`), req, res) });
router.get("/devices", (req, res) => { global._core.protect(require(`${controllers}/get-devices.controller`), req, res) });
//Fix me ffs
// router.delete("/devices", (req, res) => { global._core.protect(require(`${controllers}/delete-devices.controller`), req, res) });

module.exports = router;