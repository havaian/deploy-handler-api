const crypto = require("crypto");

const config = require("../config/api.config.json");

//Validate payload
exports.validatePayload = (req, res, next) => {
    try {
        if (req.method === "POST" && req.headers["user-agent"].includes("GitHub-Hookshot")) {
            const pj_conf = config[req.path];
            const secret = pj_conf["gh_webhook_secret"];

            // Data received, perform processing
            const signature = `sha256=${crypto
                .createHmac('sha256', secret)
                .update(JSON.stringify(req.body))
                .digest('hex')}`;

            const isAllowed = req.headers['x-hub-signature-256'] === signature;
            const body = req.body;
            
            const isBranch = body?.ref === `refs/heads/${pj_conf["deploy_branch"]}`;

            if (isAllowed && isBranch) {
                next();
            } else {
                if (!isAllowed || !isBranch) {
                    !isBranch ? 
                        console.log("❌ Branch not prod") && res.status(417).send("❌ Branch not prod") : 
                        console.log("❌ Secret verification failed") && res.status(401).send("❌ Secret verification failed");
                } 
            }
        } else {
            next();
        }
    } catch (error) {
        // Catch any errors that may occur during verification
        console.log(error);
        return res.status(400).send("❌ Bad Request");
    }
}

exports.generateBackupName = (date) => {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
    
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        '-' + pad(date.getMinutes()) +
        '-' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        '-' + pad(Math.abs(tzo) % 60);
}