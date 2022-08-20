var body = $response.body;
var obj = JSON.parse(body);

obj.tradeEndTime = 1879685290000;
body = JSON.stringify(obj);
$done({body});