// Import modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

// Create a new express app
const app = express();

// Set up logger tools
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`${Date(Date.now())}`);
  next();
});

// Instantiate dotenv config & pass the path to .env file
const env_path = path.resolve(__dirname, './env/.env');
dotenv.config({ path: env_path });

// Import routes
app.use(require("./routes/routes.js"));

// Start the express app
app.listen(process.env.EXPOSE_PORT, () => {
  console.log(`✅ Port: ${process.env.EXPOSE_PORT}`);
});