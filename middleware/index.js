const crypto = require("crypto");

const sigHeaderName = "X-Signature-SHA256";
const sigHashAlg = "sha256";
const sigPrefix = ""; //set this to your signature prefix if any

const secrets = require("../config/config.json");

//Validate payload
exports.validatePayload = (req, res, next) => {

    // console.log(req);

    // for (let x in secrets) {

    //     const secret = secrets[x]["gh_webhook_secret"];

    //     if(req.get(sigHeaderName)){
    //         //Extract Signature header
    //         const sig = Buffer.from(req.get(sigHeaderName) || "", "utf8");
    
    //         //Calculate HMAC
    //         const hmac = crypto.createHmac(sigHashAlg, secret);
    //         const digest = Buffer.from(sigPrefix + hmac.update(req.rawBody).digest("hex"), "utf8");
    
    //         //Compare HMACs
    //         if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    //             return res.status(401).send({
    //                 message: `Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`
    //             });
    //         }
    //     }
    
    //     return next();
    // }

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