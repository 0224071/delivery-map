const doRequest = function(link) {
  return new Promise(function(resolve, reject) {
    request({ url: link, method: "GET" }, function(error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

process.on("message", async (parms) => {
  let info = await doRequest(parms[1]);
  process.send(info);
});
