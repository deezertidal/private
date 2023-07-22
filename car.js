const url = "https://www.kbb.com/cars/";
const regex = /"masterListName":"(.*?)".*?"topVehicles":\[(.*?)\]/gs;
const carRegex = /"name":"(.*?)",/g;

if (typeof $httpClient !== "undefined") {
  $httpClient.get(url, function (error, response, data) {
    if (error) {
      console.log("Error:", error);
      $done();
    } else {
      const results = [];
      let match;
      let categoryCounter = 1;
      while ((match = regex.exec(data))) {
        const category = match[1];
        const carMatches = match[2].match(carRegex);
        const carNames = carMatches.map((m, index) => {
          const carName = m.replace(carRegex, "$1");
          return `${index + 1}. ${carName}`;
        });
        results.push(`🚘•${category}\n${carNames.join("\n")}`);
        categoryCounter++;
      }
      const notificationText = results.join("\n");
      $notification.post("", "", notificationText);
      $done();
    }
  });
} else if (typeof $task !== "undefined") {
  const request = {
    url: url,
  };
  $task.fetch(request).then(
    function (response) {
      const data = response.body;
      const results = [];
      let match;
      let categoryCounter = 1;
      while ((match = regex.exec(data))) {
        const category = match[1];
        const carMatches = match[2].match(carRegex);
        const carNames = carMatches.map((m, index) => {
          const carName = m.replace(carRegex, "$1");
          return `${index + 1}. ${carName}`;
        });
        results.push(`🚘•${category}\n${carNames.join("\n")}`);
        categoryCounter++;
      }
      const notificationText = results.join("\n");
      $notify("", "", notificationText);
      $done();
    },
    function (reason) {
      console.log("Error:", reason.error);
      $done();
    }
  );
}