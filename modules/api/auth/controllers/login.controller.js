module.exports = async (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined) throw "GEN0";

    const user = await _core.handlers.auth.getFullUser({ "username": req.body.username.toLowerCase() });

    if (user === null) throw "AUT0";

    if (!await global._core.helpers.auth.compare_password(req.body.password, user.password)) throw "AUT0";

    if (user.totp.is_enabled === true) {
        if (req.body.token === undefined) throw "AUT1";
        
        const verified = require('speakeasy').totp.verify({
            secret: user.totp.secret,
            encoding: 'base32',
            token: req.body.token
        });

        if (!verified) throw "AUT2";
    }

    const refreshToken = global._core.helpers.auth.getRefreshToken();
    const browserDetails = _core.helpers.auth.checkDevice(req);
    user.devices.push({
        "token": refreshToken.token,
        "expiry": refreshToken.exp,
        "browser": browserDetails
    });
    await user.save();

    res.json({ "accessToken": global._core.helpers.auth.signToken(user), "refreshToken": refreshToken.token });
}
