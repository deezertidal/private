/*
领金贴(只做签到以及互助任务里面的部分任务)
活动入口：京东APP首页-领金贴，[活动地址](https://active.jd.com/forever/cashback/index/)
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
=================QuantumultX==============
[task_local]
#领金贴
10 0 * * * jd_jin_tie.js, tag=领金贴, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
===========Loon===============
[Script]
cron "10 0 * * *" script-path=jd_jin_tie.js,tag=领金贴
=======Surge===========
领金贴 = type=cron,cronexp="10 0 * * *",wake-system=1,timeout=3600,script-path=jd_jin_tie.js
==============小火箭=============
领金贴 = type=cron,script-path=jd_jin_tie.js, cronexpr="10 0 * * *", timeout=3600, enable=true
 */
const $ = new Env('领金贴');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message, allMessage = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0);
} else {
  cookiesArr = [
    $.getdata("CookieJD"),
    $.getdata("CookieJD2"),
    ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await main();
    }
  }
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
async function main() {
  try {
    await signInforOfJinTie();
    await queryMission();
    await doTask();
    await queryMission(false);
    await queryAvailableSubsidyAmount();
  } catch (e) {
    $.logErr(e)
  }
}
function queryMission(info = true) {
  $.taskData = [];
  const body = JSON.stringify({
    channel: "sqcs",
    channelCode: "SUBSIDY2",
    "riskDeviceParam": JSON.stringify({
      appId: "jdapp",
      appType: "3",
      clientVersion: "9.4.6",
      deviceType: "iPhone11,8",
      "eid": cookie,
      "fp": getFp(),
      idfa: "",
      imei: "",
      ip: "",
      macAddress: "",
      networkType: "WIFI",
      os: "iOS",
      osVersion: "14.2",
      token: "",
      uuid: ""
    })
  })
  const options = taskUrl('queryMission', body);
  return new Promise((resolve) => {
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.resultCode === 0) {
            if (data.resultData.code === '0000') {
              if (info) {
                console.log('互动任务获取成功')
                $.taskData = data.resultData.data;
                $.willTask = $.taskData.filter(t => t.status === -1) || [];
                // $.willTask = $.taskData.filter(t => t.status === 0) || [];//已领取任务，但未完成
                $.recevieTask = $.taskData.filter(t => t.status === 1) || [];
                const doneTask = $.taskData.filter(t => t.status === 2);
                console.log(`\n剩余未接取任务：${$.willTask.length}`)
                console.log(`已完成任务：${doneTask.length}\n`);
              } else {
                if ($.recevieTask && $.recevieTask.length) {
                  for (let task of $.recevieTask) {
                    console.log('预计获得：', task.awards[0].awardName, task.awards[0].awardRealNum, task.awards[0].awardUnit)
                    await awardMission(task['missionId'])
                  }
                }
              }
            } else {
              console.log('获取互动任务失败', data.resultData.msg)
            }
          } else {
            console.log('获取互动任务失败', data.resultMsg)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
//领取任务
function receiveMission(missionId) {
  const body = JSON.stringify({
    missionId,
    "channelCode": "SUBSIDY2",
    "timeStamp": new Date().toString(),
    "env": "JDAPP"
  });
  const options = taskUrl('receiveMission', body);
  return new Promise((resolve) => {
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.resultCode === 0) {
            if (data.resultData.code === '0000') {
              console.log('任务接取成功')
            } else {
              console.log('任务接取失败', data.resultData.msg)
            }
          } else {
            console.log('任务接取失败', data.resultMsg)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
//完成任务
function finishReadMission(missionId, readTime) {
  const body = JSON.stringify({missionId, readTime});
  const options = taskUrl('finishReadMission', body);
  return new Promise((resolve) => {
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.resultCode === 0) {
            if (data.resultData.code === '0000') {
              console.log('完成任务 成功')
            } else {
              console.log('完成任务失败', data.resultData.msg)
            }
          } else {
            console.log('完成任务失败', data.resultMsg)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
//领取金贴奖励
function awardMission(missionId) {
  const body = JSON.stringify({
    missionId,
    "channelCode": "SUBSIDY2",
    "timeStamp": new Date().toString(),
    "env": "JDAPP"
  });
  const options = taskUrl('awardMission', body);
  return new Promise((resolve) => {
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.resultCode === 0) {
            if (data.resultData.code === '0000') {
              console.log('奖励领取成功')
            } else {
              console.log('奖励领取失败', data.resultData.msg)
            }
          } else {
            console.log('奖励领取失败', data.resultMsg)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
//获取签到状态
function signInforOfJinTie() {
  const body = JSON.stringify({
    channel: "sqcs",
    "riskDeviceParam": JSON.stringify({
      appId: "jdapp",
      appType: "3",
      clientVersion: "9.4.6",
      deviceType: "iPhone11,8",
      "eid": cookie,
      "fp": getFp(),
      idfa: "",
      imei: "",
      ip: "",
      macAddress: "",
      networkType: "WIFI",
      os: "iOS",
      osVersion: "14.2",
      token: "",
      uuid: ""
    })
  })
  const options = taskUrl('signInforOfJinTie', body, 'jrm');
  return new Promise((resolve) => {
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.resultCode === 0) {
            if (data.resultData.code === '000') {
              let state = data.resultData.data.sign
              console.log('获取签到状态成功', state ? '今日已签到' : '今日未签到', '连续签到', data.resultData.data.signContinuity, '天\n')
              if (!state) await signOfJinTie()
            } else {
              console.log('获取签到状态失败', data.resultData.msg)
            }
          } else {
            console.log('获取签到状态失败', data.resultMsg)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
//签到
function signOfJinTie() {
  const body = JSON.stringify({
    channel: "sqcs",
    "riskDeviceParam": JSON.stringify({
      appId: "jdapp",
      appType: "3",
      clientVersion: "9.4.6",
      deviceType: "iPhone11,8",
      "eid": cookie,
      "fp": getFp(),
      idfa: "",
      imei: "",
      ip: "",
      macAddress: "",
      networkType: "WIFI",
      os: "iOS",
      osVersion: "14.2",
      token: "",
      uuid: ""
    })
  })
  const options = taskUrl('signOfJinTie', body, 'jrm');
  return new Promise((resolve) => {
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.resultCode === 0) {
            if (data.resultData.code === '000') {
              console.log('签到成功', data.resultData.data.amount)
            } else {
              console.log('签到失败', data.resultData.msg)
            }
          } else {
            console.log('签到失败', data.resultMsg)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function queryAvailableSubsidyAmount() {
  const body = JSON.stringify({
    channel: "sqcs",
    "riskDeviceParam": JSON.stringify({
      appId: "jdapp",
      appType: "3",
      clientVersion: "9.4.6",
      deviceType: "iPhone11,8",
      "eid": cookie,
      "fp": getFp(),
      idfa: "",
      imei: "",
      ip: "",
      macAddress: "",
      networkType: "WIFI",
      os: "iOS",
      osVersion: "14.2",
      token: "",
      uuid: ""
    })
  })
  const options = taskUrl('queryAvailableSubsidyAmount', body, 'jrm');
  return new Promise((resolve) => {
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.resultCode === 0) {
            if (data.resultData.code === '000') {
              console.log(`获取当前总金贴成功\n\n京东账号${$.index} ${$.nickName || $.UserName} 当前总金贴：${data.resultData.data}元`)
            } else {
              console.log('获取当前总金贴失败', data.resultData.msg)
            }
          } else {
            console.log('获取当前总金贴失败', data.resultMsg)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
async function doTask() {
  for (let task of $.willTask) {
    console.log(`\n开始领取 【${task['name']}】任务`);
    await receiveMission(task['missionId']);
    await $.wait(100)
    if (task.doLink.indexOf('readTime=') !== -1) {
      const readTime = parseInt(task.doLink.substr(task.doLink.indexOf('readTime=') + 9));
      await finishReadMission(task['missionId'], readTime);
      await $.wait(200);
    } else if (task.detail.indexOf('京东到家') !== -1) {

    } else if ((task.detail.indexOf('关注') !== -1 || task.detail.indexOf('收藏')) && task.doLink.indexOf('shopId') !== -1) {
      const shopId = task.doLink.substr(task.doLink.indexOf('shopId=') + 7);
    }
  }
}
function taskUrl(function_id, body, type = 'mission') {
  return {
    url: `https://ms.jr.jd.com/gw/generic/${type}/h5/m/${function_id}?reqData=${encodeURIComponent(body)}`,
    headers: {
      'Accept' : `*/*`,
      'Origin' : `https://u.jr.jd.com`,
      'Accept-Encoding' : `gzip, deflate, br`,
      'Cookie' : cookie,
      'Content-Type' : `application/x-www-form-urlencoded;charset=UTF-8`,
      'Host' : `ms.jr.jd.com`,
      'Connection' : `keep-alive`,
      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Referer' : `https://u.jr.jd.com/`,
      'Accept-Language' : `zh-cn`
    }
  }
}
function getFp() {
  // const crypto = require('crypto');
  // let fp = crypto.createHash("md5").update($.UserName + '573.9', "utf8").digest("hex").substr(4, 16)
  return ""
}
function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      headers: {
        Host: "me-api.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-cn",
        "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === "1001") {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
          } else {
            $.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e)
      } finally {
        resolve();
      }
    })
  })
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}