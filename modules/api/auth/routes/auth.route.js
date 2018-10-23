const router = require("express").Router();
const controllers = "../controllers";

router.post("/login", (req, res) => { global._core.protect(require(`${controllers}/login.controller`), req, res) });
router.post("/register", (req, res) => { global._core.protect(require(`${controllers}/register.controller`), req, res) });
router.post("/refresh", (req, res) => { global._core.protect(require(`${controllers}/refresh.controller`), req, res) });

module.exports = router;