const cluster = require('cluster');

cluster.setupMaster({
  exec: 'worker.js',
});

const workers = [];

const fork = () => {
  const child = cluster.fork();

  child.on('exit', () => {
    workers.splice(workers.indexOf(workers), 1);
    setTimeout(() => {
      fork();
    }, 1000);
  });

  workers.push(child);
}


for (let i = 0; i < 4; i++) {
  fork();
}