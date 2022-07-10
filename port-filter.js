//sub-store脚本操作，筛选出80，443端口

function filter(proxies) {
  return proxies.map(p => [80,443].includes(p.port));
}
