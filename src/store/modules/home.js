const state = {
  imageStore: [
    { name: 'large', version: 0, data: [] },
    { name: 'coin', version: 0, data: [] },
    { name: 'big', version: 0, data: [] },
    { name: 'under', version: 0, data: [] }
  ] // 记录图片版本号及数据
};

const mutations = {
  CHANGEIMGSDATA: (state, obj) => {
    state.imageStore.map(v => {
      if (obj.comment === v.name) {
        v.version = obj.version;
        v.data = JSON.parse(JSON.stringify(obj.data));
      }
    });
  }
};

const actions = {
  changeImgsData({ commit }, obj) {
    commit('CHANGEIMGSDATA', obj);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

