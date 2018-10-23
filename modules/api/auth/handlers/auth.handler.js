module.exports = {
    /**
     * @description Get the full user incl password, password salt and admin rights
     * @param {} object 
     * @returns {} 
     */
    getFullUser: async (object) => {
        return await _core.models.user.findOne(object).select("password role devices totp preferences lowercase firstname lastname");
    },
    
    /**
     * @description Get the user without password and admin
     * @param {} object 
     * @returns {}
     */
    get_user: async (object) => {
        return await _core.models.user.findOne(object);
    },

    get_users: async (object) => {
        return await _core.models.user.find(object).select("-devices -password -lowercase -totp -preferences -role -email");
    },

    get_users_by_ids: async (array) => {
        return await _core.models.user.find({ "_id": { "$in": array } }).select("firstname lastname username online avatar")
    },
    /**
     * @description User registration
     * @param {} req.body
     * @returns {} 
     */
    create_user: async (req) => {
        const hash = await _core.helpers.auth.generate_password(req.password);
        return new _core.models.user({
            username: req.username,
            password: hash,
            firstname: req.firstname,
            lastname: req.lastname,
            email: req.email.toLowerCase(),
            created_on: Math.floor(Date.now() / 1000),
            lowercase: {
                username: req.username.toLowerCase(),
                firstname: req.firstname.toLowerCase(),
                lastname: req.lastname.toLowerCase()
            }
        });
    }
}
