import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


const defaultState = {
  loading: false,                 // loading图片的切换
  x5show:false,
  visitedFlag:true,
  title:"",
  jumped:0,
  scale_w: '',
  bid: null,
  token: null,
  customerJs: {},
  downRan:0,
  enterTime:null,
  isIphone: '',
  scrollY: 0,
  ifReturnMsg: '',               // 是否返回数据
  loadmore: false,               // 是否加载更多新闻
  ifReturnMore: true,            // 是否返回更多新闻
  hasParagraph: false,           // 是否有段落
  isNewestContLoaded: false,
  page: 0,
  total: 0,
  pageSize: 10,
  channelList: [],
  pathList: [], // 跳转来源
  adNumber:0, // 广告数量
  list: {                        // 新闻
  },
  newsLength: 0,                  // 刷新返回的新闻数量
  ifReturnRefresh: false,         // 是否刷新成功
  type: '',                       // 记录从主页离开时的新闻类型
  positions: {},
};

export default new Vuex.Store({
  modules,
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): defaultState,
  getters,
  mutations,
  actions
});
