module.exports = {
        // Authentication
    "AUT": [
        [401, "INCORRECT_CREDENTIALS"],
        [401, "PROVIDE_2FA_TOKEN"],
        [401, "INCORRECT_2FA_TOKEN"],
        [400, "INVALID_EMAIL"],
        [401, "USERNAME_EXISTS"],
        [401, "EMAIL_EXISTS"],
        [403, "TOTP_EXISTS"],
        [403, "TOTP_NOT_SET"],
        [401, "PROVIDE_TOKEN"],
        [401, "INVALID_TOKEN"]

    ],
        // General
    "GEN": [
        [400, "INCORRECT_BODY"],
        [403, "NO_TOKEN_PROVIDED"],
        [403, "INVALID_TOKEN_PROVIDED"]
        [403, "BLOCKED_RESOURCE"],
        [403, "PERMISSION_DENIED"]
    ],

    "CAT": [
        [400, "CATEGORY_EXISTS"],
        [404, "CATEGORY_NOT_FOUND"],
    ],
        // Connections
    "CON": [
        [403, "REQUEST_ON_SELF"],
        [409, "ALREADY_CONNECTED"],
        [404, "CONNECTION_NOT_FOUND"]
    ],

    "COM": [
        [400, "STATUS_ID_REQUIRED"],
        [404, "COMMENT_DOESNT_EXIST"],
        [403, "POST_DOESNT_ALLOW_COMMENTS"]
    ],

    "FOL": [
        [403, "ALREADY_FOLLOWING"],
        [404, "FOLLOW_NOT_FOUND"]
    ],
        // Internal Server Error
    "ISE": [],
    "POS": [
        [404, "POST_NOT_FOUND"],
        [403, "NOT_POST_OWNER"],
        [400, "POST_EMPTY"],
        [400, "POST_PRIVACY_INVALID"],
        [400, "POST_CONTENT_INVALID"]
    ],
        // User errors
    "USR": [
        [404, "USER_NOT_FOUND"],
        [400, "ID_NOT_VALID"]
    ]
}