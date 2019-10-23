const http = require('http');
const child_process = require('child_process');

const server = http.createServer((req, res) => {
    res.end('hello');
})

server.listen(9000, () => {
    console.log('process %s started', process.pid)
});

child_process.fork('./runner.js');