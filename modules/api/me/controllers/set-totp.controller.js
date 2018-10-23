module.exports = async (req, res) => {

    const user = await _core.handlers.auth.get_user({ "_id": req.auth.id })

    if (user.totp.is_enabled) throw "AUT6"; 

    const speakeasy = require("speakeasy");

    const totp_secret = speakeasy.generateSecret({ length: 20 });
    const otp_authURL = speakeasy.otpauthURL({ secret: totp_secret.ascii, label: `${user.firstname} ${user.lastname}`, issuer: "Nexezo" });
    
    user.totp.is_enabled = true;
    user.totp.secret = totp_secret.base32;
    await user.save();
   
    res.json(
        {
            secret: totp_secret.base32,
            url: otp_authURL
        }
    )
}
