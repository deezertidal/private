let platform = '今日头条';
let count = 6;
if (typeof $argument !== 'undefined' && $argument !== '') {
  const params = getParams($argument);
  platform = params.platform || platform;
  count = parseInt(params.count) || count;
} else if (typeof $persistentStore !== 'undefined') {
  platform = $persistentStore.read("platform") || platform;
  count = parseInt($persistentStore.read("count")) || count;
}
//loon用户可以在插件里可视化配置参数


let platformValue;


if (platform === '微博') {
  platformValue = 'KqndgxeLl9';
} else if (platform === '知乎') {
  platformValue = 'mproPpoq6O';
} else if (platform === '微信') {
  platformValue = 'WnBe01o371';
} else if (platform === '今日头条') {
  platformValue = 'x9ozB4KoXb';
} else if (platform === '澎湃') {
  platformValue = 'wWmoO5Rd4E';
} else if (platform === '百度') {
  platformValue = 'Jb0vmloB1G';
} else if (platform === '36氪') {
  platformValue = 'Q1Vd5Ko85R';
} else if (platform === '少数派') {
  platformValue = 'NaEdZZXdrO';
} else if (platform === '财新') {
  platformValue = 'x9ozBY7oXb';
} else if (platform === 'ZAKER') {
  platformValue = '5VaobJgoAj';
} else if (platform === '新京报') {
  platformValue = 'YqoXQ8XvOD';
} else if (platform === '南方周末') {
  platformValue = 'ENeYQBweY4';
} else if (platform === '科普中国') {
  platformValue = 'DgeyxkwdZq';
} else if (platform === '威锋网') {
  platformValue = 'n4qv90roaK';
} else if (platform === '起点小说') {
  platformValue = 'VaobmGneAj';
} else if (platform === '纵横小说') {
  platformValue = 'b0vmYyJvB1';
} else if (platform === '北美票房') {
  platformValue = 'n6YoVPadZa';
} else {
  platformValue = '';
}

const url = `https://tophub.today/n/${platformValue}`;

if (typeof $task !== 'undefined') {
  const request = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  };

  $task.fetch(request).then((response) => {
    const body = response.body;
    const hotSearchList = parseHotSearchList(body);
    const notificationTitle = `${platform}热榜`;
    const notificationContent = hotSearchList.slice(0, count).map((keyword, index) => `${index + 1}🔥${keyword}`).join('\n');

    $notify(notificationTitle, '', notificationContent);
    $done();
  }, (error) => {
    console.log('获取热榜失败', error);
    $done();
  });
} else if (typeof $httpClient !== 'undefined') {
  const request = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  };

  $httpClient.get(request, (error, response, body) => {
    if (error) {
      console.log('获取热榜失败', error);
      $done();
      return;
    }

    const hotSearchList = parseHotSearchList(body);
    const notificationTitle = `${platform}热榜`;
    const notificationContent = hotSearchList.slice(0, count).map((keyword, index) => `${index + 1}🔥${keyword}`).join('\n');

    $notification.post(notificationTitle, '', notificationContent);
    $done();
  });
} else {
  console.log('未知的脚本运行环境');
  $done();
}

function parseHotSearchList(html) {
  const regex = /<td class="al"><a href="\/l\?e=[^"]+"[^>]+>([^<]+)<\/a><\/td>\s+<td>([^<]*)<\/td>/g;
  const hotSearchList = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const keyword = match[1];
    hotSearchList.push(keyword);
  }

  return hotSearchList;
}


function getParams(param) {
  return Object.fromEntries(
    param
      .split('&')
      .map(item => item.split('='))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}