const request = require("request");
const cheerio = require("cheerio");
const cluster = require("./process");
//foodpanda網址
const foodpandaUrl = "https://www.foodpanda.com.tw";
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
async function getFoodPandaInfo(body) {
  const $ = cheerio.load(body); // 載入 body
  const result = []; // 建立一個儲存結果的容器
  const shop_list = $(".vendor-list li a"); // 爬最外層的 li

  for (let i = 0; i < shop_list.length; i++) {
    let shop = shop_list[i];
    let shopUrl = shop.attribs.href; //連結
    let name = $(shop)
      .find(".vendor-info .name")
      .text(); //店家名稱
    let rating = $(shop)
      .find(".vendor-info .rating")
      .text(); //評分
    let comments_count = "0"; //評論人數
    if ($(shop).find(".vendor-info .count").length > 0) {
      comments_count = $(shop)
        .find(".vendor-info .count")
        .attr("data-count")
        .replace("(", "")
        .replace(")", "");
    }

    result.push({ info: { name, rating, comments_count }, url: shopUrl });
  }
  let arr = await cluster.exec(result, "menu.js");
  return arr;
}
async function getInfo() {
  return await doRequest(foodpandaUrl + "/city/taichung-city").then(
    getFoodPandaInfo
  );
}

module.exports = {
  getInfo: getInfo,
};
