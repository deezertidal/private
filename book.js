var url = "https://book.douban.com/latest?tag";
var headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
};

if (typeof $task !== 'undefined') {

  $task.fetch({ url: url, headers: headers }).then(
    function(response) {
      handleResponse(response.body);
    },
    function(reason) {
      console.log("请求失败:", reason.error);
      $done();
    }
  );
} else if (typeof $httpClient !== 'undefined') {

  $httpClient.get({ url: url, headers: headers }, function(error, response, data) {
    if (error) {
      console.log("请求失败:", error);
      $done();
      return;
    }
    handleResponse(data);
  });
}

function handleResponse(data) {
  var bookData = extractBookData(data);
  var books = bookData.slice(0, 9);
  var notificationContent = "";
  for (var i = 0; i < books.length; i++) {
    var book = books[i];
    var title = book.title;
    var author = book.author;
    var rating = book.rating || "暂无";
    notificationContent += ${i + 1}. ${title}\n作者:${author} 评分:${rating}\n;
  }

  if (typeof $task !== 'undefined') {

    $notify("新书速递", "", notificationContent);
  } else if (typeof $httpClient !== 'undefined') {

    $notification.post("新书速递", "", notificationContent);
  }
  $done();
}

function extractBookData(html) {
  // ...
  // ...
  var pattern = /<h2 class="clearfix">\s+<a class="fleft" href="([^"]+)">([^<]+)<\/a>\s+<\/h2>\s+<p class="subject-abstract color-gray">([^<]+)<\/p>\s+<p class="clearfix w250">[\s\S]*?<span class="font-small color-red fleft">([\d.]+)<\/span>/g;
  var matches;
  var books = [];
  while ((matches = pattern.exec(html)) !== null) {
    var link = matches[1];
    var title = matches[2].replace(/^\d+\.\s/, "") + " 📖"; 
    var info = matches[3];
    var rating = matches[4];
    var authorMatch = info.match(/\s*(.+) \/ \d{4}-\d{1,2}/);
    var author = authorMatch ? authorMatch[1] : "未知作者";
    books.push({
      title: title,
      author: author,
      rating: rating
    });
  }
  return books;
}