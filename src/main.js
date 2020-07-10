import VueLazyload from 'vue-lazyload'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import uweb from 'vue-uweb'
import MetaInfo from 'vue-meta-info'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
let ctuskytime = new Date();
ctuskytime.setDate(ctuskytime.getDate() + 1);
ctuskytime.setHours(0);
ctuskytime.setMinutes(0);
ctuskytime.setSeconds(0);
let expireTimes = ctuskytime.toGMTString();
Vue.$cookies.config(expireTimes, '/');
// import VConsole from "vconsole";
// var vConsole = new VConsole();
const requireComponent  = require.context("./components/ad",true,/\.(vue|js)$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
});

// Vue.use(VConsole)
Vue.use(MetaInfo)
Vue.use(uweb, 1278138729)
Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  error: '/static/image/imgerror.jpg',
  loading: '/static/image/loading.gif',
  preLoad: 1,
  attempt: 1
})

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
  store,
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  }
})
