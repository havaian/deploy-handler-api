// Import modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");

// Create a new express app
const app = express();

// Set up logger tools
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`${Date(Date.now())}`);
  next();
});


//Get the raw body
// app.use(bodyParser.json(
//   {
//       verify: (req, res, buf, encoding) => {
//           if (buf && buf.length) {
//           req.rawBody = buf.toString(encoding || "utf8");
//           }
//       },
//   }
// ));

// const middleware = require("./middleware");

// app.use(middleware.validatePayload);

// Instantiate dotenv config & pass the path to .env file
const env_path = path.resolve(__dirname, "./env/.env");
dotenv.config({ path: env_path });

// Import routes
app.use(require("./routes/routes.js"));

// Start the express app
app.listen(process.env.EXPOSE_PORT, () => {
  console.log(`✅ Port: ${process.env.EXPOSE_PORT}`);
});