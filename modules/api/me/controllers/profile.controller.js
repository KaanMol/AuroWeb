module.exports = async (req, res) => {
    const user = await _core.handlers.user.get_user({ "_id": req.auth.id });
    res.send(user);
}