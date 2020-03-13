import * as type from './mutations_type.js'
import { getNewsList, taccodejs } from '@/api/news'

let svrHost = 'api.moonai.com.cn';
let svrPath = '/app/user/messagev1/';

export default {

  setEnterTime({ commit }, enterTime) {
    commit("setEnterTime", enterTime)
  },

  setPathListA({ commit }, currentData) {
    commit('setPathListM', currentData);
  },

  setSdNumber({ commit }, adNumber) {
    commit("setSdNumber", adNumber)
  },
  setCustomerJs({ commit }, customerJs) {
    commit("setCustomerJs", customerJs)
  },
  setBid({ commit }, bid) {
    commit("setBid", bid)
  },

  setToken({ commit }, token) {
    commit("setToken", token)
  },

  setTac({ commit }, { bid }) {
    return new Promise((resolve) => {
      taccodejs({ bid }).then(v => {
        commit("setToken", v.data.token)
        let cuJs = JSON.parse(v.data.jsval)

        commit("setCustomerJs", cuJs)
      })
      resolve()
    })
  },

  setIsIphone({ commit }, isIphone) {
    commit("setIsIphone", isIphone)
  },

  setScale_w({ commit }, scale_w) {
    commit("setScale_w", scale_w)
  },

  setList({ commit }, list) {
    commit("setList", list)
  },

  updateScrollY({ commit }, scrollY) {
    commit(type.UPDATE_SCROLLY, scrollY)
  },

  getNews({ commit, state }, params) {
    return new Promise(resolve => {
      if (state.token) {
        getNewsList(params).then(v => {
          resolve(v)
        })
      } else {
        commit("setBid", params.customerName)
        taccodejs({ bid: params.customerName }).then(v => {
          commit("setToken", v.data.token)
          commit("setCustomerJs", JSON.parse(v.data.jsval))
          getNewsList(params).then(v => {
            resolve(v)
          })
        })
      }
    })
  }
}
