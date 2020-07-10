import * as type from './mutations_type.js';
import { RuleExecEngine } from './adengine/RuleExecEngine.js';


function addDataToList(state, payload, list) {
  let channelId = payload.channelId;
  if (payload.isNewData) {
    list[channelId]['dataList'] = [];
  }
  payload.data.forEach(item => {
    let index = list[channelId]['dataList'].length;
    RuleExecEngine.injectAdToList_byCustomer_roule01(payload.customerName, item, index);
    list[channelId]['dataList'].push(item);
  });
  state.list[payload.channelId].page++;
}

export default {

  setJumped(state){
    state.jumped = 1
  },

  setX5(state){
    state.x5show = true
  },
  setVisited(state){
    state.visitedFlag = false
  },

  ['setDownRan'](state, enterTime) {
    state.downRan = Math.floor(Math.random() * 10000);
  },

  ['setEnterTime'](state, enterTime) {
    state.enterTime = enterTime;
  },
  ['setPathListM'](state, currentData) {
    if (currentData.customerName !== 'customer') {
      state.pathList.push(currentData.path);
    }
  },

  ['setSdNumber'](state, adNumber) {
    if (!adNumber) {
      state.adNumber++;
      return false;
    }
    state.adNumber = 0;
  },
  ['setCustomerJs'](state, customerJs) {
    state.customerJs = customerJs;
  },
  ['setBid'](state, bid) {
    state.bid = bid;
  },
  ['setToken'](state, token) {
    state.token = token;
  },


  ['setIsIphone'](state, isIphone) {
    state.isIphone = isIphone;
  },
  ['setScale_w'](state, s) {
    state.scale_w = s;
  },
  ['setList'](state, list) {
    state.list = list;
  },

  // 获取新闻
  ['setChannelList'](state, channelList) {
    state.channelList = channelList;
  },

  ['setList'](state, list) {
    state.list = list;
  },

  [type.GET_NEWSLIST](state, payload) {

    addDataToList(state, payload, state.list);

    // state.list[payload.channelId][page] ++
  },

  [type.UPDATE_SCROLLY](state, scrollY) {
    state.scrollY = scrollY;
  },

  // 是否在加载中
  [type.IF_LOADING](state, boolean) {
    state.loading = boolean;
  },
  // 添加历史

  // 是否加载更多搜索
  [type.LOADMORE_SEARCH](state, boolean) {
    state.loadmoreSearch = boolean;
  },
  // 是否返回更多搜索
  [type.RETURN_MORE_SEATCH](state, boolean) {
    state.ifReturnMoreSearch = boolean;
  },

  // 刷新消息
  [type.REFRESH_NEWS](state, payload) {
    let type = payload.type;
    for (let item of payload.data) {
      state.list[type].unshift(item);
    }
  },
  // 刷新消息的数量
  [type.REFRESH_LENGTH](state, length) {
    state.newsLength = length;
    state.ifReturnRefresh = true;
  },
  // 记录从主页离开时的新闻类型
  [type.LOG_TYPE](state, type) {
    state.type = type;
  },
  // 保存网页离开时的位置
  [type.SAVE_POSITION](state, { name, position }) {
    state.positions[name] = position;
  },
  [type.ISNEWESTCONTLOADED](state, flag) {
    state.isNewestContLoaded = flag;
  },
  [type.HASPARAGRAPH](state, flag) {
    state.hasParagraph = flag;
  }
};
