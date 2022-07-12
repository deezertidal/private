/*
function filter(proxies) {
  return proxies.map(p => [80,443].includes(p.port))*/
function filter(proxies) {
  const allowedNetworks = ['ws'] // ['tcp', 'ws', 'h2', 'http', 'grpc']
  const port = [80,443]
 return proxies.map(p => {
  return p.type === "vmess" && allowedNetworks.includes(p.network) && port.includes(p.port)
 });
}
