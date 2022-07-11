function filter(proxies) {
    return proxies.map(p => [ws].includes(p.network));
}
