const cluster = require("cluster");
const cpuNums = require("os").cpus().length;

const exec = (arr, target) => {
  //建立多線程
  cluster.setupMaster({
    exec: target,
    args: ["--use", "http"],
  });
  let total = arr.length;
  return new Promise((resolve, reject) => {
    let list = [];
    //產生多線程
    cluster.on('fork', worker => {
      
      if(arr.length===0)
      {
  //沒有要處理的資料關閉此線程
        worker.disconnect();
        return ;
      }
      worker.send(arr[0]);
      arr.shift();

      worker.on("message", (res) => {
        list.push(res);
        if (total === list.length) {
          resolve(list);   
        }
   
        worker.disconnect();       //每處理完一個線程就關閉
      });
      worker.on("disconnect",()=>{
        //關閉就馬上再開啟新線程
         cluster.fork();
      })
  });
    for (let i = 0; i < cpuNums; i++) {
      cluster.fork();
    }

  });
};

module.exports = {
  exec,
};
