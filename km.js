const url = 'https://m.kugou.com/rank/info/8888list?json=true';
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

if (typeof $httpClient !== 'undefined') {
  $httpClient.get(url, function(error, response, body) {
    if (error) {
      console.log('请求失败:', error);
      $done();
      return;
    }

    const result = JSON.parse(body);
    const songs = result.songs.list;

    let notificationContent = '';

    for (let i = 0; i < Math.min(10, songs.length); i++) {
      const song = songs[i];
      const authorName = song.authors[0].author_name;
      const songName = song.songname;
      

      notificationContent += `${i + 1}.${songName}🎧${authorName}\n`;
    }

    $notification.post('酷狗音乐热歌榜', '', notificationContent);
    $done();
  });
} else if (typeof $task !== 'undefined') {
  const request = {
    url: url,
    headers: headers
  };

  $task.fetch(request).then(
    function(response) {
      const body = response.body;
      const result = JSON.parse(body);
      const songs = result.songs.list;

      let notificationContent = '';

      for (let i = 0; i < Math.min(10, songs.length); i++) {
        const song = songs[i];
        const authorName = song.authors[0].author_name;
        const songName = song.songname;
        const rankCount = song.rank_count;

        notificationContent += `${i + 1}.${songName}🎧${authorName}\n`;
      }

      $notify('酷狗音乐热歌榜', '', notificationContent);
      $done();
    },
    function(reason) {
      console.log('请求失败:', reason.error);
      $done();
    }
  );
}
