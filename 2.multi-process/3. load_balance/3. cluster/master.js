const cluster = require('cluster');

cluster.setupMaster({
  exec: 'worker.js',
});

const workers = [];

for (let i = 0; i < 4; i++) {
  const child = cluster.fork()
  workers.push(child);
}
