const { fork } = require('child_process');

const sub = fork('./child.js', {
   stdio: 'inherit'
});

sub.on('message', (msg) => {
   console.log(msg);
});