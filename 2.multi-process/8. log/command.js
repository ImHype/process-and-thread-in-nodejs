const { fork } = require('child_process');
const fs = require('fs');
const pidfile = '.pid';

if (process.argv[2] === 'stop') {
    const pid = fs.readFileSync(pidfile, 'utf8');

    process.kill(Number(pid), 'SIGTERM');

    fs.unlinkSync(pidfile);
} else {

    const applog = fs.openSync('./app.log', 'a+');
    const errorlog = fs.openSync('./app-error.log', 'a+');
    const child = fork('./master.js', {
        detached: true,
        stdio: [0, applog, errorlog, 'ipc']
    });
    
    fs.writeFileSync(pidfile, String(child.pid));

    process.exit(0);
}