import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { postError } from '@/api/news'

// create an axios instance
const service = axios.create({
  baseURL: "https://apinews.moonai.com.cn", //正式环境
  //  baseURL: "https://uatnews.moonai.com.cn", //测试环境/
  //  baseURL: "http://192.168.1.187:8089", //测试环境
  timeout: 50000, // request timeout,
})
// service.defaults.withCredentials=true;
// request interceptor
service.interceptors.request.use(
  config => {

    config.headers['Token'] = store.state.token
    config.headers['bid'] = store.state.bid
    config.headers['ip_address'] = returnCitySN.cip
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.info('返回时候的  response', response)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 1000) {

      let errorObj = {}
      let rParams = router.history.current.params
      errorObj.errorMsg = res.msg
      errorObj.bid = rParams.hasOwnProperty('customerName') ? rParams.customerName : ''
      errorObj.cid = rParams.hasOwnProperty('type') ? rParams.type : ''
      errorObj.contentId = rParams.hasOwnProperty('snowFlakeid') ? rParams.snowFlakeid : ''
      postError(errorObj).then(v2 => {
        console.info('requset 捕获到异常  res为', v2)
      })
      return Promise.reject(res)
    } else {
      if (res.token) {
        console.info('setCustomerJs jsval', JSON.parse(res.jsval))
        store.dispatch('setToken', res.token)
        store.dispatch('setCustomerJs', JSON.parse(res.jsval))
      }

      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default service
