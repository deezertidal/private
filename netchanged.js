//自用  generic script-path=https://raw.githubusercontent.com/deezertidal/private/main/netchanged.js,tag=网络状态通知优化
var confStr = $config.getConfig()
console.log(confStr)
var conf = JSON.parse(confStr)
if (conf.ssid) {
    $notification.post("🎈网络状态变更","🏠当前正在使用无线网络","无线名称➡️"+conf.ssid)
} else {
    $notification.post("🎈网络状态变更","📱当前正在使用蜂窝数据","联通大王卡➡️5G")
