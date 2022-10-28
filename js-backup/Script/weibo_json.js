/*
应用名称：自用微博国际版去广告脚本
脚本作者：Cuttlefish
微信账号：公众号墨鱼手记
更新时间：2022-08-25
脚本版本：(0.0.3)
通知频道：https://t.me/ddgksf2021
问题反馈：ddgksf2013@163.com
*/
const mainConfig = {};
const modifyCardsUrls = ['/cardlist', 'video/community_tab', '/searchall'];
const modifyTimeUrls = ['statuses/friends_timeline', 'statuses/unread_hot_timeline', 'groups/timeline'];
const modifyOtherUrls = {
	'ct=feed&a=trends': 'removeTopics'
}
function getModifyMethod(url) {
	for (const s of modifyCardsUrls) {
		if(url.indexOf(s) > -1) {
			return 'removeCards';
		}
	}
	for (const s of modifyTimeUrls) {
		if(url.indexOf(s) > -1) {
			return 'removeTimeLine';
		}
	}
	for(const [path, method] of Object.entries(modifyOtherUrls)) {
		if(url.indexOf(path) > -1) {
			return method;
		}
	}
	return null;
}
function removeTopics(data) {
	if(!data.data) {
		return data;
	}
	//if(data.data.search_topic) {delete data.data.search_topic;}
	if(data.data.topics) 	   {delete data.data.topics;}
	if(data.data.discover)     {delete data.data.discover;}
	
	return data;
}
function isAd(data) {
	if(!data) {
		return false;
	}
	if(data.mblogtypename == '广告' || data.mblogtypename == '热推') {return true};
	if(data.mblogtypename == '廣告' || data.mblogtypename == '熱推') {return true};
	if(data.promotion && data.promotion.type == 'ad') {return true};
	return false;
}

function isBlock(data) {
	let blockIds = mainConfig.blockIds || [];
	if(blockIds.length === 0) {
		return false;
	}
	let uid = data.user.id;
	for (const blockId of blockIds) {
		if(blockId == uid) {
			return true;
		}
	}
	return false;
}

function removeTimeLine(data) {
	for (const s of ["ad", "advertises", "trends"]) {
		if(data[s]) {
			delete data[s];
		}
	}
	if(!data.statuses) {
		return;
	}
	let newStatuses = [];
	for (const s of data.statuses) {
		if(!isAd(s)) {
			//lvZhouHandler(s);
			if(!isBlock(s)) {
				newStatuses.push(s);
			}
		}
	}
	data.statuses = newStatuses;
}
function removeCards(data) {
	if(!data.cards) {
		return;
	}
	let newCards = [];
	for (const card of data.cards) {
		let cardGroup = card.card_group;
		if(cardGroup && cardGroup.length > 0) {
			let newGroup = [];
			for (const group of cardGroup) {
				let cardType = group.card_type;
				if(cardType != 118) {
					newGroup.push(group);
				}
			}
			card.card_group = newGroup;
			newCards.push(card);
		} else {
			let cardType = card.card_type;
			if([9,165].indexOf(cardType) > -1) {
				if(!isAd(card.mblog)) {
					newCards.push(card);
				}
			} else {
				newCards.push(card);
			}
		}
	}
	data.cards = newCards;
}
var body = $response.body;
var url = $request.url;
let method = getModifyMethod(url);
if(method) {
	var func = eval(method);
	let data = JSON.parse(body);
	new func(data);
	body = JSON.stringify(data);
}
$done({body});
