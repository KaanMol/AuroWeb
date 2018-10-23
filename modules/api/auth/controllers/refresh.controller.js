module.exports = async (req, res) => {
    const authHeader = req.header("authorization");
    if (authHeader === undefined) throw "GEN1";

    let userId;

    try {
        const oldToken = authHeader.substring(7, authHeader.length - 1);
        userId = JSON.parse(Buffer.from(oldToken.split(".")[1], "base64").toString()).id;
    } catch (err) {
        throw "GEN2";
    }

    const user = await global._core.handlers.auth.getFullUser({ "_id": userId });
    let fail = true;
        
    const devices_length = user.devices.length;
    for (let i = 0; i < devices_length; i++) {
        if (user.devices[i].token === req.body.refresh_token && user.devices[i].expiry > Math.floor(Date.now() / 1000)) {
            fail = false;

            const refreshToken = global._core.helpers.auth.getRefreshToken();
            user.devices[i] = { "token": refreshToken.token, "expiry": refreshToken.exp, "browser": user.devices[i].browser };
            user.markModified("devices");

            await user.save();

            res.send({
                "accessToken": global._core.helpers.auth.signToken(user),
                "refreshToken": `${refreshToken.token}`
            });
            break;
        }
    }
}
