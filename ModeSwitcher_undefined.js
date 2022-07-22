/*
设置全局运行模式
0:Global Direct
1:By Rule
2:Global Proxy
*/

//自行修改ssid == ，setRunningModel，setSelectPolicy，notification.post的值，若不想指定SSID名 可删除 == "your ssid name"

var confStr = $config.getConfig()
console.log(confStr)

var conf = JSON.parse(confStr)
if (conf.ssid == "your ssid name") {
   
  
    $config.setRunningModel(0)
    //设置select策略组所对应的策略，子策略不存在时将保持原先的策略不变
    $config.setSelectPolicy("⛔ 广告拦截","DIRECT")
    $notification.post("Network changed","Change Running Model to Global Direct","⛔ 广告拦截 to DIRECT")
} else {
    $config.setRunningModel(1)
    $config.setSelectPolicy("⛔ 广告拦截","REJECT")
    $notification.post("Network changed","Change Running Model to Filter by rule","⛔ 广告拦截 to REJECT")
}

//一次性同时设置多个策略组的策略
$config.setSelectPolicy(["国外网站","广告拦截","谷歌服务"],["HK Node 1","REJECT","节点选择"])

//获取相关策略的子策略，json格式
var subPolicys = $config.getSubPolicys("节点选项")
console.log(subPolicys);
