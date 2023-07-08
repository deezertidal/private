const url = "https://api.exchangerate-api.com/v4/latest/CNY";
const isQuantumultX = typeof $task !== "undefined";
const isSurge = typeof $httpClient !== "undefined";
const isLoon = typeof $loon !== "undefined";

function getExchangeRate() {
  if (isQuantumultX) {
    $task.fetch({ url: url }).then(
      (response) => {
        showNotification(response.body);
      },
      (reason) => {
        console.log(reason.error);
        $done();
      }
    );
  } else if (isSurge || isLoon) {
    $httpClient.get(url, function (error, response, data) {
      if (error) {
        console.log(error);
        $done();
      } else {
        showNotification(data);
      }
    });
  }
}

function showNotification(data) {
  const rates = JSON.parse(data).rates;
  const usdToCny = (1 / rates.USD).toFixed(2);
  const cnyToHkd = rates.HKD.toFixed(2);
  const cnyToJpy = rates.JPY.toFixed(2);
  const cnyToKrw = rates.KRW.toFixed(2);
  const eurToCny = (1 / rates.EUR).toFixed(2);
  const gbpToCny = (1 / rates.GBP).toFixed(2);
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
  });

  const content = `

🇺🇸1美元兑换 ${usdToCny}🇨🇳人民币
🇨🇳1人民币兑换 ${cnyToHkd}🇭🇰港币
🇨🇳1人民币兑换 ${cnyToJpy}🇯🇵日元
🇨🇳1人民币兑换 ${cnyToKrw}🇰🇷韩元
🇪🇺1欧元兑换 ${eurToCny}🇨🇳人民币
🇬🇧1英镑兑换 ${gbpToCny}🇨🇳人民币

  `;

  if (isQuantumultX) {
    $notify(`🪙当前汇率信息 ${timestamp}`, "", content);
  } else if (isSurge || isLoon) {
    $notification.post(`🪙当前汇率信息 ${timestamp}`, "", content);
  }
  $done();
}

getExchangeRate();