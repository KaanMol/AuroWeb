const router = require("express").Router();
const controllers = "../controllers";

router.get("/:id", (req, res) => { global._core.protect(require(`${controllers}/profile.controller`), req, res) });
module.exports = router;