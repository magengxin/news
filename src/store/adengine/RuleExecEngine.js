import store from '@/store';

export const RuleExecEngine = {

  canInjectAd: function(index, role) {
    let start = Number(role.startIndex);
    let step = Number(role.step);
    let type = role.type;
    if (index === start || (index > start && (index - start) % step === 0)) {

      if (type === 'sougou' || type === 'wulitoutiao') {
        if (role.hasOwnProperty('key')) {

          if (store.state.adNumber < role.key) {
            store.dispatch('setSdNumber');
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
      return true

    } else {
      return false;
    }
  },

  injectAdToList: function(customerName, item, index) {

    let customerJs = store.state.customerJs;
    if (customerJs) {
      if (customerJs.adsSwitch &&
        customerJs.listAd) {
        if (this.canInjectAd(index, customerJs.listAd)) {
          let ad = customerJs.listAd;
          ad = JSON.parse(JSON.stringify(ad));
          item.info = {};
          for (let i in ad) {
            if (ad.hasOwnProperty(i)) {

              item['info'][i] = ad[i];
              item['info']['divId'] = ad.adType + index + Math.floor(Math.random() * 100000);
            }
          }
        } else {
        }
      } else {

      }
    } else {

    }
    if (customerJs.adsSwitch &&
      customerJs.listIndexAd){
 
        if(index === Number(customerJs.listIndexAd.index) ){
          let ad = customerJs.listIndexAd;
          ad = JSON.parse(JSON.stringify(ad));
          item.xiaoshuo = {  }
          for (let i in ad) {
            if (ad.hasOwnProperty(i)) {
              item['xiaoshuo'][i] = ad[i];
            }
          }
        }
      }

    

    return item;
  }
};
