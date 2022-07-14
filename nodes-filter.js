/*脚本过滤筛选80,443，vmess,ws节点*/

function filter(proxies) {
  const allowedNetworks = ['ws'] // ['tcp', 'ws', 'h2', 'http', 'grpc']
  const port = [80,443]
 return proxies.map(p => {
  return p.type === "vmess" && allowedNetworks.includes(p.network) && port.includes(p.port)
 });
}
