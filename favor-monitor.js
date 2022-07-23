/*

【热门监控】@evilbutcher

【仓库地址】https://github.com/evilbutcher/Quantumult_X/tree/master（欢迎star🌟）

【BoxJs】https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/evilbutcher.boxjs.json

【致谢】
本脚本使用了Chavy的Env.js，感谢！
@南叔、@mini计划-图标聚合、@zZPiglet、@xinian、@api-evangelist-rss2json

⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

⚠️【使用方法】请仔细阅读⚠️
------------------------------------------
1、按照客户端配置好task，支持监控微博热搜、知乎热榜、百度风云榜、B站日榜、豆瓣榜单、抖音榜单、36氪、Kindle图书、rss订阅、人人影视最新美剧资源
2、不再需要获取Cookie，无用Cookie会自动清除；B站榜单对应关系：0全站，1动画，3音乐，4游戏，5娱乐，36科技，119鬼畜，129舞蹈。
3、本地直接修改关键词，远程可通过BoxJs修改关键词，有关键词更新时会通知，否则不通知。
4、可选择是否合并同一榜单的全部通知。
5、可选择匹配关键词或者直接获取热搜最新内容，并自定义数量。
6、B站、豆瓣榜单独立推送时可显示封面。
7、可选择是否附带跳转链接。
8、可自定每个榜单匹配关键词还是获取最新内容。
9、可自定每个榜单推送分开还是合并。
10、支持BoxJs直接运行脚本。

本地脚本keyword设置关键词，注意是英文逗号；BoxJs是用中文逗号。

⚠️【BoxJs】设置注意事项⚠️
------------------------------------------
订阅后，可以在BoxJs里面修改关键词，设置清除Cookie、开启对应榜单等。

#微博热搜检测数量设置：建议最大为8，设置检测数量太多显示不完全，内容过多。其他榜单最大检测数量暂无建议，自行决定即可。

#关键词：对所有榜单生效，榜单内无关键词匹配不会通知。

#忽略关键词推送最新内容：打开，将无视关键词，直接获取设定检测数量的对应榜单内容。

#消息分开推送：关闭，同一榜单的内容将整合为一条通知，可直接下拉或在通知面板长按通知展开，点击链接跳转详情；开启，每条内容分开推送，推送将会分为多条通知。关键词匹配模式下可打开，获取最新内容时建议关闭。

仅测试Quantumult X、Loon，理论上也支持Surge（没Surge无法测试）。

【Surge】配置
------------------------------------------
热门监控 = type=cron,cronexp="30 0 8-22/2 * * *",script-path=https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/check_in/hotsearch/hot.js,wake-system=true,timeout=600

【Loon】配置
------------------------------------------
[script]
cron "30 0 8-22/2 * * *" script-path=https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/check_in/hotsearch/hot.js, timeout=600, tag=热门监控

【Quantumult X】配置
------------------------------------------
[task_local]
30 0 8-22/2 * * * https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/check_in/hotsearch/hot.js, tag=热门监控

*/

const $ = new Env("热门监控");
const base64 = new Base64Code();

//⚠️本地自定参数修改位置⚠️
var keyword = ["eminem,"古典音乐","周星驰"]; //👈本地脚本关键词在这里设置。
var rsslink = ["http://sspai.me/feed", "http://songshuhui.net/feed"]; //👈本地rss订阅设置
//⚠️👆以上用英文逗号、英文双引号⚠️
$.weibo = true; //是否开启相应榜单监控
$.wbnum = 6; //自定微博热搜数量
$.zhihu = true; //是否开启相应榜单监控
$.zhnum = 6; //自定知乎热榜数量
$.baidu = true; //是否开启相应榜单监控
$.bdnum = 6; //自定百度风云榜数量
$.bilibili = true; //是否开启相应榜单监控
$.blnum = 6; //自定B站榜单数量
$.douban = true; //是否开启相应榜单监控
$.dbnum = 6; //自定豆瓣榜单数量
$.douyin = true; //是否开启相应榜单监控
$.dynum = 6; //自定抖音榜单数量
$.k36 = true; //是否开启相应榜单监控
$.k36num = 6; //自定36氪榜单数量
$.amazon = true; //是否开启相应榜单监控
$.amznum = 6; //自定Kindle图书榜单数量
$.rss = true; //是否开启相应榜单监控
$.rssnum = 6; //自定rss订阅推送数量
/*$.zmz = true; //是否开启相应榜单监控
$.zmznum = 6; //自定人人影视推送数量*/
$.splitpushwb = false; //是否分开推送微博榜单
$.pushnewwb = false; //是否忽略关键词推送微博最新内容
$.splitpushzh = false; //是否分开推送知乎榜单
$.pushnewzh = false; //是否忽略关键词推送知乎最新内容
$.splitpushbd = false; //是否分开推送百度榜单
$.pushnewbd = false; //是否忽略关键词推送百度最新内容
$.splitpushbl = false; //是否分开推送B站榜单
$.pushnewbl = false; //是否忽略关键词推送B站最新内容
$.splitpushdb = false; //是否分开推送豆瓣榜单
$.pushnewdb = false; //是否忽略关键词推送豆瓣最新内容
$.splitpushdy = false; //是否分开推送抖音榜单
$.pushnewdy = false; //是否忽略关键词推送抖音最新内容
$.splitpushk36 = false; //是否分开推送36氪榜单
$.pushnewk36 = false; //是否忽略关键词推送36氪最新内容
$.splitpushamz = false; //是否分开推送Kindle图书榜单
$.pushnewamz = false; //是否忽略关键词推送Kindle图书最新内容
$.splitpushrss = false; //是否分开推送rss内容
$.pushnewrss = false; //是否忽略关键词推送rss最新内容
/*$.splitpushzmz = false; //是否分开推送人人影视内容
$.pushnewzmz = false; //是否忽略关键词推送人人影视最新内容*/
$.attachurl = false; //通知是否附带跳转链接
$.refreshtime = 6; //重复内容默认在6小时内不再通知，之后清空，可自行修改
$.rid = 0; //更改B站监控榜单
$.time = 2; //榜单获取时限，单位秒
//⚠️本地自定参数修改位置⚠️

var itemswb = [];
var itemszh = [];
var itemsbd = [];
var itemsbl = [];
var itemsdb = [];
var itemsdy = [];
var itemsk36 = [];
var itemsamz = [];
var itemsrss = [];
//var itemszmz = [];
var urlswb = [];
var urlszh = [];
var urlsbd = [];
var urlsbl = [];
var urlsdb = [];
var urlsdy = [];
var urlsk36 = [];
var urlsamz = [];
var urlsrss = [];
//var urlszmz = [];
var coversbl = [];
var coversdb = [];
var coversamz = [];
var coversrss = [];
var resultwb = [];
var resultzh = [];
var resultbd = [];
var resultbl = [];
var resultdb = [];
var resultdy = [];
var resultk36 = [];
var resultamz = [];
var resultrss = [];
//var resultzmz = [];
var openurlwb = [];
var openurlzh = [];
var openurlbd = [];
var openurlbl = [];
var openurldb = [];
var openurldy = [];
var openurlk36 = [];
var openurlamz = [];
var openurlrss = [];
//var openurlzmz = [];
var mediaurlbl = [];
var mediaurldb = [];
var mediaurlamz = [];
var mediaurlrss = [];
var titlerss = [];
var saveditem = [];
var checkrssresult = false;

!(async () => {
  /*if (typeof $request != "undefined") {
    getCookie();
    return;
  }*/
  getsetting();
  if (havekeyword() == true) {
    if ($.weibo == true) {
      await gethotsearch();
    } else {
      $.log("微博热搜未获取😫");
    }
    if ($.zhihu == true) {
      await gethotlist();
    } else {
      $.log("知乎热榜未获取😫");
    }
    if ($.baidu == true) {
      await getfylist();
    } else {
      $.log("百度风云榜未获取😫");
    }
    if ($.bilibili == true) {
      await getbllist();
    } else {
      $.log("B站日榜未获取😫");
    }
    if ($.douban == true) {
      await getdblist();
    } else {
      $.log("豆瓣榜单未获取😫");
    }
    if ($.douyin == true) {
      await getdylist();
    } else {
      $.log("抖音榜单未获取😫");
    }
    if ($.k36 == true) {
      await getk36list();
    } else {
      $.log("36氪榜单未获取😫");
    }
    if ($.amazon == true) {
      await getamazonlist();
    } else {
      $.log("Kindle图书榜单未获取😫");
    }
    /*if ($.zmz == true) {
      await getzmzlist();
    } else {
      $.log("人人影视榜单未获取😫");
    }*/
    if ($.rss == true) {
      if (haversslink()) {
        await Promise.all(
          rsslink.map(async (rss) => {
            await getrsslist(
              rss,
              resultrss,
              openurlrss,
              mediaurlrss,
              titlerss,
              itemsrss,
              urlsrss,
              coversrss
            );
          })
        );
      }
    } else {
      $.log("rss订阅未获取😫");
    }
    last();
    final();
    //deluselessck();
  }
})()
  .catch((e) => {
    $.log("", `❌失败! 原因: ${e}!`, "");
  })
  .finally(() => {
    $.done();
  });

function havekeyword() {
  if (keyword.length == 0) {
    $.msg("热门监控", "请输入要监控的关键词🔍", "请在BoxJs或本地中进行设置。");
    return false;
  } else {
    for (var i = 0; i < keyword.length; i++) {
      if (keyword[i] != 0) {
        return true;
      }
    }
    $.msg(
      "热门监控",
      "请输入要监控的关键词🔍",
      "存在为空的关键词，请在BoxJs或本地重新设置。"
    );
    return false;
  }
}

function haversslink() {
  if (rsslink.length == 0) {
    $.msg("热门监控", "请输入要监控的rss链接🔍", "请在BoxJs中进行设置。");
    return false;
  } else {
    for (var i = 0; i < rsslink.length; i++) {
      if (rsslink[i] != 0) {
        return true;
      }
    }
    $.msg(
      "热门监控",
      "请输入要监控的rss链接🔍",
      "存在为空的rss链接，请在BoxJs重新设置。"
    );
    return false;
  }
}

function getsetting() {
  $.log("初始化！");
  if (
    $.getdata("evil_savedtime") != undefined &&
    $.getdata("evil_savedtime") != ""
  ) {
    $.savedtime = $.getdata("evil_savedtime");
    $.nowtime = new Date().getTime();
  } else {
    $.savedtime = new Date().getTime();
    $.nowtime = new Date().getTime();
    $.setdata(JSON.stringify($.nowtime), "evil_savedtime");
    $.setdata("[]", "evil_saveditem");
  }
  $.refreshtime = $.getdata("evil_refreshtime") || $.refreshtime;
  var minus = $.nowtime - $.savedtime;
  if (minus > $.refreshtime * 3600000) {
    $.setdata("[]", "evil_saveditem");
    $.setdata(JSON.stringify($.nowtime), "evil_savedtime");
  }
  if (
    $.getdata("evil_saveditem") != undefined &&
    $.getdata("evil_saveditem") != ""
  ) {
    var storeitem = JSON.parse($.getdata("evil_saveditem"));
  } else {
    storeitem = [];
  }
  for (var i = 0; i < storeitem.length; i++) {
    saveditem.push(storeitem[i]);
  }
  if (saveditem.length != 0) {
    $.log("\n刷新时间内不再通知的内容👇\n" + saveditem + "\n");
  }
  if (
    $.getdata("evil_wb_keyword") != undefined &&
    $.getdata("evil_wb_keyword") != ""
  ) {
    var key = $.getdata("evil_wb_keyword");
    keyword = key.split("，");
  }
  if (
    $.getdata("evil_rsslink") != undefined &&
    $.getdata("evil_rsslink") != ""
  ) {
    var rssurl = $.getdata("evil_rsslink");
    rsslink = rssurl.split("，");
  }
  $.weibo = JSON.parse($.getdata("evil_wb") || $.weibo);
  $.zhihu = JSON.parse($.getdata("evil_zh") || $.zhihu);
  $.baidu = JSON.parse($.getdata("evil_bd") || $.baidu);
  $.bilibili = JSON.parse($.getdata("evil_bl") || $.bilibili);
  $.douban = JSON.parse($.getdata("evil_db") || $.douban);
  $.douyin = JSON.parse($.getdata("evil_dy") || $.douyin);
  $.k36 = JSON.parse($.getdata("evil_k36") || $.k36);
  $.amazon = JSON.parse($.getdata("evil_amazon") || $.amazon);
  $.rss = JSON.parse($.getdata("evil_rss") || $.rss);
  $.zmz = JSON.parse($.getdata("evil_zmz") || $.zmz);
  $.splitpushwb = JSON.parse($.getdata("evil_splitpushwb") || $.splitpushwb);
  $.splitpushzh = JSON.parse($.getdata("evil_splitpushzh") || $.splitpushzh);
  $.splitpushbd = JSON.parse($.getdata("evil_splitpushbd") || $.splitpushbd);
  $.splitpushbl = JSON.parse($.getdata("evil_splitpushbl") || $.splitpushbl);
  $.splitpushdb = JSON.parse($.getdata("evil_splitpushdb") || $.splitpushdb);
  $.splitpushdy = JSON.parse($.getdata("evil_splitpushdy") || $.splitpushdy);
  $.splitpushk36 = JSON.parse($.getdata("evil_splitpushk36") || $.splitpushk36);
  $.splitpushamz = JSON.parse($.getdata("evil_splitpushamz") || $.splitpushamz);
  $.splitpushrss = JSON.parse($.getdata("evil_splitpushrss") || $.splitpushrss);
  $.splitpushzmz = JSON.parse($.getdata("evil_splitpushzmz") || $.splitpushzmz);
  $.pushnewwb = JSON.parse($.getdata("evil_pushnewwb") || $.pushnewwb);
  $.pushnewzh = JSON.parse($.getdata("evil_pushnewzh") || $.pushnewzh);
  $.pushnewbd = JSON.parse($.getdata("evil_pushnewbd") || $.pushnewbd);
  $.pushnewbl = JSON.parse($.getdata("evil_pushnewbl") || $.pushnewbl);
  $.pushnewdb = JSON.parse($.getdata("evil_pushnewdb") || $.pushnewdb);
  $.pushnewdy = JSON.parse($.getdata("evil_pushnewdy") || $.pushnewdy);
  $.pushnewk36 = JSON.parse($.getdata("evil_pushnewk36") || $.pushnewk36);
  $.pushnewamz = JSON.parse($.getdata("evil_pushnewamz") || $.pushnewamz);
  $.pushnewrss = JSON.parse($.getdata("evil_pushnewrss") || $.pushnewrss);
  $.pushnewzmz = JSON.parse($.getdata("evil_pushnewzmz") || $.pushnewzmz);
  $.attachurl = JSON.parse($.getdata("evil_attachurl") || $.attachurl);
  $.rid = $.getdata("evil_blrid") * 1 || $.rid;
  $.wbnum = $.getdata("evil_wbnum") * 1 || $.wbnum;
  $.zhnum = $.getdata("evil_zhnum") * 1 || $.zhnum;
  $.bdnum = $.getdata("evil_bdnum") * 1 || $.bdnum;
  $.blnum = $.getdata("evil_blnum") * 1 || $.blnum;
  $.dbnum = $.getdata("evil_dbnum") * 1 || $.dbnum;
  $.dynum = $.getdata("evil_dynum") * 1 || $.dynum;
  $.k36num = $.getdata("evil_k36num") * 1 || $.k36num;
  $.amznum = $.getdata("evil_amznum") * 1 || $.amznum;
  $.rssnum = $.getdata("evil_rssnum") * 1 || $.rssnum;
  $.zmznum = $.getdata("evil_zmznum") * 1 || $.zmznum;
  $.time = $.getdata("evil_time") * 1000 || $.time * 1000;
  $.log("监控关键词 " + keyword);
  $.log("刷新时间 " + $.refreshtime + "小时");
  $.log("此次运行时间戳 " + $.nowtime);
  $.log("上次保存时间戳 " + $.savedtime);
  $.log("间隔 " + (minus / 3600000).toFixed(2) + "小时");
  $.log("监控rss链接 " + rsslink);
  $.log("获取rss订阅 " + $.rss);
  $.log("分开推送rss内容 " + $.splitpushrss);
  $.log("忽略关键词获取rss最新内容 " + $.pushnewrss);
  $.log("获取rss数量 " + $.rssnum + "个");
  $.log("获取微博热搜 " + $.weibo);
  $.log("分开推送微博内容 " + $.splitpushwb);
  $.log("忽略关键词获取微博最热内容 " + $.pushnewwb);
  $.log("获取微博热搜数量 " + $.wbnum + "个");
  $.log("获取知乎热榜 " + $.zhihu);
  $.log("分开推送知乎内容 " + $.splitpushzh);
  $.log("忽略关键词获取知乎最热内容 " + $.pushnewzh);
  $.log("获取知乎热榜数量 " + $.zhnum + "个");
  $.log("获取百度风云榜 " + $.baidu);
  $.log("分开推送百度内容 " + $.splitpushbd);
  $.log("忽略关键词获取百度最热内容 " + $.pushnewbd);
  $.log("获取百度风云榜数量 " + $.bdnum + "个");
  $.log("获取B站榜单 " + $.bilibili);
  $.log("分开推送B站内容 " + $.splitpushbl);
  $.log("忽略关键词获取B站最热内容 " + $.pushnewbl);
  $.log("获取B站日榜数量 " + $.blnum + "个");
  $.log("获取豆瓣榜单 " + $.douban);
  $.log("分开推送豆瓣内容 " + $.splitpushdb);
  $.log("忽略关键词获取豆瓣最热内容 " + $.pushnewdb);
  $.log("获取豆瓣榜单数量 " + $.dbnum + "个");
  $.log("获取抖音榜单 " + $.douyin);
  $.log("分开推送抖音内容 " + $.splitpushdy);
  $.log("忽略关键词获取抖音最热内容 " + $.pushnewdy);
  $.log("获取抖音榜单数量 " + $.dynum + "个");
  $.log("获取36氪榜单 " + $.k36);
  $.log("分开推送36氪内容 " + $.splitpushk36);
  $.log("忽略关键词获取36氪最热内容 " + $.pushnewk36);
  $.log("获取36氪榜单数量 " + $.k36num + "个");
  $.log("获取Kindle图书榜单 " + $.amazon);
  $.log("分开推送Kindle图书内容 " + $.splitpushamz);
  $.log("忽略关键词获取Kindle图书最热内容 " + $.pushnewamz);
  $.log("获取Kindle图书榜单数量 " + $.amznum + "个");
  $.log("获取人人影视榜单 " + $.zmz);
  $.log("分开推送人人影视内容 " + $.splitpushzmz);
  $.log("忽略关键词获取人人影视最新内容 " + $.pushnewzmz);
  $.log("获取人人影视榜单数量 " + $.zmznum + "个");
  if ($.getdata("evil_cltz") == "1") {
    $.log("调用迅雷离线");
  } else if ($.getdata("evil_cltz") == "2") {
    $.log("调用115离线");
  } else if ($.getdata("evil_cltz") == "3") {
    $.log("调用袋鼠下载");
  } else if ($.getdata("evil_cltz") == "4") {
    $.log("调用闪电下载");
  }
  $.link =
    "shortcuts://x-callback-url/run-shortcut?name=%E7%A3%81%E5%8A%9B%E7%A6%BB%E7%BA%BF&input=";
  $.log("附带跳转链接 " + $.attachurl + "\n");
}

function gethotsearch() {
  $.log("开始获取微博榜单...");
  return new Promise((resolve) => {
    const wbRequest = {
      url:
        "https://m.weibo.cn/api/container/getIndex?containerid=106003%26filter_type%3Drealtimehot",
    };
    $.get(wbRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
          var body = response.body;
          var obj = JSON.parse(body);
          if (
            obj.hasOwnProperty("errmsg") ||
            obj.data.cards == undefined ||
            obj.data.cards == null
          ) {
            $.msg(
              $.name,
              "🚨获取微博榜单出现错误",
              `⚠️原因：${obj.errmsg}\n可稍后重试，若问题依旧可联系作者`
            );
            resolve();
            return;
          }
          var group = obj.data.cards[0]["card_group"];
          var num = group.length;
          for (var i = 0; i < num; i++) {
            var item = group[i].desc;
            var urllong = group[i].scheme;
            var content = urllong.match(new RegExp(/q%3D.*?&isnewpage/));
            var con = JSON.stringify(content);
            var newcon = con.slice(2, -12);
            var postcon = newcon.replace("q%3D", "q=");
            var url = "sinaweibo://searchall?" + postcon;
            itemswb.push(item);
            urlswb.push(url);
          }
          $.log("微博热搜获取成功✅\n" + itemswb);
          if ($.pushnewwb == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontenturl(
                $.splitpushwb,
                "微博",
                resultwb,
                openurlwb,
                keyword[j],
                itemswb,
                urlswb
              );
            }
          } else {
            gethotcontenturl(
              $.splitpushwb,
              "微博",
              resultwb,
              openurlwb,
              $.wbnum,
              itemswb,
              urlswb
            );
          }
          if (resultwb.length != 0) {
            if ($.splitpushwb == true) {
              splitpushnotify(resultwb, openurlwb);
            } else {
              mergepushnotify(resultwb);
            }
          }
          resolve();
        } else {
          $.log("获取微博热搜出现错误❌以下详情：\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取微博热搜出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function gethotlist() {
  $.log("开始获取知乎榜单...");
  return new Promise((resolve) => {
    const zhRequest = {
      url:
        "https://api.zhihu.com/topstory/hot-lists/total?limit=10&reverse_order=0",
    };
    $.get(zhRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
          var body = response.body;
          var obj = JSON.parse(body);
          if (
            obj.hasOwnProperty("errmsg") ||
            obj.data == undefined ||
            obj.data == null
          ) {
            $.msg(
              $.name,
              "🚨获取知乎榜单出现错误",
              `⚠️原因：${obj.errmsg}\n可稍后重试，若问题依旧可联系作者`
            );
            resolve();
            return;
          }
          var group = obj.data;
          var num = group.length;
          for (var i = 0; i < num; i++) {
            var item = group[i].target.title;
            var oriurl = group[i].target.url;
            var url = oriurl.replace("https://api.zhihu.com/", "zhihu://");
            itemszh.push(item);
            urlszh.push(url);
          }
          $.log("知乎热榜获取成功✅\n" + itemszh);
          if ($.pushnewzh == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontenturl(
                $.splitpushzh,
                "知乎",
                resultzh,
                openurlzh,
                keyword[j],
                itemszh,
                urlszh
              );
            }
          } else {
            gethotcontenturl(
              $.splitpushzh,
              "知乎",
              resultzh,
              openurlzh,
              $.zhnum,
              itemszh,
              urlszh
            );
          }
          if (resultzh.length != 0) {
            if ($.splitpushzh == true) {
              splitpushnotify(resultzh, openurlzh);
            } else {
              mergepushnotify(resultzh);
            }
          }
          resolve();
        } else {
          $.log("获取知乎热榜出现错误❌以下详情：\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取知乎热榜出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function getfylist() {
  $.log("开始获取百度榜单...");
  return new Promise((resolve) => {
    const bdRequest = {
      url: "http://top.baidu.com/mobile_v2/buzz?b=1&c=515",
    };
    $.get(bdRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
          var body = response.body;
          var obj = JSON.parse(body);
          if (
            obj.hasOwnProperty("errmsg") ||
            obj.result.descs == undefined ||
            obj.result.descs == null
          ) {
            $.msg(
              $.name,
              "🚨获取百度榜单出现错误",
              `⚠️原因：${obj.errmsg}\n可稍后重试，若问题依旧可联系作者`
            );
            resolve();
            return;
          }
          var group = obj.result.descs;
          var num = group.length;
          for (var i = 0; i < num; i++) {
            var originitem = group[i].content;
            if (originitem == undefined) {
              continue;
            }
            var item = originitem.data[0].title;
            if (item == undefined) {
              continue;
            }
            var url = originitem.data[0].originlink;
            if (url == undefined) {
              continue;
            }
            itemsbd.push(item);
            urlsbd.push(url);
          }
          $.log("百度风云榜获取成功✅\n" + itemsbd);
          if ($.pushnewbd == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontenturl(
                $.splitpushbd,
                "百度",
                resultbd,
                openurlbd,
                keyword[j],
                itemsbd,
                urlsbd
              );
            }
          } else {
            gethotcontenturl(
              $.splitpushbd,
              "百度",
              resultbd,
              openurlbd,
              $.bdnum,
              itemsbd,
              urlsbd
            );
          }
          if (resultbd.length != 0) {
            if ($.splitpushbd == true) {
              splitpushnotify(resultbd, openurlbd);
            } else {
              mergepushnotify(resultbd);
            }
          }
          resolve();
        } else {
          $.log("获取百度风云榜出现错误❌以下详情：\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取百度风云榜出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function getbllist() {
  $.log("开始获取B站日榜...");
  return new Promise((resolve) => {
    const blRequest = {
      url: "https://app.bilibili.com/x/v2/rank/region?rid=" + $.rid,
    };
    $.get(blRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
          var body = response.body;
          var obj = JSON.parse(body);
          if (
            obj.hasOwnProperty("errmsg") ||
            obj.data == undefined ||
            obj.data == null
          ) {
            $.msg(
              $.name,
              "🚨获取B站榜单出现错误",
              `⚠️原因：${obj.errmsg}\n可稍后重试，若问题依旧可联系作者`
            );
            resolve();
            return;
          }
          var group = obj.data;
          var num = group.length;
          for (var i = 0; i < num; i++) {
            var item = group[i].title;
            var url = group[i].uri;
            var cover = group[i].cover;
            itemsbl.push(item);
            urlsbl.push(url);
            coversbl.push(cover);
          }
          $.log("B站日榜获取成功✅\n" + itemsbl);
          if ($.pushnewbl == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontentmedia(
                $.splitpushbl,
                "B站",
                resultbl,
                openurlbl,
                mediaurlbl,
                keyword[j],
                itemsbl,
                urlsbl,
                coversbl
              );
            }
          } else {
            gethotcontentmedia(
              $.splitpushbl,
              "B站",
              resultbl,
              openurlbl,
              mediaurlbl,
              $.blnum,
              itemsbl,
              urlsbl,
              coversbl
            );
          }
          if (resultbl.length != 0) {
            if ($.splitpushbl == true) {
              splitpushnotifymedia(resultbl, openurlbl, mediaurlbl);
            } else {
              mergepushnotify(resultbl);
            }
          }
          resolve();
        } else {
          $.log("获取B站日榜出现错误❌以下详情:\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取B站日榜出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function getdblist() {
  $.log("开始获取豆瓣榜单...");
  return new Promise((resolve) => {
    const dbheader = {
      Referer: `https://m.douban.com/pwa/cache_worker`,
    };
    const dbRequest = {
      url:
        "https://m.douban.com/rexxar/api/v2/subject_collection/movie_real_time_hotest/items?start=0&count=50&items_only=1&for_mobile=1",
      headers: dbheader,
    };
    $.get(dbRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);

        if (response.statusCode == 200) {
          var body = response.body;
          var obj = JSON.parse(body);
          if (
            obj.hasOwnProperty("errmsg") ||
            obj["subject_collection_items"] == undefined ||
            obj["subject_collection_items"] == null
          ) {
            $.msg(
              $.name,
              "🚨获取豆瓣榜单出现错误",
              `⚠️原因：${obj.errmsg}\n可稍后重试，若问题依旧可联系作者`
            );
            resolve();
            return;
          }
          var group = obj["subject_collection_items"];
          var num = group.length;
          for (var i = 0; i < num; i++) {
            var title = group[i].title;
            var subtitle = group[i]["card_subtitle"];
            var rating = group[i].rating;
            if (rating == null) continue;
            var star = rating["star_count"];
            var item =
              title + "\n" + "评分：" + star + "星🌟" + "\n" + subtitle;
            var url = group[i].url;
            var cover = group[i].cover.url;
            itemsdb.push(item);
            urlsdb.push(url);
            coversdb.push(cover);
          }
          $.log("豆瓣榜单获取成功✅\n" + itemsdb);
          if ($.pushnewdb == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontentmedia(
                $.splitpushdb,
                "豆瓣",
                resultdb,
                openurldb,
                mediaurldb,
                keyword[j],
                itemsdb,
                urlsdb,
                coversdb
              );
            }
          } else {
            gethotcontentmedia(
              $.splitpushdb,
              "豆瓣",
              resultdb,
              openurldb,
              mediaurldb,
              $.dbnum,
              itemsdb,
              urlsdb,
              coversdb
            );
          }
          if (resultdb.length != 0) {
            if ($.splitpushdb == true) {
              splitpushnotifymedia(resultdb, openurldb, mediaurldb);
            } else {
              mergepushnotify(resultdb);
            }
          }
          resolve();
        } else {
          $.log("获取豆瓣榜单出现错误❌以下详情:\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取豆瓣榜单出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function getdylist() {
  $.log("开始获取抖音榜单...");
  return new Promise((resolve) => {
    const dyRequest = {
      url: "https://tophub.today/n/DpQvNABoNE",
    };
    $.get(dyRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);

        if (response.statusCode == 200) {
          var body = response.body;
          parsehtml(body, itemsdy, urlsdy);
          $.log("抖音榜单获取成功✅\n" + itemsdy);
          if ($.pushnewdy == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontenturl(
                $.splitpushdy,
                "抖音",
                resultdy,
                openurldy,
                keyword[j],
                itemsdy,
                urlsdy
              );
            }
          } else {
            gethotcontenturl(
              $.splitpushdy,
              "抖音",
              resultdy,
              openurldy,
              $.dynum,
              itemsdy,
              urlsdy
            );
          }
          if (resultdy.length != 0) {
            if ($.splitpushdy == true) {
              splitpushnotify(resultdy, openurldy);
            } else {
              mergepushnotify(resultdy);
            }
          }
          resolve();
        } else {
          $.log("获取抖音榜单出现错误❌以下详情:\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取抖音榜单出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function getk36list() {
  $.log("开始获取36氪榜单...");
  return new Promise((resolve) => {
    const k36Request = {
      url: "https://tophub.today/n/Q1Vd5Ko85R",
    };
    $.get(k36Request, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
          var body = response.body;
          parsehtml(body, itemsk36, urlsk36);
          $.log("36氪榜单获取成功✅\n" + itemsk36);
          if ($.pushnewk36 == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontenturl(
                $.splitpushk36,
                "36氪",
                resultk36,
                openurlk36,
                keyword[j],
                itemsk36,
                urlsk36
              );
            }
          } else {
            gethotcontenturl(
              $.splitpushk36,
              "36氪",
              resultk36,
              openurlk36,
              $.k36num,
              itemsk36,
              urlsk36
            );
          }
          if (resultk36.length != 0) {
            if ($.splitpushk36 == true) {
              splitpushnotify(resultk36, openurlk36);
            } else {
              mergepushnotify(resultk36);
            }
          }
          resolve();
        } else {
          $.log("获取36氪榜单出现错误❌以下详情:\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取36氪榜单出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function getamazonlist() {
  $.log("开始获取Kindle图书榜单...");
  return new Promise((resolve) => {
    const amazonRequest = {
      url: "https://www.amazon.cn/gp/bestsellers/digital-text",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1",
      },
    };
    $.get(amazonRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
          var body = response.body;
          parsehtmlkindle(body, itemsamz, urlsamz, coversamz);
          $.log("Kindle图书榜单获取成功✅\n" + itemsamz);
          if ($.pushnewamz == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontentmedia(
                $.splitpushamz,
                "Kindle书单",
                resultamz,
                openurlamz,
                mediaurlamz,
                keyword[j],
                itemsamz,
                urlsamz,
                coversamz
              );
            }
          } else {
            gethotcontentmedia(
              $.splitpushamz,
              "Kindle书单",
              resultamz,
              openurlamz,
              mediaurlamz,
              $.amznum,
              itemsamz,
              urlsamz,
              coversamz
            );
          }
          if (resultamz.length != 0) {
            if ($.splitpushamz == true) {
              splitpushnotifymedia(resultamz, openurlamz, mediaurlamz);
            } else {
              mergepushnotify(resultamz);
            }
          }
          resolve();
        } else {
          $.log("获取Kindle图书榜单出现错误❌以下详情:\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取Kindle图书榜单出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function getzmzlist() {
  $.log("开始获取人人影视榜单...");
  return new Promise((resolve) => {
    const zmzRequest = {
      url: `http://file.apicvn.com/file/list?page=1&order=create_time&sort=desc`,
      headers: {
        Host: "file.apicvn.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0",
      },
    };
    $.get(zmzRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
          var body = response.body;
          var obj = JSON.parse(body);
          for (var i = 0; i < obj.length; i++) {
            var item = obj[i]["file_name"];
            var oriurl = obj[i]["magnet_url"];
            if ($.getdata("evil_cltz") == "1") {
              var posturl = "xunlei｜" + oriurl;
            } else if ($.getdata("evil_cltz") == "2") {
              posturl = "115｜" + oriurl;
            } else if ($.getdata("evil_cltz") == "3") {
              posturl = "daishu｜" + oriurl;
            } else if ($.getdata("evil_cltz") == "4") {
              posturl = "shandian｜" + oriurl;
            } else {
              posturl = "xunlei｜" + oriurl;
            }
            var encodeurl = base64.encode(posturl);
            var url = $.link + encodeurl;
            var size = (obj[i]["file_size"] / 1048576).toFixed(2);
            var finalsize = size + "MB";
            if (size > 1024) {
              size = (obj[i]["file_size"] / 1073741824).toFixed(2);
              finalsize = size + "GB";
            }
            if (oriurl == "") {
              var postitem = "🧲未找到｜" + item;
            } else {
              postitem = item;
            }
            var finalitem = postitem + "\n📦大小：" + finalsize;
            itemszmz.push(finalitem);
            urlszmz.push(url);
          }
          $.log("人人影视榜单获取成功✅\n" + itemszmz);
          if ($.pushnewzmz == false) {
            for (var j = 0; j < keyword.length; j++) {
              getkeywordcontenturl(
                $.splitpushzmz,
                "人人影视",
                resultzmz,
                openurlzmz,
                keyword[j],
                itemszmz,
                urlszmz
              );
            }
          } else {
            gethotcontenturl(
              $.splitpushzmz,
              "人人影视",
              resultzmz,
              openurlzmz,
              $.zmznum,
              itemszmz,
              urlszmz
            );
          }
          if (resultzmz.length != 0) {
            if ($.splitpushzmz == true) {
              splitpushnotify(resultzmz, openurlzmz);
            } else {
              mergepushnotify(resultzmz);
            }
          }
          resolve();
        } else {
          $.log("获取人人影视榜单出现错误❌以下详情:\n");
          $.log(JSON.stringify(response));
        }
        resolve();
      } catch (e) {
        $.log("获取人人影视榜单出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function getrsslist(
  rsslink,
  resultrss,
  openurlrss,
  mediaurlrss,
  titlerss,
  itemsrss,
  urlsrss,
  coversrss
) {
  $.log("开始获取RSS内容...");
  resultrss = [];
  openurlrss = [];
  mediaurlrss = [];
  titlerss = [];
  itemsrss = [];
  urlsrss = [];
  coversrss = [];
  return new Promise((resolve) => {
    const rssRequest = {
      url:
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(rsslink),
    };
    $.get(rssRequest, (error, response, data) => {
      try {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
          var body = response.body;
          var obj = JSON.parse(body);
          titlerss = obj.feed.title;
          var items = obj.items;
          var num = items.length;
          for (var i = 0; i < num; i++) {
            var title = items[i].title;
            var url = items[i].link;
            if (items[i].thumbnail != null) {
              var cover = items[i].thumbnail;
            } else {
              cover =
                "https://raw.githubusercontent.com/58xinian/icon/master/hot.png";
            }
            if (items[i].description != null) {
              var des = items[i].description;
              var postdes = des
                .replace(new RegExp(/\\n/, "gm"), "")
                .replace(new RegExp(/\<.*?\>/, "gm"), "");
              var finaldes = postdes.trim();
              var description = "\n🔎详情：" + finaldes.slice(0, 50);
            } else {
              description = "\n🔎详情：暂无";
            }
            if (items[i].author == "") {
              var author = "\n👨‍💻作者：暂无";
            } else {
              author = "\n👨‍💻作者：" + items[i].author;
            }
            var item = title + author + description;
            itemsrss.push(item);
            urlsrss.push(url);
            coversrss.push(cover);
          }
          $.log("RSS内容获取成功✅\n" + itemsrss);
        } else {
          $.log(JSON.stringify(response.body));
          $.log("RSS解析出错❌请检查订阅稍后重试⚠️本次将使用正则。");
          return new Promise((resolve) => {
            const rssregRequest = {
              url: rsslink,
            };
            $.get(rssregRequest, (error, response, data) => {
              if (error) throw new Error(error);
              if (response.statusCode == 200) {
                var body = response.body;
                parsehtmlrss(body, titlerss, itemsrss, urlsrss, coversrss);
                $.log("RSS内容正则获取成功✅\n" + itemsrss);
                resolve();
              } else {
                $.log("获取RSS内容出现错误❌以下详情:\n");
                $.log(JSON.stringify(body));
                resolve();
              }
            });
          });
        }
        if ($.pushnewrss == false) {
          for (var j = 0; j < keyword.length; j++) {
            getkeywordcontentmedia(
              $.splitpushrss,
              titlerss,
              resultrss,
              openurlrss,
              mediaurlrss,
              keyword[j],
              itemsrss,
              urlsrss,
              coversrss
            );
          }
        } else {
          gethotcontentmedia(
            $.splitpushrss,
            titlerss,
            resultrss,
            openurlrss,
            mediaurlrss,
            $.rssnum,
            itemsrss,
            urlsrss,
            coversrss
          );
        }
        if (resultrss.length != 0) {
          checkrssresult = true;
          if ($.splitpushrss == true) {
            splitpushnotifymedia(resultrss, openurlrss, mediaurlrss);
          } else {
            mergepushnotify(resultrss);
          }
        }
        resolve();
      } catch (e) {
        $.log("获取RSS内容出现错误❌原因：\n");
        $.log(JSON.stringify(e, Object.getOwnPropertyNames(e)));
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, $.time);
    });
  });
}

function parsehtmlrss(str, title, items, urls, covers) {
  var text = JSON.stringify(str);
  //title表达式
  var alltitle = /channel\>(\\\S.*?|)\<title\>(\<\!\[CDATA\[.*?\]|.*?)\>/;
  //括号表达式
  var getbracket = /CDATA\[.*?]/;
  //箭头表达式
  var getarrow = /title\>.*?\</;
  //获取title
  var pretitle = text.match(alltitle);
  //检测括号
  var kuotitle = pretitle[0].match(getbracket);
  //检测箭头
  var jiantitle = pretitle[0].match(getarrow);
  title.splice(0);
  if (kuotitle != null) {
    title.push(kuotitle[0].slice(6, -1));
  } else {
    title.push(jiantitle[0].slice(6, -1));
  }
  //item表达式
  var content = /item\>.*?\<\/item/g;
  var detail = text.match(content);
  for (var i = 0; i < detail.length; i++) {
    //subtitle表达式
    var subtitle = /title\>(\<\!\[CDATA\[.*?\]|.*?)\>\</;
    //description表达式
    var allwords = /description\>(\<\!\[CDATA\[.*?\]|\S.*?)\>\</;
    //openurl的link表达式
    var allurls = /link\>http.*?\</;
    //mediaurl的link表达式
    var allcovers = /img src=(\\\"|\S).*?(jpg|png|&#34)/;
    //筛选http
    var getcovers = /http.*?(jpg|png|&#34)/;
    //获取subtitle
    var presubtitle = detail[i].match(subtitle);
    if (presubtitle != null) {
      //检测括号
      var postsubtitle = presubtitle[0].match(getbracket);
      if (postsubtitle != null) {
        var finalsubtitle = postsubtitle[0].slice(6, -1);
      } else {
        finalsubtitle = presubtitle[0].slice(6, -9);
      }
      //获取description
      var prewords = detail[i].match(allwords);
      //检测括号
      var postwords = prewords[0].match(getbracket);
      if (postwords != null) {
        var getwords = postwords[0].slice(6, -1);
      } else {
        getwords = "未获取";
      }
      var finalwords = getwords
        .replace(new RegExp(/\\n/, "gm"), "")
        .replace(new RegExp(/\<.*?\>/, "gm"), "");
      if (finalwords.length != 0) {
        var item = finalsubtitle + "\n🔍详情  " + finalwords;
        items.push(item);
      } else {
        var item = finalsubtitle + "\n🔍详情  暂无";
        items.push(item);
      }
      var preurls = detail[i].match(allurls);
      var posturls = preurls[0].slice(5, -1);
      urls.push(posturls);
      var precovers = detail[i].match(allcovers);
      if (precovers != null) {
        var postcovers = precovers[0].match(getcovers);
        covers.push(postcovers[0]);
      } else {
        covers.push(
          "https://raw.githubusercontent.com/58xinian/icon/master/hot.png"
        );
      }
    } else {
      continue;
    }
  }
}

function parsehtml(str, items, urls) {
  var text = JSON.stringify(str);
  var name = /itemid\=\\\"\d\d\d\d\d\d\d\d\\\"\>.*?\<\/a\>\<\/td\>/g;
  var link = /al\\\"\>\<a href\=\\\".*?\\\"/g;
  var preitem = text.match(name);
  var preurl = text.match(link);
  for (var i = 0; i < 20; i++) {
    var postitem = preitem[i].slice(20, -9);
    var posturl = preurl[i].slice(15, -2);
    if (postitem.indexOf("<i class") != -1) {
      continue;
    }
    items.push(postitem);
    urls.push(posturl);
  }
}

function parsehtmlkindle(str, items, urls, covers) {
  var text = JSON.stringify(str);
  var name = /\<img alt\=\\\".*?\\\"/g;
  var link = /href\=\\\"\/dp.*?\\\"/g;
  var img = /\" src\=\\\"https.*?SR110\,110\_\.jpg/g;
  var price1 = /a-size-large\\\"\>.*?\</g;
  var price2 = /p13n-sc-hero-cents\\\"\>.*?\</g;
  var preitem = text.match(name);
  var preurl = text.match(link);
  var preimg = text.match(img);
  var preprice1 = text.match(price1);
  var preprice2 = text.match(price2);
  for (var i = 0; i < 20; i++) {
    var postitem = preitem[i].slice(11, -2);
    var posturl = preurl[i].slice(7, -2);
    var addurl = "https://www.amazon.cn" + posturl;
    var imgurl = preimg[i].slice(8);
    var okurl = imgurl.replace("UL110_SR110,110_.jpg", "UL330_SR330,330_.jpg");
    var postprice1 = preprice1[i].slice(15, -1);
    var postprice2 = preprice2[i].slice(21, -1);
    var content =
      postitem + "\n" + "💰价格  " + postprice1 + "." + postprice2 + "¥";
    items.push(content);
    urls.push(addurl);
    covers.push(okurl);
  }
}

function getkeywordcontenturl(
  splitpush,
  text,
  result,
  openurl,
  key,
  items,
  urls
) {
  if (splitpush == false) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].indexOf(key) != -1 && saveditem.indexOf(items[i]) == -1) {
        if ($.attachurl == true) {
          result.push(
            `🎉"${text}"的关键词"${key}"更新\n第${i + 1}名：${items[i]}\n${
              urls[i]
            }`
          );
        } else {
          result.push(
            `🎉"${text}"的关键词"${key}"更新\n第${i + 1}名：${items[i]}`
          );
        }
        saveditem.push(items[i]);
      }
    }
  } else {
    for (i = 0; i < items.length; i++) {
      if (items[i].indexOf(key) != -1 && saveditem.indexOf(items[i]) == -1) {
        if ($.attachurl == true) {
          result.push(
            `🎉"${text}"的关键词"${key}"更新\n第${i + 1}名：${items[i]}\n${
              urls[i]
            }`
          );
        } else {
          result.push(
            `🎉"${text}"的关键词"${key}"更新\n第${i + 1}名：${items[i]}`
          );
        }
        openurl.push(urls[i]);
        saveditem.push(items[i]);
      }
    }
  }
}

function gethotcontenturl(splitpush, text, result, openurl, num, items, urls) {
  if (splitpush == false) {
    for (var i = 0; i < num; i++) {
      if ($.attachurl == true) {
        if (i == 0) {
          result.push(
            `🎉"${text}"的热门排行\n第${i + 1}名：${items[i]}\n${urls[i]}`
          );
        } else {
          result.push(`第${i + 1}名：${items[i]}\n${urls[i]}`);
        }
      } else {
        if (i == 0) {
          result.push(`🎉"${text}"的热门排行\n第${i + 1}名：${items[i]}`);
        } else {
          result.push(`第${i + 1}名：${items[i]}`);
        }
      }
    }
  } else {
    for (i = 0; i < num; i++) {
      if ($.attachurl == true) {
        result.push(
          `🎉"${text}"的热门排行\n第${i + 1}名：${items[i]}\n${urls[i]}`
        );
      } else {
        result.push(`🎉"${text}"的热门排行\n第${i + 1}名：${items[i]}`);
      }
      openurl.push(urls[i]);
    }
  }
}

function getkeywordcontentmedia(
  splitpush,
  text,
  result,
  openurl,
  mediaurl,
  key,
  items,
  urls,
  covers
) {
  if (splitpush == false) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].indexOf(key) != -1 && saveditem.indexOf(items[i]) == -1) {
        if ($.attachurl == true) {
          result.push(
            `🎉"${text}"的关键词"${key}"更新\n第${i + 1}名：${items[i]}\n${
              urls[i]
            }`
          );
        } else {
          result.push(
            `🎉"${text}"的关键词"${key}"更新\n第${i + 1}名：${items[i]}`
          );
        }
        saveditem.push(items[i]);
      }
    }
  } else {
    for (i = 0; i < items.length; i++) {
      if (items[i].indexOf(key) != -1 && saveditem.indexOf(items[i]) == -1) {
        if ($.attachurl == true) {
          result.push(
            `🎉"${text}"的关键词"${key}"更新\n第${i + 1}名：${items[i]}\n${
              urls[i]
            }`
          );
        } else {
          result.push(
            `🎉"${text}"的关键词"${key}"更新\n第${i + 1}名：${items[i]}`
          );
        }
        openurl.push(urls[i]);
        mediaurl.push(covers[i]);
        saveditem.push(items[i]);
      }
    }
  }
}

function gethotcontentmedia(
  splitpush,
  text,
  result,
  openurl,
  mediaurl,
  num,
  items,
  urls,
  covers
) {
  if (splitpush == false) {
    for (var i = 0; i < num; i++) {
      if ($.attachurl == true) {
        if (i == 0) {
          result.push(
            `🎉"${text}"的热门排行\n第${i + 1}名：${items[i]}\n${urls[i]}`
          );
        } else {
          result.push(`第${i + 1}名：${items[i]}\n${urls[i]}`);
        }
      } else {
        if (i == 0) {
          result.push(`🎉"${text}"的热门排行\n第${i + 1}名：${items[i]}`);
        } else {
          result.push(`第${i + 1}名：${items[i]}`);
        }
      }
    }
  } else {
    for (i = 0; i < num; i++) {
      if ($.attachurl == true) {
        result.push(
          `🎉"${text}"的热门排行\n第${i + 1}名：${items[i]}\n${urls[i]}`
        );
      } else {
        result.push(`🎉"${text}"的热门排行\n第${i + 1}名：${items[i]}`);
      }
      openurl.push(urls[i]);
      mediaurl.push(covers[i]);
    }
  }
}

function mergepushnotify(result) {
  $.this_msg = ``;
  for (var m = 0; m < result.length; m++) {
    if (m == 0) {
      $.this_msg += `${result[m]}`;
    } else {
      $.this_msg += `\n${result[m]}`;
    }
  }
  $.msg("热门监控", "", $.this_msg);
}

function splitpushnotify(result, openurl) {
  for (var m = 0; m < result.length; m++) {
    $.this_msg = ``;
    $.this_msg += `${result[m]}`;
    $.msg("热门监控", "", $.this_msg, { "open-url": openurl[m] });
  }
}

function splitpushnotifymedia(result, openurl, mediaurl) {
  for (var m = 0; m < result.length; m++) {
    $.this_msg = ``;
    $.this_msg += `${result[m]}`;
    $.msg("热门监控", "", $.this_msg, {
      "open-url": openurl[m],
      "media-url": mediaurl[m],
    });
  }
}

function last() {
  if (
    resultwb.length == 0 &&
    resultzh.length == 0 &&
    resultbd.length == 0 &&
    resultbl.length == 0 &&
    resultdb.length == 0 &&
    resultdy.length == 0 &&
    resultk36.length == 0 &&
    resultamz.length == 0 &&
    //resultzmz.length == 0 &&
    checkrssresult == false
  ) {
    $.log(`\n😫您订阅的关键词"${keyword}"暂时没有更新`);
  }
  $.setdata(JSON.stringify(saveditem), "evil_saveditem");
}

function final() {
  if (
    $.weibo == false &&
    $.zhihu == false &&
    $.baidu == false &&
    $.bilibili == false &&
    $.douban == false &&
    $.douyin == false &&
    $.k36 == false &&
    $.amazon == false &&
    $.rss == false
    //$.zmz == false
  ) {
    $.msg(
      "热门监控",
      "哎呀！您关闭了全部的榜单😫",
      "请打开一个榜单监控再尝试哦😊"
    );
  }
}

/*function deluselessck() {
  $.setdata("", "evil_hotsearchurl");
  $.setdata("", "evil_hotsearchcookie");
  $.setdata("", "evil_zhihuurl");
  $.setdata("", "evil_zhihucookie");
  $.setdata("", "evil_baiduurl");
  $.setdata("", "evil_baiducookie");
  $.setdata("", "evil_bilibiurl");
  $.setdata("", "evil_bilibilicookie");
  $.setdata("", "evil_doubanurl");
  $.setdata("", "evil_doubancookie");
  $.log("\n已清除无用Cookie✅");
}

function getCookie() {
  if (
    $request &&
    $request.method != "OPTIONS" &&
    $request.url.match(/display\_time/)
  ) {
    const siurl = $request.url;
    $.log(siurl);
    const sicookie = JSON.stringify($request.headers);
    $.log(sicookie);
    $.setdata(siurl, url);
    $.setdata(sicookie, cookie);
    $.msg("热门监控", "", "获取微博热搜Cookie成功🎉");
  }
}*/

//From https://github.com/dankogai/js-base64
function Base64Code() {
  var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    t = (function (r) {
      for (var t = {}, e = 0, n = r.length; e < n; e++) t[r.charAt(e)] = e;
      return t;
    })(r),
    e = String.fromCharCode,
    n = function (r) {
      if (r.length < 2) {
        var t = r.charCodeAt(0);
        return t < 128
          ? r
          : t < 2048
          ? e(192 | (t >>> 6)) + e(128 | (63 & t))
          : e(224 | ((t >>> 12) & 15)) +
            e(128 | ((t >>> 6) & 63)) +
            e(128 | (63 & t));
      }
      t = 65536 + 1024 * (r.charCodeAt(0) - 55296) + (r.charCodeAt(1) - 56320);
      return (
        e(240 | ((t >>> 18) & 7)) +
        e(128 | ((t >>> 12) & 63)) +
        e(128 | ((t >>> 6) & 63)) +
        e(128 | (63 & t))
      );
    },
    c = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
    a = function (r) {
      return r.replace(c, n);
    },
    o = function (t) {
      var e = [0, 2, 1][t.length % 3],
        n =
          (t.charCodeAt(0) << 16) |
          ((t.length > 1 ? t.charCodeAt(1) : 0) << 8) |
          (t.length > 2 ? t.charCodeAt(2) : 0),
        c = [
          r.charAt(n >>> 18),
          r.charAt((n >>> 12) & 63),
          e >= 2 ? "=" : r.charAt((n >>> 6) & 63),
          e >= 1 ? "=" : r.charAt(63 & n),
        ];
      return c.join("");
    },
    h = function (r) {
      return r.replace(/[\s\S]{1,3}/g, o);
    };
  this.encode = function (r) {
    var t = "[object Uint8Array]" === Object.prototype.toString.call(r);
    return t ? r.toString("base64") : h(a(String(r)));
  };
  var u = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
    i = function (r) {
      switch (r.length) {
        case 4:
          var t =
              ((7 & r.charCodeAt(0)) << 18) |
              ((63 & r.charCodeAt(1)) << 12) |
              ((63 & r.charCodeAt(2)) << 6) |
              (63 & r.charCodeAt(3)),
            n = t - 65536;
          return e(55296 + (n >>> 10)) + e(56320 + (1023 & n));
        case 3:
          return e(
            ((15 & r.charCodeAt(0)) << 12) |
              ((63 & r.charCodeAt(1)) << 6) |
              (63 & r.charCodeAt(2))
          );
        default:
          return e(((31 & r.charCodeAt(0)) << 6) | (63 & r.charCodeAt(1)));
      }
    },
    A = function (r) {
      return r.replace(u, i);
    },
    g = function (r) {
      var n = r.length,
        c = n % 4,
        a =
          (n > 0 ? t[r.charAt(0)] << 18 : 0) |
          (n > 1 ? t[r.charAt(1)] << 12 : 0) |
          (n > 2 ? t[r.charAt(2)] << 6 : 0) |
          (n > 3 ? t[r.charAt(3)] : 0),
        o = [e(a >>> 16), e((a >>> 8) & 255), e(255 & a)];
      return (o.length -= [0, 0, 2, 1][c]), o.join("");
    },
    d = function (r) {
      return r.replace(/\S{1,4}/g, g);
    },
    l = function (r) {
      return A(d(r));
    };
  this.decode = function (r) {
    return l(
      String(r)
        .replace(/[-_]/g, function (r) {
          return "-" == r ? "+" : "/";
        })
        .replace(/[^A-Za-z0-9\+\/]/g, "")
    )
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<");
  };
}

//From chavyleung's Env.js
function Env(name, opts) {
  class Http {
    constructor(env) {
      this.env = env;
    }

    send(opts, method = "GET") {
      opts = typeof opts === "string" ? { url: opts } : opts;
      let sender = this.get;
      if (method === "POST") {
        sender = this.post;
      }
      return new Promise((resolve, reject) => {
        sender.call(this, opts, (err, resp, body) => {
          if (err) reject(err);
          else resolve(resp);
        });
      });
    }

    get(opts) {
      return this.send.call(this.env, opts);
    }

    post(opts) {
      return this.send.call(this.env, opts, "POST");
    }
  }

  return new (class {
    constructor(name, opts) {
      this.name = name;
      this.http = new Http(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = false;
      this.isNeedRewrite = false;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, opts);
      this.log("", `🔔${this.name}, 开始!`);
    }

    isNode() {
      return "undefined" !== typeof module && !!module.exports;
    }

    isQuanX() {
      return "undefined" !== typeof $task;
    }

    isSurge() {
      return "undefined" !== typeof $httpClient && "undefined" === typeof $loon;
    }

    isLoon() {
      return "undefined" !== typeof $loon;
    }

    toObj(str, defaultValue = null) {
      try {
        return JSON.parse(str);
      } catch {
        return defaultValue;
      }
    }

    toStr(obj, defaultValue = null) {
      try {
        return JSON.stringify(obj);
      } catch {
        return defaultValue;
      }
    }

    getjson(key, defaultValue) {
      let json = defaultValue;
      const val = this.getdata(key);
      if (val) {
        try {
          json = JSON.parse(this.getdata(key));
        } catch {}
      }
      return json;
    }

    setjson(val, key) {
      try {
        return this.setdata(JSON.stringify(val), key);
      } catch {
        return false;
      }
    }

    getScript(url) {
      return new Promise((resolve) => {
        this.get({ url }, (err, resp, body) => resolve(body));
      });
    }

    runScript(script, runOpts) {
      return new Promise((resolve) => {
        let httpapi = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        httpapi = httpapi ? httpapi.replace(/\n/g, "").trim() : httpapi;
        let httpapi_timeout = this.getdata(
          "@chavy_boxjs_userCfgs.httpapi_timeout"
        );
        httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20;
        httpapi_timeout =
          runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout;
        const [key, addr] = httpapi.split("@");
        const opts = {
          url: `http://${addr}/v1/scripting/evaluate`,
          body: {
            script_text: script,
            mock_type: "cron",
            timeout: httpapi_timeout,
          },
          headers: { "X-Key": key, Accept: "*/*" },
        };
        this.post(opts, (err, resp, body) => resolve(body));
      }).catch((e) => this.logErr(e));
    }

    loaddata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const curDirDataFilePath = this.path.resolve(this.dataFile);
        const rootDirDataFilePath = this.path.resolve(
          process.cwd(),
          this.dataFile
        );
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
        const isRootDirDataFile =
          !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
        if (isCurDirDataFile || isRootDirDataFile) {
          const datPath = isCurDirDataFile
            ? curDirDataFilePath
            : rootDirDataFilePath;
          try {
            return JSON.parse(this.fs.readFileSync(datPath));
          } catch (e) {
            return {};
          }
        } else return {};
      } else return {};
    }

    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const curDirDataFilePath = this.path.resolve(this.dataFile);
        const rootDirDataFilePath = this.path.resolve(
          process.cwd(),
          this.dataFile
        );
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
        const isRootDirDataFile =
          !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
        const jsondata = JSON.stringify(this.data);
        if (isCurDirDataFile) {
          this.fs.writeFileSync(curDirDataFilePath, jsondata);
        } else if (isRootDirDataFile) {
          this.fs.writeFileSync(rootDirDataFilePath, jsondata);
        } else {
          this.fs.writeFileSync(curDirDataFilePath, jsondata);
        }
      }
    }

    lodash_get(source, path, defaultValue = undefined) {
      const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
      let result = source;
      for (const p of paths) {
        result = Object(result)[p];
        if (result === undefined) {
          return defaultValue;
        }
      }
      return result;
    }

    lodash_set(obj, path, value) {
      if (Object(obj) !== obj) return obj;
      if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
      path
        .slice(0, -1)
        .reduce(
          (a, c, i) =>
            Object(a[c]) === a[c]
              ? a[c]
              : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}),
          obj
        )[path[path.length - 1]] = value;
      return obj;
    }

    getdata(key) {
      let val = this.getval(key);
      // 如果以 @
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key);
        const objval = objkey ? this.getval(objkey) : "";
        if (objval) {
          try {
            const objedval = JSON.parse(objval);
            val = objedval ? this.lodash_get(objedval, paths, "") : val;
          } catch (e) {
            val = "";
          }
        }
      }
      return val;
    }

    setdata(val, key) {
      let issuc = false;
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key);
        const objdat = this.getval(objkey);
        const objval = objkey
          ? objdat === "null"
            ? null
            : objdat || "{}"
          : "{}";
        try {
          const objedval = JSON.parse(objval);
          this.lodash_set(objedval, paths, val);
          issuc = this.setval(JSON.stringify(objedval), objkey);
        } catch (e) {
          const objedval = {};
          this.lodash_set(objedval, paths, val);
          issuc = this.setval(JSON.stringify(objedval), objkey);
        }
      } else {
        issuc = this.setval(val, key);
      }
      return issuc;
    }

    getval(key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(key);
      } else if (this.isQuanX()) {
        return $prefs.valueForKey(key);
      } else if (this.isNode()) {
        this.data = this.loaddata();
        return this.data[key];
      } else {
        return (this.data && this.data[key]) || null;
      }
    }

    setval(val, key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(val, key);
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(val, key);
      } else if (this.isNode()) {
        this.data = this.loaddata();
        this.data[key] = val;
        this.writedata();
        return true;
      } else {
        return (this.data && this.data[key]) || null;
      }
    }

    initGotEnv(opts) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      if (opts) {
        opts.headers = opts.headers ? opts.headers : {};
        if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
          opts.cookieJar = this.ckjar;
        }
      }
    }

    get(opts, callback = () => {}) {
      if (opts.headers) {
        delete opts.headers["Content-Type"];
        delete opts.headers["Content-Length"];
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {};
          Object.assign(opts.headers, { "X-Surge-Skip-Scripting": false });
        }
        $httpClient.get(opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body;
            resp.statusCode = resp.status;
          }
          callback(err, resp, body);
        });
      } else if (this.isQuanX()) {
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {};
          Object.assign(opts.opts, { hints: false });
        }
        $task.fetch(opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp;
            callback(null, { status, statusCode, headers, body }, body);
          },
          (err) => callback(err)
        );
      } else if (this.isNode()) {
        this.initGotEnv(opts);
        this.got(opts)
          .on("redirect", (resp, nextOpts) => {
            try {
              if (resp.headers["set-cookie"]) {
                const ck = resp.headers["set-cookie"]
                  .map(this.cktough.Cookie.parse)
                  .toString();
                if (ck) {
                  this.ckjar.setCookieSync(ck, null);
                }
                nextOpts.cookieJar = this.ckjar;
              }
            } catch (e) {
              this.logErr(e);
            }
            // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
          })
          .then(
            (resp) => {
              const { statusCode: status, statusCode, headers, body } = resp;
              callback(null, { status, statusCode, headers, body }, body);
            },
            (err) => {
              const { message: error, response: resp } = err;
              callback(error, resp, resp && resp.body);
            }
          );
      }
    }

    post(opts, callback = () => {}) {
      // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
      if (opts.body && opts.headers && !opts.headers["Content-Type"]) {
        opts.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
      if (opts.headers) delete opts.headers["Content-Length"];
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {};
          Object.assign(opts.headers, { "X-Surge-Skip-Scripting": false });
        }
        $httpClient.post(opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body;
            resp.statusCode = resp.status;
          }
          callback(err, resp, body);
        });
      } else if (this.isQuanX()) {
        opts.method = "POST";
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {};
          Object.assign(opts.opts, { hints: false });
        }
        $task.fetch(opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp;
            callback(null, { status, statusCode, headers, body }, body);
          },
          (err) => callback(err)
        );
      } else if (this.isNode()) {
        this.initGotEnv(opts);
        const { url, ..._opts } = opts;
        this.got.post(url, _opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp;
            callback(null, { status, statusCode, headers, body }, body);
          },
          (err) => {
            const { message: error, response: resp } = err;
            callback(error, resp, resp && resp.body);
          }
        );
      }
    }
    /**
     *
     * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
     *    :$.time('yyyyMMddHHmmssS')
     *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
     *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
     * @param {string} fmt 格式化参数
     * @param {number} 可选: 根据指定时间戳返回格式化日期
     *
     */
    time(fmt, ts = null) {
      const date = ts ? new Date(ts) : new Date();
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    }

    /**
     * 系统通知
     *
     * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
     *
     * 示例:
     * $.msg(title, subt, desc, 'twitter://')
     * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     *
     * @param {*} title 标题
     * @param {*} subt 副标题
     * @param {*} desc 通知详情
     * @param {*} opts 通知参数
     *
     */
    msg(title = name, subt = "", desc = "", opts) {
      const toEnvOpts = (rawopts) => {
        if (!rawopts) return rawopts;
        if (typeof rawopts === "string") {
          if (this.isLoon()) return rawopts;
          else if (this.isQuanX()) return { "open-url": rawopts };
          else if (this.isSurge()) return { url: rawopts };
          else return undefined;
        } else if (typeof rawopts === "object") {
          if (this.isLoon()) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts["open-url"];
            let mediaUrl = rawopts.mediaUrl || rawopts["media-url"];
            return { openUrl, mediaUrl };
          } else if (this.isQuanX()) {
            let openUrl = rawopts["open-url"] || rawopts.url || rawopts.openUrl;
            let mediaUrl = rawopts["media-url"] || rawopts.mediaUrl;
            return { "open-url": openUrl, "media-url": mediaUrl };
          } else if (this.isSurge()) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts["open-url"];
            return { url: openUrl };
          }
        } else {
          return undefined;
        }
      };
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(title, subt, desc, toEnvOpts(opts));
        } else if (this.isQuanX()) {
          $notify(title, subt, desc, toEnvOpts(opts));
        }
      }
      if (!this.isMuteLog) {
        let logs = ["", "==============📣系统通知📣=============="];
        logs.push(title);
        subt ? logs.push(subt) : "";
        desc ? logs.push(desc) : "";
        console.log(logs.join("\n"));
        this.logs = this.logs.concat(logs);
      }
    }

    log(...logs) {
      if (logs.length > 0) {
        this.logs = [...this.logs, ...logs];
      }
      console.log(logs.join(this.logSeparator));
    }

    logErr(err, msg) {
      const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      if (!isPrintSack) {
        this.log("", `❗️${this.name}, 错误!`, err);
      } else {
        this.log("", `❗️${this.name}, 错误!`, err.stack);
      }
    }

    wait(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    done(val = {}) {
      const endTime = new Date().getTime();
      const costTime = (endTime - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${costTime} 秒`);
      this.log();
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(val);
      }
    }
  })(name, opts);
}
