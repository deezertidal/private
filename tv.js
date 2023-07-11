const url = "https://piaofang.maoyan.com/web-heat";
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
};

if (typeof $task !== "undefined") {

  $task.fetch({ url: url, headers: headers }).then(
    (response) => {
      handleResponse(response.body);
    },
    (reason) => {
      console.log(reason.error);
      $done();
    }
  );
} else if (typeof $httpClient !== "undefined") {

  $httpClient.get({ url: url, headers: headers }, function (error, response, data) {
    if (error) {
      console.log("请求失败:", error);
      $done();
      return;
    }
    handleResponse(data);
  });
}

function handleResponse(data) {
  const pattern = /<p class="video-name">(.*?)<\/p>[\s\S]*?<p class="web-info">(.*?)<span class="span-right">(.*?)<\/span>/g;
  let matches;
  let notificationContent = "";
  let count = 0;

  while ((matches = pattern.exec(data)) !== null && count < 10) {
    const title = matches[1];
    const platform = matches[2];

    notificationContent += `[${title}]➡︎${platform}\n`;
    count++;
  }

  if (typeof $task !== "undefined") {

    $notify("电视热度榜", "", notificationContent);
  } else if (typeof $httpClient !== "undefined") {

    $notification.post("电视热度榜", "", notificationContent);
  }

  $done();
}
