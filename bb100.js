let songCount = 5;
let sort = 'billboard-hot-100';

if (typeof $argument !== 'undefined' && $argument !== '') {
  const params = getParams($argument);
  if (params.songCount !== undefined && !isNaN(params.songCount)) {
    songCount = parseInt(params.songCount);
  }
  if (params.sort !== undefined && params.sort !== '') {
    sort = params.sort;
  }
} else if (typeof $persistentStore !== 'undefined') {
  const persistentValue = $persistentStore.read("songCount");
  if (persistentValue !== undefined && !isNaN(persistentValue)) {
    songCount = parseInt(persistentValue);
  }
  const persistentValue2 = $persistentStore.read("sort");
  if (persistentValue2 !== undefined && persistentValue2 !== '') {
    sort = persistentValue2;
  }
}

const url = `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/${sort}/recent.json`;

if (typeof $task !== "undefined") {
  $task.fetch({ url: url }).then(
    function(response) {
      handleResponse(response.body);
    },
    function(reason) {
      console.log(reason.error);
      $done();
    }
  );
} else if (typeof $httpClient !== "undefined") {
  $httpClient.get(url, function(error, response, body) {
    if (error) {
      console.log("请求失败:", error);
      $done();
    } else {
      handleResponse(body);
    }
  });
}

function handleResponse(body) {
  const data = JSON.parse(body);
  if (data && data.data && data.data.length >= songCount) {
    const songs = data.data.slice(0, songCount);
    const notifications = [];
    for (const song of songs) {
      const { name, artist, rank, last_week_rank } = song;
      let rankChange = '';
      if (last_week_rank !== null) {
        const rankDiff = last_week_rank - rank;
        if (rankDiff >= 0) {
          rankChange = `↑${rankDiff}`;
        } else if (rankDiff < 0) {
          rankChange = `↓${Math.abs(rankDiff)}`;
        }
      } else {
        rankChange = '🆕';
      }
      let notification = `${rank}🎧`;
      if (name !== undefined && name !== null) {
        notification += `${name} - `;
      }
      if (artist !== undefined && artist !== null) {
        notification += `${artist} `;
      }
      notification += rankChange;
      notifications.push(notification);
    }
    if (typeof $task !== "undefined") {
      $notify(`Top ${songCount} of ${sort}`, '', notifications.join('\n'));
    } else if (typeof $httpClient !== "undefined") {
      $notification.post(`Top ${songCount} of ${sort}`, '', notifications.join('\n'));
    }
  } else {
    console.log('无法获取歌曲数据');
  }
  $done();
}

function getParams(param) {
  return Object.fromEntries(
    param
      .split('&')
      .map(item => item.split('='))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
