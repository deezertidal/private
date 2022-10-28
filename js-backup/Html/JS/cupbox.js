var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ddgksf2013/Cuttlefish@v0.4/Html/CSS/cupbox.css" type="text/css">');
$done({ body });
