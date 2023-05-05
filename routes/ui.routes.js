const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../env/.env" });

router.get("/get-all-projects", (req, res) => {

});

router.post("/add-new-project", (req, res) => {
    
});

module.exports = router;