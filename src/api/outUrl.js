
import request from '@/utils/baseRequest'
let baseUrl = 'https://apiads.moonai.com.cn'
export function getUrl() {
    return request({
      url: baseUrl+'/external_ads/random',
      method: 'get',
      params:{ip:returnCitySN.cip}
    })
  }

  export function getSingle({vid}) {
    return request({
      url: baseUrl+'/external_ads/url',
      method: 'get',
      params:{vid,ip:returnCitySN.cip}
    })
  }

  export function tactis_group({ code_key , ip}) {
    return request({
      url: baseUrl+'/tactis_group/statist',
      method: 'post',
      data:{
        duration: Date.parse(new Date())/1000,
        code_key,
        ip,
        snow:0
      }
    })
  }

  export function getIp(){
    return request({
      url: 'https://api.ipify.org/?format=json',
      method: 'get'
    })
  }




  
  let baseUrl2 = 'http://192.168.1.160:3000'

  export function getByComment({ comment }) {
    return request({
      url: baseUrl2 +'/images/getByComment',
      method: 'get',
      params:{comment}
    })
  }

  export function tac_img({ comment }) {
    return request({
      url: baseUrl2 +'/images/getiamges',
      method: 'get',
      params:{comment}
    })
  }

  export function alipay({ total_amount }) {
    return request({
      url: baseUrl+'/pay/alipay',
      method: 'POST',
        data:{
            total_amount
        }
    })
  }

  
  export function ads_group(val) {
    return request({
      url: baseUrl+'/ads_group/add',
      method: 'POST',
        data:{
            val
        }
    })
  }
  

  

  
  
  