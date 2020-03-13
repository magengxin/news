<template>
  <div>
    <div id="sss">
      <c-home-nav></c-home-nav>
      <div class="loading" v-show="loading">
        <img class="back" :src="loadingPng" alt />
      </div>
      <mescroll-vue
        v-show="!loading"
        class="position-box"
        ref="mescroll"
        @init="mescrollInit"
        :up="upConfig"
        :down="downConfig"
      >
        <c-newslist
          :listCon="list"
          :customer-name="this.$route.params.customerName"
          :type="this.$route.params.type"
          :flag="true"
          :ifFlag="ifReturnMore"
        ></c-newslist>
      </mescroll-vue>
    </div>
    <fixedAd :customerName="this.$route.params.customerName"></fixedAd>
    <dialog-ad
      v-if="customerJs.adsSwitch && customerJs.hasOwnProperty('dialogAd') && customerJs.dialogAd.adType!='tuiyasdk' "
      ref="dialogAd"
      :customerName="this.$route.params.customerName"
      :info="customerJs.dialogAd"
    ></dialog-ad>
    <tuiyasdk
      v-else-if="customerJs.adsSwitch && customerJs.hasOwnProperty('dialogAd') && customerJs.dialogAd.adType==='tuiyasdk'"
      :info="customerJs.dialogAd"
      :randomId="'tuiya'+Math.floor(Math.random() * 100000)"
    ></tuiyasdk>
  </div>
</template>

<script>
import floatAd from "@/assets/floatAd.gif";
import { getDateDiff } from "@/utils/dateUtil";
import CHomeNav from "../components/HomeNav.vue";
import CNewslist from "../components/Newslist.vue";
import MescrollVue from "mescroll.js/mescroll.vue";
import { mapActions, mapState } from "vuex";
import * as type from "@/store/mutations_type.js";
import { RuleExecEngine } from "@/store/adengine/RuleExecEngine.js";
import { ipValue, getNewsList, errorApi, statisc } from "@/api/news";
import { customerAd } from "@/store/adengine/customerAd";
import loadingPng from "@/assets/loading.gif";
import doumengad from "@/components/ad/DouMeng";

import fixedAd from "@/components/ad/fixedAd";
import tuiyasdk from "@/components/ad/tuiyasdk";
import dialogAd from "@/components/ad/DialogAd";
import store from "@/store";

export default {
  data() {
    return {
      icon: {
        sina: "新浪",
        fenghuang: "凤凰",
        wuli: "唔哩头条",
        souhu: "搜狐新闻",
        zaker: "zaker"
      },
      customerAd: customerAd,
      oldCount: 0,
      count: 10,
      timer: null,
      loadingPng: loadingPng,
      loading: true,
      videoAdFlag: true,
      mescroll: {
        up: {
          // lazyLoad: {
          //   use: true, // 是否开启懒加载,默认false
          //   attr: "src", // 网络地址的属性名 (图片加载成功会移除该属性): <img imgurl='网络图  src='占位图''/>
          //   showClass: "mescroll-lazy-in", // 图片加载成功的显示动画: 渐变显示,参见mescroll.css
          //   delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
          //   offset: 1400 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
          // }
        }
      },
      // dList: [],
      page: 1,
      total: 10000,
      list: [],
      ifReturnMore: true,
      pageSize: 20,
      upConfig: {
        auto: false,
        noMoreSize: 5,
        offset: 30,
        callback: this.upCallBack,
        htmlContent:
          '<p class="downwarp-progress"></p><p class="downwarp-tip"></p>'
      },
      downConfig: {
        noMoreSize: 5,
        offset: 30,
        auto: false,
        callback: this.downCallback
      }
    };
  },
  components: {
    CHomeNav,
    CNewslist,
    MescrollVue,
    // videoAd,

    tuiyasdk,
    doumengad,
    fixedAd,
    dialogAd
  },
  activated() {
  },
  mounted() {
    setTimeout(() => {
      this.mescroll.scrollTo(this.scrollY, 0);
    }, 200);

    this.calcuDriver();
  },
  created() {
    this.getUserOnly();
    this.setEnterTime(Date.parse(new Date()));
    store.dispatch("setSdNumber", "11");
    this.calcuDriver();
    this.init();
  },

  watch: {
    $route(to, from) {
      if (to.path.includes("customer") && from.path.includes("customer")) {
        if (
          this.customerJs.hasOwnProperty("dialogAd") &&
          this.customerJs.dialogAd.adType != "tuiyasdk"
        ) {
          this.$refs.dialogAd.showView();
        }
        this.loading = true;
        this.list = [];
        this.page = 1;
        this.mescroll.scrollTo(0, 0);
        this.updateScrollY(0);
        this.pageSize = 20;
        this.init(true);
      } else if (to.path.includes("content") || to.path.includes("adIframe")) {
      } else if (!from.path.includes("customer")) {
        this.mescroll.scrollTo(this.scrollY, 0);
      }
    }
  },
  computed: {
    ...mapState([
      "scrollY",
      "scale_w",
      "isIphone",
      "token",
      "customerJs",
      "enterTime"
    ]),
    history() {
      return this.$route.path;
    }
  },
  methods: {
    ...mapActions([
      "updateScrollY",
      "setIsIphone",
      "setScale_w",
      "setBid",
      "getNews",
      "setEnterTime"
    ]),
    getUserOnly() {
      if (localStorage.getItem("userOnly")) {
        let stepBefore = Number(localStorage.getItem("userOnly"));
        let dayBefore = new Date(stepBefore).getDate();
        let dayNow = new Date().getDate();
        if (dayBefore === dayNow) {
        } else {
          let rNum = Math.floor(Math.random() * 10000) + "";
          let timeStep = new Date().getTime() + "";
          localStorage.setItem("userOnly", timeStep);
          ipValue({
            bid: this.$route.params.customerName,
            userInfo: encodeURI(rNum + "_" + timeStep)
          });
        }
      } else {
        let rNum = Math.floor(Math.random() * 10000) + "";
        let timeStep = new Date().getTime() + "";
        localStorage.setItem("userOnly", timeStep);
        ipValue({
          bid: this.$route.params.customerName,
          userInfo: encodeURI(rNum + "_" + timeStep)
        });
      }
    },
    calcuDriver() {
      if (this.scale_w === "") {
        let u = navigator.userAgent;
        let isAppleDevice = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let scale_w = "";
        switch (window.screen.width) {
          case 320: {
            scale_w = 1;
            break;
          }
          case 375: {
            scale_w = 2;
            break;
          }
          case 414: {
            scale_w = 3;
            break;
          }
          default: {
            scale_w = 3;
            break;
          }
        }
        this.setIsIphone(isAppleDevice);
        this.setScale_w(scale_w);
      }
    },
    startPlay() {
      // this.timer = setInterval(() => {
      //   if (this.count > 0 && this.count <= 10) {
      //     this.count--;
      //   } else {
      //     this.videoAdFlag = false;
      //     // this.$refs.videoAd.zanting();
      //     clearInterval(this.timer); // 清除定时器
      //     this.timer = null;
      //   }
      // }, 1000);
    },
    close() {
      this.videoAdFlag = !this.videoAdFlag;
    },
    openAd() {
      this.$router.push({
        path: "/adIframe",
        query: {
          url:
            "https://engine.tuicoco.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=322501"
        }
      });
    },
    upCallBack(p, mescroll) {
      this.loading = true;
      this.getNews({
        customerName: this.$route.params.customerName,
        channelId: this.$route.params.type,
        page: this.page,
        pageSize: this.pageSize
      }).then(({ data }) => {
        this.total = data.total;
        let newList = data.list;
        let newList2 = [];
        let index = this.list.length;
        newList.forEach(item => {
          item.publishDate = getDateDiff(item.publishDate);
          item = RuleExecEngine.injectAdToList(
            this.$route.params.customerName,
            item,
            index
          );
          index++;
          this.list.push(item);
        });
        // newList.forEach((v, index) => {
          // for (let i in this.icon) {
          //   if (v.come) {
          //     if (v.come.indexOf(this.icon[i]) != -1) {
          //       v["icon"] = i;
          //     }
          //   }
          // }
        // });

        // const nL = this.list.concat(newList2);
        this.page++;
        this.$nextTick(() => {
          this.loading = false;
          mescroll.endBySize(this.list.length, 10000);
        });
      });
    },
    async downCallback(mescroll) {
      this.loading = true;
      this.getNews({
        // getNewsList({
        customerName: this.$route.params.customerName,
        channelId: this.$route.params.type,
        page: this.page,
        pageSize: this.pageSize
      }).then(({ data }) => {
        this.total = data.total;
        let newList = data.list;
        let newList2 = [];
        let index = this.list.length;
        newList.forEach(item => {
          item.publishDate = getDateDiff(item.publishDate);
          item = RuleExecEngine.injectAdToList(
            this.$route.params.customerName,
            item,
            index
          );
          index++;
        });
 
        this.list = newList;
        // this.list.forEach((v, index) => {
        //   for (let i in this.icon) {
        //     if (v.come) {
        //       if (v.come.indexOf(this.icon[i]) != -1) {
        //         v["icon"] = i;
        //       }
        //     }
        //   }
        // });

        this.page++;
        mescroll.endSuccess();

        this.$nextTick(() => {
          this.loading = false;
          this.mescroll.scrollTo(200, 0);
        });
      });
    },
    init() {
      this.getNews({
        customerName: this.$route.params.customerName,
        channelId: this.$route.params.type,
        page: this.page,
        pageSize: this.pageSize
      }).then(({ data }) => {
        this.total = data.total;
        let newList = data.list;
        let newList2 = [];
        newList.forEach((item, index) => {
          item.publishDate = getDateDiff(item.publishDate);
          item = RuleExecEngine.injectAdToList(
            this.$route.params.customerName,
            item,
            index
          );
          newList2.push(item);
        });
        // const nL = this.list.concat(newList2);
        this.list = newList2;

        // this.list.forEach((v, index) => {
        //   for (let i in this.icon) {
        //     if (v.come) {
        //       if (v.come.indexOf(this.icon[i]) != -1) {
        //         v["icon"] = i;
        //       }
        //     }
        //   }
        // });
        this.page++;
        this.loading = false;
      });
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    }
  },

  // 离开页面时，记录新闻的类型
  beforeRouteLeave(to, from, next) {
    this.$store.commit("LOG_TYPE", from.params.type);

    if (to.path.includes("content") === -1) {
      this.updateScrollY(0);
    } else {
      this.updateScrollY(this.mescroll.getScrollTop());

    }
    next();
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.hdgg_entrance_element {
  width: 100%;
  height: 200px;
  margin-top: 20px;
  z-index: 9999;
}
.fiexAd {
  z-index: 70;
  position: fixed;
  bottom: 34%;
  right: px2rem(10px);
  img {
    width: px2rem(140px);
  }
}

.position-box {
  position: fixed;
  top: px2rem(80px);
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
}
.loading {
  position: relative;
  background: red;
  top: px2rem(80px);
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    height: auto;
    position: absolute;
    margin: 0 auto;
  }
}
</style>
