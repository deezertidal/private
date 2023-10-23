let provname;
if (typeof $argument !== "undefined") {
  provname = $argument;
} else {

  provname = "江苏";//quantumultx用户请复制到本地脚本 更改其他省 省份名不能含"省"字。小火箭loon用户请看模块插件注释 surge请用面板
}
//默认江苏油价
const encodedprovname = encodeURIComponent(provname);
const apiUrls = [
  `https://apis.tianapi.com/oilprice/index?key=231de491563c35731436829ac52aad43&prov=${encodedprovname}`,
  `https://apis.tianapi.com/oilprice/index?key=a2bc7a0e01be908881ff752677cf94b7&prov=${encodedprovname}`,
  `https://apis.tianapi.com/oilprice/index?key=1bcc67c0114bc39a8818c8be12c2c9ac&prov=${encodedprovname}`,
  `https://apis.tianapi.com/oilprice/index?key=3c5ee42145c852de4147264f25b858dc&prov=${encodedprovname}`,
  `https://apis.tianapi.com/oilprice/index?key=d718b0f7c2b6d71cb3a9814e90bf847f&prov=${encodedprovname}`
];
let currentIndex = 0;

if (typeof $httpClient !== "undefined" || typeof $task !== "undefined") {
  testNextUrl();
} else {
  console.log("Unsupported execution environment!");
  $done();
}

function testNextUrl() {
  if (currentIndex >= apiUrls.length) {
    console.log("All URLs failed");
    $done();
    return;
  }

  const apiUrl = apiUrls[currentIndex];
  const request = { url: apiUrl };

  if (typeof $httpClient !== "undefined") {
    $httpClient.get(request, function (error, response, data) {
      if (error) {
        console.log(`Error for URL ${currentIndex + 1}: ${error}`);
        currentIndex++;
        testNextUrl();
      } else {
        handleResponse(data);
      }
    });
  } else if (typeof $task !== "undefined") {
    $task.fetch(request).then(
      function (response) {
        handleResponse(response.body);
      },
      function (error) {
        console.log(`Error for URL ${currentIndex + 1}: ${error}`);
        currentIndex++;
        testNextUrl();
      }
    );
  }
}

function handleResponse(data) {
  var obj = JSON.parse(data);
  console.log(obj);

  if (obj.code === 200) {
    var prov = obj.result.prov;
    var p0 = "⛽️0号柴油: " + "¥" + obj.result.p0;
    var p92 = "⛽️92号汽油: " + "¥" + obj.result.p92 + "\n";
    var p95 = "⛽️95号汽油: " + "¥" + obj.result.p95 + "\n";
    var p98 = "⛽️98号汽油: " + "¥" + obj.result.p98 + "\n";
    var time = obj.result.time;

    if (typeof $notification !== "undefined") {
      $notification.post(prov + "油价提醒", time, p92 + p95 + p98 + p0);
    } else if (typeof $notify !== "undefined") {
      $notify(prov + "油价提醒", time, p92 + p95 + p98 + p0);
    }
    $done();
  } else {
    console.log(`请求失败，错误信息：${obj.msg}`);
    currentIndex++;
    testNextUrl();
  }
}