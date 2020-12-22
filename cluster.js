//@ts-check

var cluster = require("cluster");

if (cluster.isMaster) {
  //Its the master cluster which does not load server.js. It only spins up threads
  // Count the machine's CPUs
  var cpuCount = require("os").cpus().length;
  console.log(`No of CPUs on the server: ${cpuCount}`);

  // Create a worker for each CPU
  for (var i = 0; i < 4; i += 1) {
    cluster.fork(); //create a thread per CPU
  }

  // Listen for dying workers
  cluster.on("exit", function () {
    cluster.fork(); //instantiate a fresh thread when an exist thread crashes
  });
} else {
  require("./server"); //fork() will create a thread and loads cluster.js which will return cluster.isMaster as false and load ./server.js
}
