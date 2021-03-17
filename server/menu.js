const request = require("request");
const cheerio = require("cheerio");



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
  return Object.assign({ delivery_times, address, location });
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
process.on("message", async (parms) => {
  let info = await doRequest( parms.shopUrl).then(
    getFoodPandaDetail
  );

  let menu_list = await doRequest(parms.shopUrl).then(
    getFoodPandaMenuInfo
  );
  process.send({ ...parms, info, menu_list });
});
