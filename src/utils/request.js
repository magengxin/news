import axios from 'axios'
import store from '@/store'
import Vue from 'vue'
// create an axios instance
const service = axios.create({
  baseURL: "https://apinews.moonai.com.cn", //正式环境
  //  baseURL: "http://192.168.1.109:8089", // new back
  //  baseURL: "https://uatnews.moonai.com.cn", //测试环境/
  //  baseURL: "http://192.168.1.160:8089", //测试环境
  timeout: 50000, // request timeout,
})

service.interceptors.request.use(
  config => {
    if (returnCitySN.cip) {
      config.headers['ipadr'] = Vue.$cookies.get('userLogin');
      config.headers['ip_address'] =  Vue.$cookies.get('userLogin') ;
    }
     config.headers['Token'] = ""
     config.headers['bid'] = store.state.bid
     config.headers['url'] = process.env.URL

     return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
       if (res.code !== 1000) {
      console.info('requset 捕获到异常  res为', v2)
      return Promise.reject(res)
    } else {
     return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default service
