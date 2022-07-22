var confStr = $config.getConfig()
console.log(confStr)
var conf = JSON.parse(confStr)
if (conf.ssid) {
    $config.setRunningModel(1)
    //$config.setSelectPolicy("节点选择","Auto")
    $notification.post("Mode Switcher","🎈当前正在使用无线网络","🚦Loon切换为规则模式")
} else {
    $config.setRunningModel(2)
   //$config.setSelectPolicy("节点选择","免流free")
    $notification.post("Mode Switcher","🎈当前正在使用蜂窝数据","🚀Loon切换为全局模式")
}
