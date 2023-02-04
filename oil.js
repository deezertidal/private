//江苏油价定时提醒 纯自用 请自行申请api key
//cron "0 10 10 ? * *" script-path=https://raw.githubusercontent.com/deezertidal/private/main/oil.js,tag=江苏油价提醒

const apiurl = "https://apis.tianapi.com/oilprice/index?key=d718b0f7c2b6d71cb3a9814e90bf847f&prov=%E6%B1%9F%E8%8B%8F"

$httpClient.get(apiurl,function(error,reponse,data){
    if (error){
        console.log(error);
        $done();                  
    } else {
        var obj=JSON.parse(data);
        console.log(obj);
        var prov =  obj.result.prov;
        var p0 = "0号柴油:" +"¥"+ obj.result.p0+"\xa0\xa0\xa0";
        var p92 = "92号汽油:" +"¥"+ obj.result.p92+"\xa0\xa0\xa0";
        var p95 = "95号汽油:" +"¥"+ obj.result.p95+"\xa0\xa0\xa0";
        var p98 = "98号汽油:" +"¥"+ obj.result.p98 +"\xa0\xa0\xa0";
        var time= obj.result.time
        $notification.post(prov+"油价提醒",time,p92+p95+p98+p0);
        $done();
    }
}
);
