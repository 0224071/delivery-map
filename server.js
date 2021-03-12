const request = require("request");
const cheerio = require("cheerio");

const fs = require("fs");

const foodpandaUrl = "https://www.foodpanda.com.tw";

const getRestaurant = function() {
  doRequest(foodpandaUrl + "/city/taichung-city").then(getFoodPandaInfo); //foodpanda 台中餐廳
};
function doRequest(link) {
  return new Promise(function(resolve, reject) {
    request({ url: link, method: "GET" }, function(error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
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
    let menu_list = await doRequest(foodpandaUrl + shopUrl).then(
      getFoodPandaMenuInfo
    );
    let info = await doRequest(foodpandaUrl + shopUrl).then(getFoodPandaDetail);
    // 建立物件並(push)存入結果
    result.push(Object.assign({ name, rating, comments_count, menu_list,info }));
  }
  // 在終端機(console)列出結果
  console.log(result);
  // 寫入 result.json 檔案
  fs.writeFileSync("./public/static/result.json", JSON.stringify(result));
}
const getFoodPandaDetail = function(body) {
  const $ = cheerio.load(body); // 載入 body
  let info_box = $(".rich-description .panel");
  let delivery_times = $(info_box)
    .find(".vendor-delivery-times li")
    .text()
    .replace(/\s*/g, "");
  let address = $(info_box)
    .find(".vendor-location")
    .text();
  let link = $(info_box)
    .find(".static-map-container img")
    .attr("data-img-url");
  const myUrl = new URL(link);
  let location = myUrl.searchParams.get("center");
  return Object.assign({ delivery_times,address,location })
};
const getFoodPandaMenuInfo = function(body) {
  const $ = cheerio.load(body); // 載入 body
  const result = []; // 建立一個儲存結果的容器
  const menu_list = $(".dish-list .dish-card .item-react-root");
  for (let i = 0; i < menu_list.length; i++) {
    let menu = menu_list[i];
    let name = $(menu)
      .find(".dish-info-container .dish-info .dish-name span")
      .text();
    let price = $(menu)
      .find(".action-bar .p-price")
      .text()
      .replace(/\s*/g, "");
    result.push(Object.assign({ name, price }));
  }
  return result;
};
getRestaurant();
// 每半小時爬一次資料
setInterval(getRestaurant, 30 * 60 * 1000);
