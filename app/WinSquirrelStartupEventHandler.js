const electron = require('electron');
const child_process = require('child_process');
const path = require('path');

const app = electron.app;
const spawn = child_process.spawn;

function run(args, done) {
    const updateExe = path.resolve(path.dirname(process.execPath), "..", "Update.exe");
    console.log("Spawning `%s` with args `%s`", updateExe, args);
    spawn(updateExe, args, {
        detached: true
    })
        .on("close", done)
}

function handleStartupEvent() {
    if (process.platform !== "win32") {
        return false
    }

    const cmd = process.argv[1];
    if (cmd && cmd.startsWith("--squirrel")) {
        console.log("Processing squirrel command `%s`", cmd);
        const target = path.basename(process.execPath);
        if (cmd === "--squirrel-install" || cmd === "--squirrel-updated") {
            run(['--createShortcut=' + target + ''], app.quit);
            return true
        }
        else if (cmd === "--squirrel-uninstall") {
            run(['--removeShortcut=' + target + ''], app.quit);
            return true
        }
        else if (cmd === "--squirrel-obsolete") {
            app.quit();
            return true
        }
        else {
            return false
        }
    } else
        return false
}

module.exports = handleStartupEvent;