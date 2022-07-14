/*
function filter(proxies) {
  return proxies.map(p => [80,443].includes(p.port))
function filter(proxies) {
  const allowedNetworks = ['ws'] // ['tcp', 'ws', 'h2', 'http', 'grpc']
 return proxies.map(p => {
  return p.port === 80 && allowedNetworks.includes(p.network) 
 });
}
*/
/*function filter(proxies) {
	return proxies.map(p => {
		return p.type === "vmess" && p.port === 80 && p.port === 443 && p.network === ws
	});
}*/
/*function filter(proxies) {
	return proxies.map(p => {
		return p.type === "vmess" && p.network === "ws"
	});
*/


# author:史提芬周

function filter(proxies) {
  const allowedNetworks = ['ws'] // ['tcp', 'ws', 'h2', 'http', 'grpc']
  const port = [80,443]
 return proxies.map(p => {
  return p.type === "vmess" && allowedNetworks.includes(p.network) && port.includes(p.port)
 });
}
