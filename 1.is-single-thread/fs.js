process.stdin.resume();

const fs = require('fs');

const fd = fs.openSync('hang.js');

const stream = fs.createReadStream(null, {
    fd
});

stream.on('data', () => {

});
