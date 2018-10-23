const mongoose = require("mongoose");
const userScheme = new mongoose.Schema({
    username: {
       type: String,
       required: [true, "AUT7"],
       unique: true
    },
    password: {
        type: String,
        selected: false
    },
    firstname: {
        type: String,
        required: [true, "AUT0"]
    },
    lastname: {
        type: String,
        required: [true, "AUT1"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "AUT7"]
    },
    avatar: {
        type: String,
        default: "default_avatar.jpg"
    },
    verified: {
        type: Boolean,
        default: false
    },
    totp: {
        is_enabled: {
            type: Boolean,
            default: false
        },
        secret: {
            type: String,
            default: ""
        },
        selected: false
    },
    preferences: {
        theme: {
            type: String,
            default: "light"
        },
        color: {
            type: String,
            default: "mint"
        }
    },
    settings: {
        type: Object,
        default: {}
    },
    devices: {
        type: Array,
        selected: false,
        default: []
    },
    creation_time: Number,
    role: {
        type: Number,
        default: 0,
    },
    lowercase: {
        username: String,
        firstname: String,
        lastname: String,
        select: false
    },
    __v: {
        type: Number,
        select: false
    }
});

module.exports = mongoose.model("User", userScheme);