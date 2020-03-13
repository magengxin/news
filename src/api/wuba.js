import request from '@/utils/baseRequest'

export function show_url({show_url}) {
    let url  = 'https:'+show_url[0].split(':')[1]
 
  return request({
    url: url,
    method: 'get',
    params: {
    }
  })
}

export function click_url({click_url}) {
    let url  = 'https:'+click_url[0].split(':')[1]
 
    return request({
      url: url,
      method: 'get',
      params: {
      }
    })
  }
