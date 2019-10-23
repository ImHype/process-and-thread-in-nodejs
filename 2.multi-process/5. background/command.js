const { fork } = require('child_process');

const child = fork('./master.js', {
    detached: true,
    stdio: 'ignore'
});

process.exit(0);