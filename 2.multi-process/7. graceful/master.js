const cluster = require('cluster');
const util = require('util');
const pstree = require('ps-tree');

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

process.on('SIGTERM', signalExit);
process.on('SIGQUIT', signalExit);
process.on('SIGINT', signalExit);

function signalExit() {
  Promise.all(workers.map((w) => new Promise((resolve) => {
    pstree(w.process.pid, (e, children) => {
      if (e) {
        console.log(e);
        resolve([]);
      } else {
        resolve(children);
      }
    })
  })))
    .then((results) => {
      results.forEach((pids) => {
        pids.forEach((pid) => {
          process.kill(pid.PID, 'SIGTERM');
        })
      });
      process.exit(0);
    }).catch(() => {
      process.exit(1);
    });
}