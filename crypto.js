let symbols = [
  { symbol: 'BTC', name: '比特币' },
  { symbol: 'ETH', name: '以太坊' },
  { symbol: 'BNB', name: '币安币' },
  { symbol: 'XRP', name: '瑞波币' },
  { symbol: 'ADA', name: '艾达币' },
  { symbol: 'DOGE', name: '狗狗币' },
  { symbol: 'LTC', name: '莱特币' },
  { symbol: 'SOL', name: '索拉纳' },
  { symbol: 'TRX', name: '波场币' }
];

let notificationTitle = '加密货币汇率';
let notificationContent = [];

for (let i = 0; i < symbols.length; i++) {
  let symbol = symbols[i];
  let url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.symbol}USDT`;

  if (typeof $task !== 'undefined') {
    // Quantumult X
    $task.fetch({ url: url }).then(
      (response) => {
        handleResponse(response.body, symbol);
      },
      (reason) => {
        console.log(reason.error);
      }
    );
  } else if (typeof $httpClient !== 'undefined') {

    $httpClient.get(url, function (error, response, data) {
      if (error) {
        console.log(error);
      } else {
        handleResponse(data, symbol);
      }
    });
  }
}

function handleResponse(data, symbol) {
  let jsonData = JSON.parse(data);
  let price = jsonData.price;

  let currencyInfo = symbol.name + symbol.symbol + '💲' + price;
  notificationContent.push(currencyInfo);

  if (notificationContent.length === symbols.length) {
    sendNotification();
  }
}

function sendNotification() {
  let body = notificationContent.join('\n');

  if (typeof $task !== 'undefined') {

    $notify(notificationTitle, '', body);
  } else if (typeof $httpClient !== 'undefined') {

    $notification.post(notificationTitle, '', body);
  }
}
