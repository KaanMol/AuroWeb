module.exports = async (req, res) => {
    const colors = ["red", "turquoise", "orange", "mint", "purple", "genoa", "blue"];

    if (!colors.includes(req.body.color.toLowerCase())) throw "USR0";

    const user = await _core.handlers.auth.get_user({ "_id": req.auth.id });
    user.preferences.color = req.body.color;
    user.markModified('preferences');
    console.log(await user.save());

    res.send({"status":200})
}