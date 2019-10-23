const { fork } = require('child_process');


for (let i = 0; i < 4; i++) {
    fork('./main.js');
}
