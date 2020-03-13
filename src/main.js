// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import VueLazyload from 'vue-lazyload'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import uweb from 'vue-uweb'
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
Vue.use(uweb, 1278138729)
Vue.config.productionTip = false;
// Vue.use(iView)
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
