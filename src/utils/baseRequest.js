import axios from 'axios'

// create an axios instance
const service = axios.create({
   baseURL: "", 
  timeout: 50000, // request timeout,
})
// service.defaults.withCredentials=true;
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
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
    // if the custom code is not 20000, it is judged as an error.
    if (!res.successed) {
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default service
