/*

应用名称：RNI films
软件版本：3.0.5
下载地址：https://shrtm.nu/ZGyR
脚本作者：Cuttlefish
微信账号：墨鱼手记
更新时间：2022-02-12
通知频道：https://t.me/ddgksf2021
问题反馈：https://t.me/ddgksf2013_bot

[rewrite_local]

# ～ RNI解锁高级会员（20220212）@ddgksf2013
https://pro-status-service-prod.azurewebsites.net/api/item url script-response-body https://raw.githubusercontent.com/ddgksf2013/Cuttlefish/master/Crack/rf.js

[mitm] 

hostname=pro-status-service-prod.azurewebsites.net

*/



var ddgksf2013 = JSON.parse($response.body);
ddgksf2013.FilmsProStatus = 1
ddgksf2013.AeroProStatus = 1
$done({body: JSON.stringify(ddgksf2013)});