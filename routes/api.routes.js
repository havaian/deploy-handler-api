const express = require("express");
const router = express.Router();

// Import controllers
const controllers = require("../controllers/api.controller.js");

// Import index page
const index_ejs = require("../views/index.ejs");

// Import config
const config = require("../config/config.json");

for (let x in config) {
  const pj_conf = config[x];
  // Set up a checker route
  if (x === "/") {
    router.get(x, (req ,res) => {
      // console.log(req);
      res.render(
        pj_conf["check_route"]
      );
    });
  } else {
    router.get(x, (req ,res) => {
      // console.log(req);
      res.json(
        pj_conf["check_route"]
      );
    });
  }

  // Set up a webhook endpoint
  router.post(x, /*validatePayload,*/ (req, res) => {
    controllers.webhook_handler(pj_conf, req, res);
  });
}

module.exports = router;