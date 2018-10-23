module.exports = {
    get_user: async (object) => {
        return await _core.models.user.findOne(object).select("-devices -totp -lowercase -password -email");
    },  
}