function filter(proxies) {
  return proxies.(p => {
        (p.type === 'vmess' && p.network === 'ws'));
}
