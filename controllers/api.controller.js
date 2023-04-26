const { exec } = require("child_process");
const { stdout } = require("nodemon/lib/config/defaults");
const middleware = require("../middleware");
const crypto = require("crypto");

const getBackupName = middleware.generateBackupName;
      
var dt = new Date();

// Function for project deploy on the server
exports.webhook_handler = async (pj_conf, req, res) => {
    const branch_name = `backup-${pj_conf["deploy_branch"]}-${getBackupName(dt)}`;
    const command = pj_conf["deploy_command"];

    let exec_cmd = `cd ${pj_conf["project_location"]} &&`
    pj_conf["git_dependency"] ? exec_cmd += `
        git add . &&
        git commit -m "Saving the current server version of the project to a new branch" &&
        git branch ${branch_name} &&
        git push -uf origin ${branch_name} &&
        git fetch --all &&
        git reset --hard origin/prod &&` : null
    exec_cmd += `${command}`;

    exec(exec_cmd, (err, stdout, stderr) => {
        if (err) {
            console.error(`❌ Error executing command: ${err}`);
            console.error(stderr);
            res.status(500).send("❌ Git backup of the current server version of the app failed for some reason (check the logs)")
        }
        console.log("✅ Successfully made the git backup of the current server version of the app!");
        console.log(`✅ Command output: ${stdout}`);
    });
    if (stdout) {
        res.status(200).send("✅ Verified, Built & Deployed successfully!");
    }
}