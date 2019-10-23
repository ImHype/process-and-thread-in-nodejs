const { fork } = require('child_process');

const net = require('net');

const subprocess = fork('child.js', []);

const server = net.createServer((socket) => {
    subprocess.send('accept', socket);
});

server.listen(9999);