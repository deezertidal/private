/*根据Tartarus2014的脚本稍作修改以自用*/

http-request ^https?:\/\/act.10010.com\/SigninApp\/signin\/querySigninActivity.htm script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js, tag=中国联通
http-request ^https?:\/\/act.10010.com\/SigninApp(.*?)\/signin\/daySign script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js, tag=中国联通
http-request ^https?:\/\/m.client.10010.com\/dailylottery\/static\/(textdl\/userLogin|active\/findActivityInfo) script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js, tag=中国联通
http-request ^https:\/\/sf-integral-sign-in.weixinjia.net\/app\/index script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.cookie.js, tag=顺丰速运
http-request ^https:\/\/mcs-mimp-web.sf-express.com\/mcs-mimp\/share\/(.*?)Redirect script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.cookie.js, tag=顺丰速运
http-request ^https:\/\/promotion.waimai.meituan.com\/playcenter\/signIn\/entry script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wmmeituan/wmmeituan.cookie.js, tag=美团外卖
http-request ^https:\/\/promotion.waimai.meituan.com\/playcenter\/signIn\/doaction script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wmmeituan/wmmeituan.cookie.js, requires-body=true,  tag=美团外卖
http-request ^https:\/\/i.meituan.com\/evolve\/signin\/signpost\/ script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/meituan/meituan.cookie.js, requires-body=true, tag=美团
http-request ^https:\/\/passport.suning.com\/ids\/login$ script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/suning/suning.cookie.js, requires-body=true, tag=苏宁易购
http-request ^https:\/\/luckman.suning.com\/luck-web\/sign\/api\/clock_sign.do script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/suning/suning.cookie.js, tag=苏宁易购
http-request ^https:\/\/sign.suning.com\/sign-web\/m\/promotion\/sign\/doSign.do script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/suning/suning.cookie.js, tag=苏宁易购
http-request ^https:\/\/gameapi.suning.com\/sngame-web\/(api\/signin\/private\/customerSignOperation.do|gateway\/api\/queryPrize.do) script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/suning/suning.cookie.js, tag=苏宁易购
http-request ^https:\/\/(api\.m|me-api|ms\.jr)\.jd\.com\/(client\.action\?functionId=signBean|user_new\/info\/GetJDUserInfoUnion\?|gw\/generic\/hy\/h5\/m\/appSign\?) tag=获取京东Cookie, requires-body=true, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js
http-request https:\/\/wq\.jd\.com\/user_new\/info\/GetJDUserInfoUnion tag=多京东Cookie获取, script-path=https://raw.githubusercontent.com/dompling/Script/master/jd/JD_extra_cookie.js
http-request ^https:\/\/ms\.jr\.jd\.com\/gw\/generic\/bt\/h5\/m\/queryUserSignFlow script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/jdczfcookie.js, tag=京东成长分
http-request https://api.tuhu.cn/User/GetUserCurrentAndNextGradeInfo script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.Cookie.js, tag=途虎养车
hostname =  luckman.suning.com, passport.suning.com, sign.suning.com, gameapi.suning.com, daojia.jd.com, group.baicizhan.com, i.meituan.com, promotion.waimai.meituan.com, m.client.10010.com, act.10010.com, mcs-mimp-web.sf-express.com, *.v2ex.com, api.m.jd.com, jdjoy.jd.com, jdread-api.jd.com,daojia.jd.com, api.tuhu.cn, ms.jr.jd.com, me-api.jd.com
