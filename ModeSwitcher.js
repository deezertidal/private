var confStr = $config.getConfig()
console.log(confStr)
var conf = JSON.parse(confStr)
if (conf.ssid) {
    $config.setRunningModel(1)
    $config.setSelectPolicy("节点选择","Auto")
    $notification.post("🎈网络环境变化通知🎈","🚦切换为规则模式"," 专线节点")
} else {
    $config.setRunningModel(2)
    $config.setSelectPolicy("节点选择","免流free")
    $notification.post("🎈网络环境变化通知🎈","🚀切换为全局模式"," 免流节点")
}
