import * as type from './mutations_type.js';
import { getNewsList, taccodejs } from '@/api/news';


let svrHost = 'api.moonai.com.cn';
let svrPath = '/app/user/messagev1/';

export default {


 

  setJumped({ commit }){
    commit('setJumped');
  },

  setEnterTime({ commit }, enterTime) {
    commit('setEnterTime', enterTime);
  },

  setDownRan({ commit }) {
    commit('setDownRan');
  },

  setPathListA({ commit }, currentData) {
    commit('setPathListM', currentData);
  },

  setSdNumber({ commit }, adNumber) {
    commit('setSdNumber', adNumber);
  },
  setCustomerJs({ commit }, customerJs) {
    commit('setCustomerJs', customerJs);
  },
  setBid({ commit }, bid) {
    commit('setBid', bid);
  },

  setToken({ commit }, token) {
    commit('setToken', token);
  },

  setIsIphone({ commit }, isIphone) {
    commit('setIsIphone', isIphone);
  },

  setScale_w({ commit }, scale_w) {
    commit('setScale_w', scale_w);
  },

  setList({ commit }, list) {
    commit('setList', list);
  },

  updateScrollY({ commit }, scrollY) {
    commit(type.UPDATE_SCROLLY, scrollY);
  },



  getNews({ commit, state }, params) {
    return new Promise(resolve => {
        getNewsList(params).then(v => {
          resolve(v);
        });
    });
  }
};
