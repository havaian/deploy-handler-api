const express = require("express");
const router = express.Router();
const controllers = require("../controllers/handler.controller.js");
const secrets = require("../config/secrets.json");

const deployer_aliases = {
  "/deploy/crop-placement": {
      "check_route": {
        "Crop placement auto-deployer": "It's working 🙌"
      },
      "deploy_command": `cd /home/abror/crop-placement/ && echo ${process.env.CP_SSH_PASS} | sudo -S make dc_deploy`
  }
}

for (let x in deployer_aliases) {
    // Set up a checker route
    router.get(x, (req ,res) => {
      // console.log(req);
      res.json(
        deployer_aliases[x]["check_route"]
      );
    });

    // Set up a webhook endpoint
    router.post(x, (req, res) => {
      // console.log(req);
      // if (req.body.secret === secrets[x]) {
        controllers.webhook_handler(deployer_aliases[x]["deploy_command"], req, res);
      // }
    });
}

module.exports = router;