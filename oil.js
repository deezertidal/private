const provname = $argument;
const encodedprovname = encodeURIComponent(provname);
const apiurl = `https://apis.tianapi.com/oilprice/index?key=d718b0f7c2b6d71cb3a9814e90bf847f&prov=${encodedprovname}`;

$httpClient.get(apiurl, function (error, response, data) {
    if (error) {
        console.log(error);
        $done();
    } else {
        var obj = JSON.parse(data);
        console.log(obj);
        var prov = obj.result.prov;
        var p0 = "⛽0号柴油: " + "¥" + obj.result.p0 ;
        var p92 = "⛽92号汽油: " + "¥" + obj.result.p92 + "\n";
        var p95 = "⛽95号汽油: " + "¥" + obj.result.p95 + "\n";
        var p98 = "⛽98号汽油: " + "¥" + obj.result.p98+ "\n";
        var time = obj.result.time;
        $notification.post(prov + "油价提醒", time, p92 + p95 + p98 + p0);
        $done();
    }
});