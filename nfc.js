var body = $response.body.replace(/is_vip":false/g, 'is_vip":true')
$done({body});
