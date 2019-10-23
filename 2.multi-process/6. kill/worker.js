const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello');
})

server.listen(9000, () => {
    console.log('process %s started', process.pid)
});


process.on('SIGTERM', () => {
    console.log('before exit');
    process.exit(0);
})