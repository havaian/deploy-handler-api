const { exec } = require("child_process");
const { stdout } = require("nodemon/lib/config/defaults");
const middleware = require("../middleware");
const crypto = require("crypto");

const getBackupName = middleware.generateBackupName;
      
var dt = new Date();

// Function for project deploy on the server
exports.webhook_handler = async (pj_conf, secret, req, res) => {
    
    let data = '';
    req.on('data', chunk => {
        // Accumulate the received data chunks
        data += chunk;
    });

    req.on('end', () => {
        // Data received, perform processing
        const signature = `sha256=${crypto
            .createHmac('sha256', secret)
            .update(data)
            .digest('hex')}`;
    
        const isAllowed = req.headers['x-hub-signature-256'] === signature;
        const body = JSON.parse(data);
        
        const isProd = body?.ref === 'refs/heads/prod';

        isAllowed ? console.log("Allowed") : console.log("Forbidden");
        isProd ? console.log("Prod") : console.log("Not prod");

        if (isAllowed && isProd) {
            const branch_name = `backup-prod-${getBackupName(dt)}`;
            const command = pj_conf["deploy_command"];
            const exec_cmd = `
                cd ${pj_conf["project_location"]} &&
                ${command}`
                // git add . &&
                // git commit -m "Saving the current server version of the project to a new branch" &&
                // git branch ${branch_name} &&
                // w//o git push -uf origin ${branch_name} &&
                // git fetch --all &&
                // git reset --hard origin/prod
        
            exec(exec_cmd, (err, stdout, stderr) => {
                if (err) {
                    console.error(`❌ Error executing command: ${err}`);
                    console.error(stderr);
                    res.send(500).send("❌ Git backup of the current server version of the app failed for some reason (check the logs)")
                }
                console.log("✅ Successfully made the git backup of the current server version of the app!");
                console.log(`✅ Command output: ${stdout}`);
            });
            if (stdout) {
                // const cmd = `
                //     cd ${pj_conf["project_location"]} &&
                //     ${command}
                // `
                // exec(cmd, (err, stdout, stderr) => {
                //     if (err) {
                //         console.error(`❌ Error executing command: ${err}`);
                //         console.error(stderr);
                //         res.send(500).send("❌ Build failed for some reason (check the logs)")
                //     }
                //     console.log("✅ Verified, Built & Deployed successfully!");
                //     console.log(`✅ Command output: ${stdout}`);
                // });
                // if (stdout) {
                    res.status(200).send("✅ Verified, Built & Deployed successfully!");
                // }
            }
        } else {
            if (!isAllowed || !isProd) {
                !isProd ? 
                    res.status(500).send("❌ Branch not prod") : 
                    res.status(500).send("❌ Secret verification failed");
            } 
        }
      });
}