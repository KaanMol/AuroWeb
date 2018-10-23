module.exports = async (req, res) => {
    const user = await global._core.handlers.auth.getFullUser({ "_id": req.auth.id });
    res.send(user[0].devices);
}
