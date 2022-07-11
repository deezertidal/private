function filter(proxies) {
    return proxies.map(p => {
		return p.network === 'ws';
	});
}
