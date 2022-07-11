function filter(proxies) {
    return proxies.map(p => ['ws','ws-opts'].includes(p.network));
}
