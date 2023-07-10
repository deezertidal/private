const url = "https://www.ipip5.com/today/api.php?type=json";

if (typeof $task !== "undefined") {
  $task.fetch({ url: url }).then(
    (response) => {
      handleResponse(response.body);
    },
    (reason) => {
      console.log(reason.error);
      $done();
    }
  );
} else if (typeof $httpClient !== "undefined") {

  $httpClient.get(url, function (error, response, data) {
    if (error) {
      console.log(error);
      $done();
    } else {
      handleResponse(data);
    }
  });
}

function handleResponse(data) {
  const result = JSON.parse(data);
  const today = result.today;
  let events = result.result;

  events = events.filter((event) => event.year !== "2023");

  events.sort((a, b) => parseInt(b.year) - parseInt(a.year));

  const count = events.length > 9 ? 9 : events.length;
  events = events.slice(0, count);

  if (events.length > 0) {
    const eventList = events.map((event) => `📓${event.year}年：${event.title}`).join("\n");
    const notification = `${eventList}`;

    if (typeof $task !== "undefined") {

      $notify("历史上的" + today, "", notification);
    } else if (typeof $httpClient !== "undefined") {

      $notification.post("历史上的" + today, "", notification);
    }
  }
  $done();
}