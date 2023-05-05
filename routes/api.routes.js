const express = require("express");
const router = express.Router();

// Import controllers
const controllers = require("../controllers/api.controller.js");

// Import config
const config = require("../config/api.config.json");

for (let x in config) {
  const pj_conf = config[x];
  // Set up a checker route
  router.get(x, (req ,res) => {
    // console.log(req);
    res.send(
      pj_conf["route_check"]
    );
  });

  // Set up a webhook endpoint
  router.post(x, /*validatePayload,*/ (req, res) => {
    controllers.webhook_handler(pj_conf, req, res);
  });
}

module.exports = router;