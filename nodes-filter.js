function filter(proxies) {
    return proxies.map(p => {
		return p.network === 'ws' && p.port === [80,443].includes);
	});
}
