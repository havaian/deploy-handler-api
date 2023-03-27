const { exec } = require("child_process");
const { stdout } = require("nodemon/lib/config/defaults");

// Function for project deploy on the server
exports.webhook_handler = async (command, req, res) => {
    console.log(command);
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(`❌ Error executing command: ${err}`);
            console.error(stderr);
            res.send(500).send("❌ Build failed for some reason (check the logs)")
        }
        console.log("✅ Built & deployed successfully!");
        console.log(`✅ Command output: ${stdout}`);
    });
    if (stdout) {
        res.status(200).send("✅ Built & deployed successfully!");
    }
}