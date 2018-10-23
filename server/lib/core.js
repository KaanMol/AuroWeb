module.exports = {
    protect: (callback, req, res) => {
        const runController = callback(req, res);
        if (runController) {
            runController.catch((error) => {
                _core.error(error, res);
            });
        }
    },
    /** @todo Implement error handler
     * @description Global error handler
     * @param {string} e 
     * @returns {Object<>} 
     */
    error: (e, res) => {
        console.log(e);
        try {
            let errorCode;
            const errorLog = require("./errors");
            switch (typeof e) {
                case "string":
                    if (!isNaN(parseFloat(e.substr(3, e.length - 1))) && isFinite(e.substr(3, e.length - 1))) {
                        errorCode = e;
                    } else {
                        throw `Unexpected error!-${e}`;
                    }
                    break;
                case "object":
                    if (e.code !== 11000) {
                        errorCode = e.errors[Object.keys(e.errors)[0]].message;
                    } else if (e.code === 11000) {
                        const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i;
                        const match = e.message.match(regex);
                        const indexName = match[1] || match[2];
                        throw `MongoDB duplicate ${indexName}-${e}`;
                    } else {
                        throw `Unexpected error!-${JSON.stringify(e)}`;
                    }
                    break;
                default:
                    throw `type ${typeof e} error message was not recognized!-${e}`;
            }

            const error = errorLog[errorCode.substr(0, 3)][errorCode.substr(3, errorCode.length - 1)];
            res.status(error[0]).json({ "code": error[0], "error": errorCode, "readableError": error[1] });
        } catch (ise) {
            console.log(ise);
            res.status(500).json({ "code": 500, "error": "ISE1", "readableError": "Internal Server Error" });

            //const newError = new _core.models.error({ moduleError: ise, timestamp: Math.floor(Date.now() / 1000) });
            //newError.save();
        }
    }
}