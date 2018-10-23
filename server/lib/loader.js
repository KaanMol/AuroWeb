const fs = require("fs");
const coreDirectory = `${process.cwd()}/${_config.server.modulePath}`;
const core = {};
const coreFunctions = require("./core");
(() => {
    start();
    module.exports = core;
})();

function start() {
    let namingConv = 0;
    core.helpers = {};
    core.handlers = {};
    core.models = {};

    /**
     * @description Populates core functions
     */
    for (let key in coreFunctions) {
        // skip loop if the property is from prototype
        if (!coreFunctions.hasOwnProperty(key)) continue;
        core[key] = coreFunctions[key];
    }

    /**
     * @description Loads all basic modules in for global use
     */
    fs.readdirSync(coreDirectory).forEach(function (module) {
        fs.readdirSync(`${coreDirectory}/${module}`).forEach(function (folder) {
            fs.readdirSync(`${coreDirectory}/${module}/${folder}`).forEach(function (file) {
                const splitFileName = file.split(".");
                if (splitFileName[1] === "model" || splitFileName[1] === "helper" || splitFileName[1] === "handler") {
                    if (splitFileName[0] !== module || `${splitFileName[1]}s` !== folder) {
                        namingConv++;
                    }
                    core[`${splitFileName[1]}s`][splitFileName[0]] = require(`${coreDirectory}/${module}/${folder}/${file}`);
                }
            });
        });
    });
    if (namingConv !== 0 && global._config.env === "development") {
        console.log(`AUTO LOADER: ${namingConv} module(s) found in the wrong folder, but loaded anyway with correct name.`);
    }
}