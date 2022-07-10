function filter(proxies) {
  return proxies.map(p => ['80'].includes(p.port));
}
