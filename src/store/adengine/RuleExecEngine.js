import store from '@/store';

export const RuleExecEngine = {

  canInjectAd: function (index, role) {

    let start = Number(role.startIndex);
    let step = Number(role.step);
    let type = role.type;
    if (index === start || (index > start && (index - start) % step === 0)) {

      if (type === 'sougou' || type === 'wulitoutiao' || role.adType === 'tengcentAd') {
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
      return true;

    } else {
      return false;
    }
  },

  injectAdToList: function (customerName, item, index, littleI) {

    let customerJs = store.state.customerJs;

    if (customerJs) {
      if (customerJs.listAd) {
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
        }
      }
    }

    if (
      customerJs.listIndexAd) {
      if (littleI === Number(customerJs.listIndexAd.index)) {
        let ad = customerJs.listIndexAd;
        ad = JSON.parse(JSON.stringify(ad));
        item.listIndexAd = {};
        for (let i in ad) {
          if (ad.hasOwnProperty(i)) {
            item['listIndexAd'][i] = ad[i];
            item['listIndexAd']['divId'] = ad.adType + littleI + Math.floor(Math.random() * 100000);
          }

        }

      }

    }

    if (
      customerJs.listIndexAd2) {
      if (littleI === Number(customerJs.listIndexAd2.index)) {
        let ad = customerJs.listIndexAd2;

        ad = JSON.parse(JSON.stringify(ad));
        item.listIndexAd2 = {};
        for (let i in ad) {
          if (ad.hasOwnProperty(i)) {
            item['listIndexAd2'][i] = ad[i];
            item['listIndexAd2']['divId'] = ad.adType + littleI + Math.floor(Math.random() * 100000);
          }
        }
      }
    }
    if (
      customerJs.listIndexAd3) {
      if (littleI === Number(customerJs.listIndexAd3.index)) {
        let ad = customerJs.listIndexAd3;
        ad = JSON.parse(JSON.stringify(ad));
        item.listIndexAd3 = {};
        for (let i in ad) {
          if (ad.hasOwnProperty(i)) {
            item['listIndexAd3'][i] = ad[i];
            item['listIndexAd3']['divId'] = ad.adType + littleI + Math.floor(Math.random() * 100000);
          }
        }
      }
    }
    if (
      customerJs.listIndexAd4) {
      if (littleI === Number(customerJs.listIndexAd4.index)) {
        let ad = customerJs.listIndexAd4;
        ad = JSON.parse(JSON.stringify(ad));
        item.listIndexAd4 = {};
        for (let i in ad) {
          if (ad.hasOwnProperty(i)) {
            item['listIndexAd4'][i] = ad[i];
            item['listIndexAd4']['divId'] = ad.adType + littleI + Math.floor(Math.random() * 100000);
          }
        }
      }
    }
    if (
      customerJs.listIndexAd0) {
      if (littleI === Number(customerJs.listIndexAd0.index)) {
        let ad = customerJs.listIndexAd0;
        ad = JSON.parse(JSON.stringify(ad));
        item.listIndexAd0 = {};
        for (let i in ad) {
          if (ad.hasOwnProperty(i)) {
            item['listIndexAd0'][i] = ad[i];
            item['listIndexAd0']['divId'] = ad.adType + littleI + Math.floor(Math.random() * 100000);
          }
        }
      }
    }
    return item;
  }
};
