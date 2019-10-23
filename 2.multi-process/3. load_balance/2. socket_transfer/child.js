process.on('message', (msg, handle) => {
    if (msg === 'accept') {
        const body = Buffer.from('<html><head><title>Wrox Homepage</title></head><body>hello world</body></html>');
        handle.end(`HTTP/1.1 200 OK\r\nDate: Sat, 31 Dec 2005 23:59:59 GMT\r\nContent-Type: text/html;charset=utf-8\r\nContent-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
    }
})