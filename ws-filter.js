function filter(proxies) {
    return proxies.map(p => {
		return p.type === "vmess" && p.network === "ws";
	});
}
