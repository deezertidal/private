/*
根据网络切换Loon运行模式
  0:全局直连模式
  1:规则分流模式
  2:全局代理模式
  */
var confStr = $config.getConfig()
console.log(confStr)
var conf = JSON.parse(confStr)
if (conf.ssid) {
    $config.setRunningModel(1)
    $notification.post("Mode Switcher","🎈当前正在使用无线网络","🚦Loon切换为规则模式")
} else {
    $config.setRunningModel(2)
    $notification.post("Mode Switcher","🎈当前正在使用蜂窝数据","🚀Loon切换为全局模式")
}
