^https?:\/\/sjapp\.o3aqqc\.work\/user\/(info|fansAndUpAndAttentionCnt)$ url script-response-body https://raw.githubusercontent.com/yqc007/QuantumultX/master/SJSPCrack.js
^https?:\/\/sjapp\.o3aqqc\.work\/mov\/browse url request-header (\r\n)Authorization:.+(\r\n) request-header $1Authorization: 0547064bb9a5557d332023ab513a2e3784e38dc54f844f53cbb804d3a687c48b6c2e670c6aba3e564f$2
^https?:\/\/sjapp\.o3aqqc\.work\/(home\/message\/get|user\/getUserActivity|activityDialog\/getActivityDialogList|banner\/list2\?location=0|game\/programGameList) url reject-200
^https?:\/\/yimuapp\.com(:8082)?\/bookkeeping\/user\/getUser\/ url script-response-body https://raw.githubusercontent.com/I-am-R-E/QuantumultX/main/JavaScript/YiMuJiZhang.js
^https?:\/\/(h5|api)\.xiuxiu\.meitu\.com\/v\d\/(h\d\/vip|vip|user)\/ url script-response-body https://raw.githubusercontent.com/I-am-R-E/QuantumultX/main/JavaScript/MeiTuXiuXiu.js
^https?:\/\/api\.infzm\.com\/mobile\/(user|contents\?|contents\/\d+\?|contents\/\d+\/isview\?|course_borrow|courses\/\d+\?|mall|course_items) url script-response-body https://raw.githubusercontent.com/I-am-R-E/QuantumultX/main/JavaScript/NanFangZhouMo.js
^https?:\/\/(api-\w+|xiaoshuo)\.wtzw\.com\/api\/v\d\/ url script-response-body https://raw.githubusercontent.com/I-am-R-E/QuantumultX/main/JavaScript/QiMaoXiaoShuo.js
