module.exports = {
    /**
     * @description Returns salted password and if needed salt for a new user
     * @param {string} pass 
     * @param {string} saltParam 
     * @returns {Object<>} 
     */
    generate_password: async (password) => {
        const hash = await require("bcrypt").hash(password, 10);
        return hash;
    },

    compare_password: async (password, hash) => {
        return await require("bcrypt").compare(password, hash);
    },
    /**
     * @todo Add support for refreshtokens
     * @description Signs a token for the authenticated user with refreshtoken
     * @param {Object<>} user 
     * @returns {Object<>} 
     */
    signToken: (user) => {
        const token = require("jsonwebtoken").sign({
            id: user._id,
            preferences: user.preferences,
            admin: user.admin,
            exp: Math.floor(Date.now() / 1000) + 604800
        },
        global._config.server.jwtSecret);
        
        return token;
    },
    is_email: (email) => {
        const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regEx.test(email);
    },
    verifyId: (id) => {
        return require("mongoose").Types.ObjectId.isValid(id);
    },
    getRefreshToken: () => {
        const expiration = Math.floor(Date.now() / 1000) + 604800;
        const refreshToken = require("crypto").randomBytes(128).toString("hex");
        return {
            "exp": expiration,
            "token": refreshToken
        };
    },
    checkDevice: (req) => {
        const ua = req.headers["user-agent"];
        const details = {
            browser: /Edge\/\d+/.test(ua) ? 'me' : /MSIE 9/.test(ua) ? 'ie9' : /MSIE 10/.test(ua) ? 'ie10' : /MSIE 11/.test(ua) ? 'ie11' : /MSIE\s\d/.test(ua) ? 'ie?' : /rv\:11/.test(ua) ? 'ie11' : /Firefox\W\d/.test(ua) ? 'ff' : /Chrome\W\d/.test(ua) ? 'gc' : /Chromium\W\d/.test(ua) ? 'oc' : /\bSafari\W\d/.test(ua) ? 'sa' : /\bOpera\W\d/.test(ua) ? 'op' : /\bOPR\W\d/i.test(ua) ? 'op' : '',
            os: /Windows NT 10/.test(ua) ? "win10" : /Windows NT 6\.0/.test(ua) ? "winvista" : /Windows NT 6\.1/.test(ua) ? "win7" : /Windows NT 6\.\d/.test(ua) ? "win8" : /Windows NT 5\.1/.test(ua) ? "winxp" : /Windows NT [1-5]\./.test(ua) ? "winnt" : /Mac/.test(ua) ? "mac" : /Linux/.test(ua) ? "linux" : /X11/.test(ua) ? "nix" : "",
            mobile: /IEMobile|Windows Phone|Lumia/i.test(ua) ? 'w' : /iPhone|iP[oa]d/.test(ua) ? 'i' : /Android/.test(ua) ? 'a' : /BlackBerry|PlayBook|BB10/.test(ua) ? 'b' : /Mobile Safari/.test(ua) ? 's' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? true : false
        };

        return details;
    }
};