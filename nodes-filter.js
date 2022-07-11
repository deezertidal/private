function filter(proxies) {
	return proxies.map(p => {
		return p.type === 'vmess' && p.port === [80] && p.network === 'ws';
	});
}
