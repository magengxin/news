import request from '@/utils/request'


export function getNewsList2({ customerName, channelId, page, pageSize ,location}) {
  return request({
    url: '/' + customerName + '/list/' + channelId + '/' + page + '/' + pageSize + '/?location='+location,
    method: 'post',
    data: {}
  })
}

export function wuba() {
  return request({
    url: '/wubaapi?deviceid='+'xxx',
    method: 'get',
  })
}
export function getChannelList(customerName) {
  return request({
    url: '/' + customerName + '/channel',
    method: 'post',
    data: {}
  })
}

export function ipValue({bid,userInfo}) {
  return request({
    url: '/ip_value?bid='+bid+'&userinfo='+userInfo,
    method: 'get',
    data: {
    }
  })
}

export function statisc() {
  return request({
    url: '/statisc',
    method: 'get',
    data: {
    }
  })
}

export function errorApi({ title }) {
  return request({
    url: '/command',
    method: 'get',
    data: {
    }
  })
}


export function postError({
  errorMsg,
  bid,
  contentId,
  cid
}) {
  return request({
    url: '/exception_handler',
    method: 'post',
    data: {
      errorMsg,
      bid,
      contentId,
      cid
    }
  })
}


export function tuisdk({ title }) {
  return request({
    url: '/tuisdk',
    method: 'post',
    data: {
      view_title: title,
      gender: '女',
      age: '18- 24'
    }
  })
}

export function taccodejs({ bid }) {
  return request({
    url: '/taccodejs/' + bid,
    method: 'get',
  })
}


export function getNewsList({ customerName, channelId, page, pageSize }) {
  return request({
    url: '/' + customerName + '/newslist/' + channelId + '/' + page + '/' + pageSize,
    method: 'post',
    data: {}
  })
}

export function getNewsListDown({ customerName, channelId, pageSize }) {
  return request({
    url: '/' + customerName + '/articlelist/' + channelId + '/~/' + pageSize,
    method: 'get',
  })
}

export function getDoumeng() {
  return request({
    url: '/doumeng',
    method: 'get',
  })
}

export function getArticle(customerName, snowFlakeid) {
  return request({
    url: '/' + customerName + '/article/' + snowFlakeid,
    method: 'post',
    data: {}
  })
}