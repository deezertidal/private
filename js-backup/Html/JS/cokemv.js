var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ddgksf2013/Cuttlefish/Html/CSS/cokemv.css" type="text/css">');
$done({ body });
