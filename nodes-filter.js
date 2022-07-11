function filter(proxies) {
  return proxies.map(p => [80,443].includes(p.port));
}


function filter(proxies) {
    return proxies.map(p => {
		return p.network === 'ws';
	});
}
