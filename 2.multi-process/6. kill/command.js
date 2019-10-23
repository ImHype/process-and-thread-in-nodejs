const { fork } = require('child_process');
const fs = require('fs');
const pidfile = '.pid';

if (process.argv[2] === 'stop') {
    const pid = fs.readFileSync(pidfile, 'utf8');

    process.kill(Number(pid), 'SIGTERM');

    fs.unlinkSync(pidfile);
} else {
    const child = fork('./master.js', {
        detached: true,
        stdio: 'ignore'
    });
    
    fs.writeFileSync(pidfile, String(child.pid));

    process.exit(0);
}