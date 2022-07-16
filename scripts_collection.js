# 自动同步订阅配置
cron "30 6-23/3 * * *" script-path=https://raw.githubusercontent.com/sub-store-org/Sub-Store/master/backend/dist/cron-sync-artifacts.min.js, tag=Auto-Gist

# 联通免流监控
cron "15 7-18/2 * * *" script-path=https://raw.githubusercontent.com/xream/scripts/main/surge/modules/10010v3/10010.js, tag=流量监控, img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/mini/

# By Evilbutcher GitHub：https://github.com/evilbutcher/Quantumult_X/tree/master
cron "45 4 8 * * *" script-path=https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/check_in/glados/checkin_env.js, enable=false, tag=机场签到
cron "0 5 8 * * *" script-path=https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/check_in/glados/checkincookie_env.js, enable=false, tag=机场签到Cookie版

# By NobyDa    GitHub：https://github.com/NobyDa/Script/tree/master
cron "15 1 * * *" script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js, enable=false, tag=京东

# By chavyleung      GitHub：https://github.com/chavyleung/scripts
cron "5 3 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/jd/JD_BaiTiao.js, enable=false, tag=京东白条
cron "0 3 8 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.js, enable=false, tag= 顺丰速运
cron "20 3 8 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/v2ex/v2ex.js, enable=false, tag=V2EX
cron "0 5 8 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.js, enable=false, tag=中国联通

# photonmang  https://github.com/photonmang/quantumultX
cron "10 0 8 * * *" script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.js, enable=false, tag=途虎养车


# 京东资产变动通知
cron "2 9 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_bean_change.js, tag=京东资产变动通知

# 领京豆额外奖励
cron "10 7 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_bean_home.js, tag=领京豆额外奖励

# 省钱大赢家之翻翻乐
cron "20 * * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_big_winner.js,tag=省钱大赢家之翻翻乐

# 东东超市兑换奖品
cron "0 0 0 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_blueCoin.js,tag=东东超市兑换奖品

# 口袋书店
cron "1 8,12,18 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_bookshop.js,tag=口袋书店

# 京东汽车
cron "10 7 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_car.js, tag=京东汽车

# 京东汽车兑换
cron "0 0 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_car_exchange.js, tag=京东汽车兑换

# 京东手机狂欢城
cron "0 0-18/6 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_carnivalcity.js, tag=京东手机狂欢城

# 签到领现金
cron "2 0-23/4 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_cash.js,tag=签到领现金

# 京喜财富岛
cron "5 8,13,19 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_cfd.js,tag=京喜财富岛

# 摇京豆
cron "5 0,23 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_club_lottery.js,tag=摇京豆

# crazyJoy任务
cron "10 9 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_crazy_joy.js,tag=crazyJoy任务

# 监控crazyJoy分红
cron "10 12 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_crazy_joy_bonus.js,tag=监控crazyJoy分红

# crazyJoy挂机
cron "10 1,12 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_crazy_joy_coin.js,tag=crazyJoy挂机

# 天天提鹅
cron "10 * * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_daily_egg.js,tag=天天提鹅

# 小鸽有礼-每日抽奖
cron "13 1,22,23 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_daily_lottery.js, tag=每日抽奖

# 京喜工厂
cron "10 * * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_dreamFactory.js,tag=京喜工厂

# 获取多账号京东Cookie
http-request https:\/\/me-api\.jd\.com\/user_new\/info\/GetJDUserInfoUnion script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/JD_extra_cookie.js, enable=false, tag=获取多账号京东Cookie

# 京东家庭号
cron "1 12,23 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_family.js,tag=京东家庭号

# 东东农场
cron "5 6-18/6 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_fruit.js,tag=东东农场

# 获取互助码
cron "20 13 * * 6" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_get_share_code.js, tag=获取互助码

# 金榜创造营
cron "13 1,22 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_gold_creator.js, tag=金榜创造营

# 东东健康社区
cron "13 1,6,22 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_health.js, tag=东东健康社区

# 东东健康社区收集能量收集
cron "5-45/20 * * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_health_collect.js, tag=东东健康社区收集能量

# 东东工厂
cron "10 * * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_jdfactory.js,tag=东东工厂

# 京东赚赚
cron "10 0 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_jdzz.js,tag=京东赚赚

# 领金贴
cron "10 0 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_jin_tie.js,tag=领金贴

# 宠汪汪
cron "15 0-23/2 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_joy.js,tag=京东宠汪汪

# 宠汪汪🐕喂食
cron "15 0-23/1 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_joy_feedPets.js,tag=京东宠汪汪喂食

# 宠汪汪强制为别人助力
http-request ^https:\/\/draw\.jdfcloud\.com\/\/common\/pet\/enterRoom\/h5\?invitePin=.*(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?&reqSource=weapp|^https:\/\/draw\.jdfcloud\.com(\/mirror)?\/\/pet\/helpFriend\?friendPin script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_joy_help.js, requires-body=true, timeout=3600, tag=宠汪汪强制为别人助力

# 宠汪汪积分兑换奖品
cron "0 0-16/8 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_joy_reward.js,tag=宠汪汪积分兑换奖品

# 宠汪汪赛跑
cron "15 10 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_joy_run.js, tag=宠汪汪邀请助力与赛跑助力

# 宠汪汪助力更新Token
http-response ^https:\/\/draw\.jdfcloud\.com(\/mirror)?\/\/api\/user\/addUser\?code= script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_joy_run.js, requires-body=true, timeout=10, tag=宠汪汪助力更新Token

# 宠汪汪助力获取Token
http-request ^https:\/\/draw\.jdfcloud\.com(\/mirror)?\/\/api\/user\/user\/detail\?openId= script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_joy_run.js, timeout=3600, tag=宠汪汪助力获取Token

# 宠汪汪偷好友积分与狗粮
cron "10 0-21/3 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_joy_steal.js,tag=宠汪汪偷好友积分与狗粮

# 跳跳乐瓜分京豆
cron "1 0,11,21 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_jump.js, tag=跳跳乐瓜分京豆

# 京喜领88元红包
cron "4 10 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_jxlhb.js,tag=京喜领88元红包

# 惊喜牧场
cron "20 0-23/3 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_jxmc.js,tag=惊喜牧场

# 京喜农场
cron "0 9,12,18 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_jxnc.js,tag=京喜农场

# 京东快递签到
cron "10 0 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_kd.js, tag=京东快递签到

# 京东直播
cron "10-20/5 12 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_live.js,tag=京东直播

# 超级直播间红包雨
cron "0,30 0-23/1 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_live_redrain.js,tag=超级直播间红包雨

# 幸运大转盘
cron "4 10 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_market_lottery.js,tag=幸运大转盘

# 新潮品牌狂欢
cron "4 10 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_mcxhd.js,tag=新潮品牌狂欢

# 5G超级盲盒
cron "0 0,1-23/3 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_mohe.js,tag=5G超级盲盒

# 京东摇钱树
cron "3 0-23/2 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_moneyTree.js,tag=京东摇钱树

# 京东秒秒币
cron "10 7 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_ms.js,tag=京东秒秒币

# 点点券
cron "10 0,20 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_necklace.js,tag=点点券

# 女装盲盒抽京豆
cron "35 1,23 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_nzmh.js,tag=女装盲盒

# 东东萌宠
cron "15 6-18/6 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_pet.js,tag=东东萌宠

# 金融养猪
cron "12 0-23/6 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_pigPet.js, tag=京东金融养猪猪

# 京东种豆得豆
cron "1 7-21/2 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_plantBean.js,tag=京东种豆得豆

# 京东保价
cron "0 2 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_price.js,tag=京东保价

# 京东全民开红包
cron "1 1,2,23 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_redPacket.js, tag=京东全民开红包

# 闪购盲盒
cron "20 8 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_sgmh.js, tag=闪购盲盒

# 进店领豆
cron "10 0 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_shop.js,tag=进店领豆

# 东东小窝
cron "16 22 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_small_home.js, tag=东东小窝

# ✈️天天加速
cron "8 0-23/3 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_speed.js,tag=京东天天加速

# 京东极速版红包
cron "20 0,22 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_speed_redpocke.js,tag=京东极速版红包

# 京东极速版
cron "0 7 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_speed_sign.js,tag=京东极速版

# 明星小店
cron "0 1,21 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_star_shop.js,tag=明星小店

# 东东超市
cron "11 * * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_superMarket.js,tag=东东超市

# 赚京豆
cron "10 0,7,23 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_syj.js, tag=赚京豆

# 取关京东店铺和商品
cron "55 23 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_unsubscribe.js,tag=取关京东店铺商品

# 家电星推官
cron "0 0 0 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_xtg.js,tag=家电星推官

# 家电星推官好友互助
cron "0 0 0 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_xtg_help.js,tag=家电星推官好友互助

# 618动物联萌
cron "33 0,6-23/2 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_zoo.js, tag=618动物联萌

# 618动物联萌收集金币
cron "0-59/30 * * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_zooCollect.js,tag=618动物联萌收集金币

# 小米运动
cron "15 17 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/backUp/xmSports.js, tag=小米运动

# 小米运动获取Token
http-response ^https:\/\/account\.huami\.com\/v2\/client\/login script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/backUp/xmSports.js, requires-body=true, timeout=3600, tag=小米运动获取Token

http-request ^https?:\/\/api\.tidal\.com\/v1\/(pages\/album|(user|track|page)s\/(\d+)\/(state|subscription|lyrics|onboarding|playbackinfopostpaywall)) script-path=https://raw.githubusercontent.com/yqc007/QuantumultX/master/TIDALHiFiPlusCrack.js, timeout=10, tag=Tidal HiFi
http-response https:\/\/ap(p|i)\.bilibili\.com\/((pgc\/player\/api\/playurl)|(x\/v2\/account\/myinfo\?)|(x\/v2\/account/mine\?)) requires-body=1, script-path=https://raw.githubusercontent.com/Sunert/Script/master/Script/BiliHD.js, tag=Bilipj
http-response ^https?://api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js
http-request ^http://.+/amdc/mobileDispatch requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js
http-response ^https?://trade-acs\.m\.taobao\.com/gw/mtop\.taobao\.detail\.getdetail requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js
http-response ^https?://trade-acs\.m\.taobao\.com/gw/mtop\.taobao\.detail\.getdetail requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js, tag=比价
http-response ^https?://api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) requires-body=1,script-path=https://service.2ti.st/QuanX/Script/jd_tb_price/main.js, tag=比价
http-response ^https?://(sdk|wb)app\.uve\.weibo\.com(/interface/sdk/sdkad.php|/wbapplua/wbpullad.lua) requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/wb_launch.js, tag=微博去广告
http-response ^https?://m?api\.weibo\.c(n|om)/2/(statuses/(unread|extend|positives/get|(friends|video)(/|_)(mix)?timeline)|stories/(video_stream|home_list)|(groups|fangle)/timeline|profile/statuses|comments/build_comments|photo/recommend_list|service/picfeed|searchall|cardlist|page|!/photos/pic_recommend_status|video/tiny_stream_video_list|photo/info) requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/wb_ad.js, tag=微博去广告
http-response ^https?:\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad requires-body=1, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/Wechat.js, tag=微信公众号去广告
http-response ^https?:\/\/mb3admin.com\/admin\/service\/registration\/validateDevice requires-body=1,  script-path=https://raw.githubusercontent.com/Tartarus2014/Script/master/Emby.js, tag=EMBY
http-response http:\/\/www\.google\..* requires-body=1, script-path=https://raw.githubusercontent.com/langkhach270389/Quantumult-X-LK/master/Scripts/langkhach/endlessgoogle.js, tag=endlessgoogle
http-response https:\/\/pan\.baidu\.com\/rest\/2\.0\/membership\/user requires-body=1,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/BaiduCloud.js, tag=百度云加速
http-response ^https?:\/\/vip1\.kuwo\.cn\/(vip\/v2\/user\/vip|vip\/spi/mservice) requires-body=1, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Kuwo.js, tag=酷我音乐
http-response https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? requires-body=1, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/CamScanner.js, tag=扫描全能王
http-response ^https?:\/\/account\.wps\.cn\/api\/users requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Wps.js, tag=WPS
http-response https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? requires-body=1, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/CamScanner.js, tag=扫描全能王
http-response ^https?:\/\/weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi script-path=https://raw.githubusercontent.com/HotKids/Rules/master/Script/weixin110.js,requires-body=1, tag=微信 App 内被屏蔽链接快捷跳转


http-request ^https?:\/\/act.10010.com\/SigninApp\/signin\/querySigninActivity.htm script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js, tag=中国联通
http-request ^https?:\/\/act.10010.com\/SigninApp(.*?)\/signin\/daySign script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js, tag=中国联通
http-request ^https?:\/\/m.client.10010.com\/dailylottery\/static\/(textdl\/userLogin|active\/findActivityInfo) script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js, tag=中国联通
http-request ^https:\/\/sf-integral-sign-in.weixinjia.net\/app\/index script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.cookie.js, tag=顺丰速运
http-request ^https:\/\/mcs-mimp-web.sf-express.com\/mcs-mimp\/share\/(.*?)Redirect script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/sfexpress/sfexpress.cookie.js, tag=顺丰速运
http-request ^https:\/\/promotion.waimai.meituan.com\/playcenter\/signIn\/entry script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wmmeituan/wmmeituan.cookie.js, tag=美团外卖
http-request ^https:\/\/promotion.waimai.meituan.com\/playcenter\/signIn\/doaction script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wmmeituan/wmmeituan.cookie.js, requires-body=true,  tag=美团外卖
http-request ^https:\/\/i.meituan.com\/evolve\/signin\/signpost\/ script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/meituan/meituan.cookie.js, requires-body=true, tag=美团
http-request ^https:\/\/(api\.m|me-api|ms\.jr)\.jd\.com\/(client\.action\?functionId=signBean|user_new\/info\/GetJDUserInfoUnion\?|gw\/generic\/hy\/h5\/m\/appSign\?) tag=获取京东Cookie, requires-body=true, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js
http-request https:\/\/wq\.jd\.com\/user_new\/info\/GetJDUserInfoUnion tag=多京东Cookie获取, script-path=https://raw.githubusercontent.com/dompling/Script/master/jd/JD_extra_cookie.js
http-request ^https:\/\/ms\.jr\.jd\.com\/gw\/generic\/bt\/h5\/m\/queryUserSignFlow script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/jdczfcookie.js, tag=京东成长分
http-request https://api.tuhu.cn/User/GetUserCurrentAndNextGradeInfo script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.Cookie.js, tag=途虎养车

hostname = daojia.jd.com,group.baicizhan.com,i.meituan.com,promotion.waimai.meituan.com,m.client.10010.com,act.10010.com,mcs-mimp-web.sf-express.com,*.v2ex.com,api.m.jd.com,jdjoy.jd.com,jdread-api.jd.com,api.tuhu.cn,ms.jr.jd.com,me-api.jd.com,*.xxjjappss.com,*.huaerdadi.com,tncj.hortorgames.com,api.weibo.cn,mapi.weibo.com,*.uve.weibo.com,trade-acs.m.taobao.com,ios.prod.ftl.netflix.com,duoting.tatatimes.com,cm.szsszykj.com,avoscloud.com,api.flexibits.com,d.syshhc.top,115.28.168.103,dbapi.ganbuguo.com,api.591master.com,www.mindmeister.com,sports.lifesense.com,api.pushover.net,subs.platforms.team,api.hulusaas.com,snailsleep.net,music.snailsleep.net,community.snailsleep.net,api.jiaonizuocai.com,nmeditation.snailsleep.net,claritywallpaper.com,subscription-service.neuralprisma.com,mappsv5.caixin.com,diary.7english.cn,api.gotokeep.com,*.ddly666.top,hkj178.com,a.jxjt888.top,lysl2020.com,www.i3zh.com,mb3admin.com,api2.mubu.com,mp.weixin.qq.com,r.inews.qq.com,api.revenuecat.com,vip1.kuwo.cn,api.gamer.com.tw,ap*.intsig.net,newdrugs.dxy.cn,account.wps.cn,viva.v21xy.com,api.bjxkhc.com,api.vnision.com,api.picsart.c*,api.meiease.c*,api.bilibili.com,getuserinfo.321mh.com,getuserinfo-globalapi.zymk.cn,www.google.*,ios.fuliapps.com,apple.fuliapps.com,ios.xiangjiaoapps.com,apple.xiangjiaoapps.com,*.xiangxiangapps.com,vsco.co,weixin110.qq.com,api.ithome.com,*.xxjjappss.com,pan.baidu.com,api.vuevideo.net,testflight.apple.com,me-api.jd.com,draw.jdfcloud.com,account.huami.com,api.tidal.com
