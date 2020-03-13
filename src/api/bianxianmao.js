import request from '@/utils/bianxianmaoRequest'

export function getBianxianMao({adPositionId,sex,age,netEnv,education,income,city}) {
    return request({
      url: '/getAdMaterial',
      method: 'get',
      params: {
        adPositionId,
        sex,
        age,
        netEnv,
        education,
        income,
        city,


      }
    })
  }