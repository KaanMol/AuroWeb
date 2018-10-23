module.exports = async (req, res) => {
    const user = await _core.handlers.auth.get_user({ "_id": req.auth.id });

    function detect_file_type() {
        const index = req.body.base64.indexOf("base64");
        let file_type = [];
        let loop = true;

        for (let i = index - 2; i > 0; i--) {
            const char = req.body.base64.charAt(i);
            if (char === "/") break;
            file_type.push(char);
        }

        file_type = file_type.reverse().join("");
        return { "file_type": file_type, "base64": req.body.base64.split(",")[1] };
    }

    detect_file_type(req.body.base64);
    const image = detect_file_type();
    const name = require("crypto").randomBytes(16).toString("hex") + "." + image.file_type;

    const saveImage = await require("fs").writeFileSync(`${global._root}/modules/cdn/${name}`, image.base64, 'base64')

    user.avatar = name;
    await user.save();
    res.status(200).send({ "file":name });
}