# 自用cron收集

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
