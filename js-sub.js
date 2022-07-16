http-request ^https?:\/\/api\.tidal\.com\/v1\/(pages\/album|(user|track|page)s\/(\d+)\/(state|subscription|lyrics|onboarding|playbackinfopostpaywall)) script-path=https://raw.githubusercontent.com/yqc007/QuantumultX/master/TIDALHiFiPlusCrack.js, timeout=10, tag=Tidal HiFi

http-response https:\/\/ap(p|i)\.bilibili\.com\/((pgc\/player\/api\/playurl)|(x\/v2\/account\/myinfo\?)|(x\/v2\/account/mine\?)) requires-body=1, script-path=https://raw.githubusercontent.com/Sunert/Script/master/Script/BiliHD.js, tag=Bilipj

http-request ^https?://ios\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D script-path=https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js, requires-body=true, timeout=10, tag=奈菲评分

http-response ^https?://ios\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js, requires-body=true, timeout=10, tag=奈菲评分

http-response ^https?://ios\.prod\.ftl\.netflix\.com/iosui/warmer/.+type=show-ath script-path=https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating_season.js, requires-body=true, timeout=10, tag=奈菲评分
http-response ^https?://api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js
http-request ^http://.+/amdc/mobileDispatch requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js
http-response ^https?://trade-acs\.m\.taobao\.com/gw/mtop\.taobao\.detail\.getdetail requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js
http-response ^https?://trade-acs\.m\.taobao\.com/gw/mtop\.taobao\.detail\.getdetail requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js, tag=比价
http-response ^https?://api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js, tag=比价
http-response ^https?://(sdk|wb)app\.uve\.weibo\.com(/interface/sdk/sdkad.php|/wbapplua/wbpullad.lua) requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/wb_launch.js, tag=微博去广告
http-response ^https?://m?api\.weibo\.c(n|om)/2/(statuses/(unread|extend|positives/get|(friends|video)(/|_)(mix)?timeline)|stories/(video_stream|home_list)|(groups|fangle)/timeline|profile/statuses|comments/build_comments|photo/recommend_list|service/picfeed|searchall|cardlist|page|!/photos/pic_recommend_status|video/tiny_stream_video_list|photo/info) requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/wb_ad.js, tag=微博去广告

# Choler 
http-response ^https?:\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad requires-body=1, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/Wechat.js, tag=微信公众号去广告

#  EMBY
http-response ^https?:\/\/mb3admin.com\/admin\/service\/registration\/validateDevice requires-body=1,  script-path=https://raw.githubusercontent.com/Tartarus2014/Script/master/Emby.js, tag=EMBY

# Wangsc1
http-response ^https?://m.client.10010.com/uniAdmsInterface/getHomePageAd script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Script/china_unicom.js, tag=联通轮播去广告

# Miao Miao
http-response ^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt requires-body=1, script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Script/bear.js, tag=Bear熊掌记

# Alex0510
http-response https://api.revenuecat.com/v1/receipts script-path=https://raw.githubusercontent.com/Alex0510/Eric/master/surge/Script/noto.js, requires-body=1, tag=noto笔记

# Liquor030
http-response ^https?://.*\.snssdk\.com/bds/(feed/stream|comment/cell_reply|cell/cell_comment|cell/detail|ward/list|user/favorite|user/cell_coment|user/cell_userfeed|user/publish_list) requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/Liquor030/Sub_Ruleset/master/Script/Super.js, tag=皮皮虾去水印广告

# langkhach270389
http-response http:\/\/www\.google\..* requires-body=1, script-path=https://raw.githubusercontent.com/langkhach270389/Quantumult-X-LK/master/Scripts/langkhach/endlessgoogle.js, tag=endlessgoogle

http-response https:\/\/pan\.baidu\.com\/rest\/2\.0\/membership\/user requires-body=1,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/BaiduCloud.js, tag=百度云加速
http-response ^https?:\/\/vip1\.kuwo\.cn\/(vip\/v2\/user\/vip|vip\/spi/mservice) requires-body=1, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Kuwo.js, tag=酷我音乐
http-response https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? requires-body=1, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/CamScanner.js, tag=扫描全能王
http-response ^https?:\/\/account\.wps\.cn\/api\/users requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Wps.js, tag=WPS
http-response https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? requires-body=1, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/CamScanner.js, tag=扫描全能王

# HotKids
http-response ^https?:\/\/weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi script-path=https://raw.githubusercontent.com/HotKids/Rules/master/Script/weixin110.js,requires-body=1, tag=微信 App 内被屏蔽链接快捷跳转


hostname = *.xxjjappss.com,*.huaerdadi.com,tncj.hortorgames.com,api.weibo.cn,mapi.weibo.com,*.uve.weibo.com,trade-acs.m.taobao.com,ios.prod.ftl.netflix.com,duoting.tatatimes.com, cm.szsszykj.com, avoscloud.com, api.flexibits.com, d.syshhc.top, 115.28.168.103, dbapi.ganbuguo.com,api.591master.com, www.mindmeister.com, sports.lifesense.com, api.pushover.net, subs.platforms.team, api.hulusaas.com, snailsleep.net,music.snailsleep.net,community.snailsleep.net, api.jiaonizuocai.com, nmeditation.snailsleep.net, claritywallpaper.com, subscription-service.neuralprisma.com, mappsv5.caixin.com, diary.7english.cn, api.gotokeep.com, *.ddly666.top,hkj178.com, a.jxjt888.top,lysl2020.com, www.i3zh.com,mb3admin.com,api2.mubu.com,mp.weixin.qq.com,r.inews.qq.com,m.client.10010.com,api.revenuecat.com,vip1.kuwo.cn,api.gamer.com.tw,ap*.intsig.net,newdrugs.dxy.cn,account.wps.cn,viva.v21xy.com,api.bjxkhc.com,api.vnision.com,api.picsart.c*, api.meiease.c*,ap*.intsig.net,api.bilibili.com,getuserinfo.321mh.com,getuserinfo-globalapi.zymk.cn,www.google.*,ios.fuliapps.com,apple.fuliapps.com,ios.xiangjiaoapps.com,apple.xiangjiaoapps.com,*.xiangxiangapps.com,vsco.co,weixin110.qq.com,api.ithome.com, *.xxjjappss.com,*.huaerdadi.com, api.m.jd.com,pan.baidu.com,vsco.co,api.vuevideo.net,,api.m.jd.com,testflight.apple.com,api.tidal.com
