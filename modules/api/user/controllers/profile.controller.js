module.exports = async (req, res) => {
    let user;

    if (_core.helpers.auth.verifyId(req.params.id)) {
        user = await _core.handlers.user.get_user({ "_id": req.params.id });
    } else {
        user = await _core.handlers.user.get_user({ "lowercase.username": req.params.id.toLowerCase() });
    }

    if (user === null) {
        throw "USR0";
    }

    res.send(user);
}