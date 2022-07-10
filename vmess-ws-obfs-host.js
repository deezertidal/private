/**
 * 为 VMess WebSocket 节点修改混淆 host
 * https://raw.githubusercontent.com/Peng-YM/Sub-Store/master/scripts/vmess-ws-obfs-host.js#host=v.qq.com
 * https://raw.githubusercontent.com/xream/scripts/main/surge/modules/sub-store-scripts/mega/index.js#title=免&host=v.qq.com&hostSuffix=[免流合集]&resolve=true
 */
function operator(proxies) {
    const { host } = $arguments;
    proxies.forEach(p => {
        if (p.type === 'vmess' && p.network === 'ws') {
            p["ws-opts"] = p["ws-opts"] || {};
            p["ws-opts"]["headers"] = p["ws-opts"]["headers"] || {};
            p["ws-opts"]["headers"]["Host"] = host;
        }
    });
    return proxies;
}
