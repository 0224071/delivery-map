const cluster = require("cluster");
const cpuNums = require("os").cpus().length;

const exec = (arr, target, deal = (res) => res) => {
  //建立多線程
  cluster.setupMaster({
    exec: target,
    args: ["--use", "http"],
  });
  let total = arr.length;
  return new Promise((resolve, reject) => {
    let list = [];
    while (arr.length > 0) {
      for (let i = 0; i < cpuNums; i++) {
        if (arr.length <= 0) {
          break;
        }
        let work = cluster.fork();
        work.on("message", (res) => {
          list.push(deal(res));
          if (total === list.length) {
            resolve(list);
          }
          // work.disconnect();
        });
        work.on("disconnect", () => {});
        let url = arr[0];
        work.send(arr[0]);
        arr.shift();
      }
    }
  });
};

module.exports = {
  exec,
};
