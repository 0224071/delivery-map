const fs = require("fs");
const shop = require("./shop");

async function run() {
  console.time("取得時間");
  let shop_info = await shop.getInfo();
  console.timeEnd("取得時間");
  fs.writeFileSync("../public/static/result.json", JSON.stringify(shop_info));
}

run();
