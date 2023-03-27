// Import modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Create a new express app
const app = express();

// set up logger tools
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`${Date(Date.now())}`);
  next();
});

//  Instantiate dotenv config 
dotenv.config();

// Import routes
app.use(require("./routes/routes.js"));

// Start the express app
app.listen(process.env.EXPOSE_PORT, () => {
  console.log(`✅ Port: ${process.env.EXPOSE_PORT}`);
});