//sub-store脚本操作，筛选出80，443端口
function filter(proxies) {
  return proxies.map(p => [80,443].includes(p.port));
}


//sub-store脚本操作，筛选出network=ws的节点
function filter(proxies) {
    return proxies.map(p => {
		return p.network === 'ws';
	});
}
