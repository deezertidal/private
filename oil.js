let provname;
if (typeof $argument !== "undefined") {
  provname = $argument;
} else {

  provname = "江苏";//quantumultx用户请复制到本地脚本 更改其他省 省份名不能含"省"字。小火箭loon用户请看模块插件注释 surge请用面板
}
//默认江苏油价
const encodedprovname = encodeURIComponent(provname);
const apiurl = `https://apis.tianapi.com/oilprice/index?key=231de491563c35731436829ac52aad43&prov=${encodedprovname}`;

if (typeof $httpClient !== "undefined") {
  $httpClient.get(apiurl, function (error, response, data) {
    if (error) {
      console.log(error);
      $done();
    } else {
      var obj = JSON.parse(data);
      console.log(obj);
      var prov = obj.result.prov;
      var p0 = "⛽️0号柴油: " + "¥" + obj.result.p0;
      var p92 = "⛽️92号汽油: " + "¥" + obj.result.p92 + "\n";
      var p95 = "⛽️95号汽油: " + "¥" + obj.result.p95 + "\n";
      var p98 = "⛽️98号汽油: " + "¥" + obj.result.p98 + "\n";
      var time = obj.result.time;
      $notification.post(prov + "油价提醒", time, p92 + p95 + p98 + p0);
      $done();
    }
  });
} else if (typeof $task !== "undefined") {
  const request = {
    url: apiurl
  };
  $task.fetch(request).then(
    function (response) {
      var obj = JSON.parse(response.body);
      console.log(obj);
      var prov = obj.result.prov;
      var p0 = "⛽️0号柴油: " + "¥" + obj.result.p0;
      var p92 = "⛽️92号汽油: " + "¥" + obj.result.p92 + "\n";
      var p95 = "⛽️95号汽油: " + "¥" + obj.result.p95 + "\n";
      var p98 = "⛽️98号汽油: " + "¥" + obj.result.p98 + "\n";
      var time = obj.result.time;
      $notify(prov + "油价提醒", time, p92 + p95 + p98 + p0);
      $done();
    },
    function (error) {
      console.log(error);
      $done();
    }
  );
} else {
  console.log("Unsupported execution environment!");
  $done();
}
