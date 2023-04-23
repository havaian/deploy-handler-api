const express = require("express");
const router = express.Router();
const controllers = require("../controllers/handler.controller.js");

const config = require("../config/config.json");

for (let x in config) {
  const pj_conf = config[x]["project_config"];
  const secret = config[x]["gh_webhook_secret"];
  // Set up a checker route
  router.get(pj_conf["route_name"], (req ,res) => {
    // console.log(req);
    res.json(
      pj_conf["check_route"]
    );
  });

  // Set up a webhook endpoint
  router.post(pj_conf["route_name"], (req, res) => {
    // console.log(req);
    // if (req.body.secret === config[x]["gh_webhook_secret"]) {
      controllers.webhook_handler(pj_conf, secret, req, res);
    // }
  });
}

module.exports = router;