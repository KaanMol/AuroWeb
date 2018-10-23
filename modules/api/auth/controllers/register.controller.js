module.exports = async (req, res) => {
    if (req.body.username === undefined || req.body.password === undefined || req.body.firstname === undefined
       || req.body.lastname === undefined || req.body.email === undefined || req.birthday === undefined) return "AUT0";

    if (!global._core.helpers.auth.is_email(req.body.email)) return "AUT4";

    const username_result = await global._core.handlers.auth.get_user({ "lowercase.username": req.body.username.toLowerCase() });

    if (username_result !== null) throw "AUT4";

    const email_result = await global._core.handlers.auth.get_user({ email: req.body.email });

    if (email_result !== null) throw "AUT5";

    const new_user = await global._core.handlers.auth.create_user(req.body);

    const browserDetails = _core.helpers.auth.checkDevice(req);
    const refreshToken = global._core.helpers.auth.getRefreshToken();
    new_user.devices.push({
        "token": refreshToken.token,
        "expiry": refreshToken.exp,
        "browser": browserDetails
    });
    await new_user.save();

    res.json({ "accessToken": global._core.helpers.auth.signToken(new_user), "refreshToken": refreshToken.token });
}
