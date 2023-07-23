const url = "https://music.163.com/discover/toplist?id=3778678";
const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36" };

if (typeof $httpClient !== 'undefined') {
  $httpClient.get({ url: url, headers: headers }, function (error, response, body) {
    if (error) {
      console.log('请求失败:', error);
      $done();
      return;
    } else {
      const songList = extractSongList(body);
      if (songList.length > 0) {
        let count = 1;
        const notificationContent = songList.map((song) => `${count++}. ${song.name}🎧${song.artist}`).join("\n");
        $notification.post("网易云热歌榜", "", notificationContent);
      } else {
        $notification.post("Error", "No songs found", "Unable to extract song data.");
      }
      $done();
    }
  });
} else if (typeof $task !== 'undefined') {
  const request = {
    url: url,
    headers: headers
  };

  $task.fetch(request).then(
    function (response) {
      const body = response.body;
      const songList = extractSongList(body);
      if (songList.length > 0) {
        let count = 1;
        const notificationContent = songList.map((song) => `${count++}. ${song.name}🎧${song.artist}`).join("\n");
        $notify("网易云热歌榜", "", notificationContent);
      } else {
        $notify("Error", "No songs found", "Unable to extract song data.");
      }
      $done();
    },
    function (reason) {
      console.log('请求失败:', reason.error);
      $done();
    }
  );
}

function extractSongList(html) {
  const match = html.match(/<textarea id="song-list-pre-data".*?>(.*?)<\/textarea>/);
  if (match) {
    const songListData = match[1];
    const songList = JSON.parse(songListData);
    return songList.map((song) => {
      const name = song.name || "Unknown";
      const artist = song.artists && song.artists.length > 0 ? song.artists[0].name : "Unknown";
      return { name, artist };
    });
  }
  return [];
}
