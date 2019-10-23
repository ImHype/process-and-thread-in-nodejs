const http = require('http');
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    const server = http.createServer((req, res) => {
        const worker = new Worker(__filename);
        worker.postMessage('main thread message');
        worker.once('message', (data) => {
            res.end(Buffer.from(data));
        });
    });
    server.listen(9999);
} else {
    parentPort.on('message', (data) => {
        console.log(data);
        /**
         * CPU 运算
         */
        parentPort.postMessage('worker message response');
    });
}

