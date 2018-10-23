module.exports = async (req, res) => {

    const user = await _core.handlers.auth.get_user({ "_id": req.auth.id })

    if (!user.totp.is_enabled) throw "AUT7";

    if (req.body.token === undefined) throw "AUT1"; 

    const speakeasy = require("speakeasy");

    const verified = speakeasy.totp.verify({
        secret: user.totp.secret,
        encoding: 'base32',
        token: req.body.token
    });

    if (!verified) throw "AUT2";

    user.totp.is_enabled = false;
    user.totp.secret = null;

    await user.save();

    res.send({ status: 200 })
}
