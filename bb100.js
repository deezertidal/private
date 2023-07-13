let songCount;
if (typeof $argument !== "undefined") {
  songCount = $argument;
} else {
  songCount = "5";
}

const url = 'https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json';

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
      const notification = `${rank}🎧${name} - ${artist} ${rankChange}`;
      notifications.push(notification);
    }

    if (typeof $task !== "undefined") {

      $notify(`Top ${songCount} of Billboard Hot 100`, '', notifications.join('\n'));
    } else if (typeof $httpClient !== "undefined") {
      $notification.post(`Top ${songCount} of Billboard Hot 100`, '', notifications.join('\n'));
    }
  } else {
    console.log('无法获取歌曲数据');
  }

  $done();
}