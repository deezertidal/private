/*
function filter(proxies) {
  return proxies.map(p => [80,443].includes(p.port))*/
function filter(proxies) {
  const allowedNetworks = ['ws'] // ['tcp', 'ws', 'h2', 'http', 'grpc']
 return proxies.map(p => {
  return p.port === 80 && allowedNetworks.includes(p.network) 
 });
}
