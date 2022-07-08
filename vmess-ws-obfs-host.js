/**
 * 为 VMess WebSocket 节点修改混淆 host
 * https://raw.githubusercontent.com/sub-store-org/Sub-Store/master/scripts/vmess-ws-obfs-host.js#host=v.qq.com
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
