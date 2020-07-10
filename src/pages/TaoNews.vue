<template>
  <div>
    <div>
      <c-home-nav></c-home-nav>
      <div class="loading" v-show="loading">
        <img class="back" :src="loadingPng" alt />
      </div>
        <c-newslist
          :listCon="list"
          :customer-name="this.$route.params.customerName"
          :type="this.$route.params.type"
          :flag="true"
          :ifFlag="ifReturnMore"
        ></c-newslist>
    </div>
    <fixedAd :customerName="this.$route.params.customerName"></fixedAd>
    <dialog-ad
      v-if=" customerJs.hasOwnProperty('dialogAd') && customerJs.dialogAd.adType!='tuiyasdk'  "
      ref="dialogAd"
      :customerName="this.$route.params.customerName"
      :info="customerJs.dialogAd"
    ></dialog-ad>
    <tuiyasdk
      v-else-if=" customerJs.hasOwnProperty('dialogAd') && customerJs.dialogAd.adType==='tuiyasdk'"
      :info="customerJs.dialogAd"
      :randomId="'tuiya'+Math.floor(Math.random() * 100000)"
    ></tuiyasdk>

  </div>
</template>

<script>
import { getDateDiff } from "@/utils/dateUtil";
import CHomeNav from "../components/HomeNav.vue";
import CNewslist from "../components/Newslist.vue";
import MescrollVue from "mescroll.js/mescroll.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import * as type from "@/store/mutations_type.js";
import { RuleExecEngine } from "@/store/adengine/RuleExecEngine.js";
import { ipValue, getNewsList, tac_img, taccodejs } from "@/api/news";
import loadingPng from "@/assets/loading.gif";

export default {
  //  inject: ['reload'],
  data() {
    return {
      icon: {
        sina: "新浪",
        fenghuang: "凤凰",
        wuli: "唔哩头条",
        souhu: "搜狐新闻",
        zaker: "zaker"
      },
      oldCount: 0,
      count: 10,
      timer: null,
      loadingPng: loadingPng,
      loading: true,
      page: 1,
      total: 10000,
      list: [],
      ifReturnMore: true,
      pageSize: 20,
    
    };
  },
  components: {
    CHomeNav,
    CNewslist,
    MescrollVue
  },
  activated() {},
  beforeRouteEnter: (to, from, next) => {
    console.info("beforeRouterEnter from", from.path);
    if (from.path.indexOf("content") != -1) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.reloadMe();
      });
    } else {
      next();
    }
  },
  mounted() {
    console.info("taonews created", this.$route);
    //   if(this.$route.params.customerName === "720157317309198336"){
    //  	var mta = document.createElement("script");
    // 	mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
    // 	mta.setAttribute("name", "MTAH5");
    // 	mta.setAttribute("sid", "500723365");

    // 	var s = document.getElementsByTagName("script")[0];
    // 	s.parentNode.insertBefore(mta, s);

    // }
    //中青统计代码
    // if(this.$route.params.customerName === "720157317309198336"){

    //    var doc = document,
    //     h = doc.getElementsByTagName("head")[0],
    //     s = doc.createElement("script");
    //   s.async = true;
    //   s.src = "https://v1.cnzz.com/z_stat.php?id=1278986727&web_id=1278986727";
    //   s.type = "text/javascript"
    //   h && h.insertBefore(s, h.firstChild);
    // }
    //中青统计代码

    // var timer = setInterval(() => {
    //  var result = new Set();
    //   window.TencentGDT.forEach(i => {
    //     if (i.placement_id !== "7031118571986650") {
    //       result.add(i);
    //     }
    //   });
    //   if (window.totalTeng.length === result.size) {
    //     clearInterval(timer);
    //     var doc = document,
    //     h = doc.getElementsByTagName("head")[0],
    //     s = doc.createElement("script");
    //     s.async = true;
    //     s.src = "//qzs.qq.com/qzone/biz/res/i.js";
    //     h && h.insertBefore(s, h.firstChild);
    //   }
    //   console.info('setInterval setInterval')
    // }, 100);
      setTimeout(() => {
          if (window.totalTeng.length > 0) {
        var doc = document,
          h = doc.getElementsByTagName("head")[0],
          s = doc.createElement("script");
        s.async = true;
        s.src = "//qzs.qq.com/qzone/biz/res/i.js";
        h && h.insertBefore(s, h.firstChild);
        }
      }, 400);
  },
  async created() {
    //  console.info(' taoNews created window.TencentGDT',window.TencentGDT)
    this.getUserOnly();
    this.setEnterTime(Date.parse(new Date()));
    this.$store.dispatch("setSdNumber", "11");
    let jsValue = await taccodejs({ bid: this.$route.params.customerName });
    console.log("JSON.parse(jsValue.jsval)", JSON.parse(jsValue.jsval));
    let gdt = JSON.parse(jsValue.jsval);
    Object.keys(gdt).forEach(key => {
      if (gdt[key].adType === "ulh") {
        window.totalTeng.push(gdt[key].placement_id);
      }
    });
    this.setCustomerJs(JSON.parse(jsValue.jsval));
    await this.init();
  },

  watch: {
    $route(to, from) {
      this.reloadMe();
    }
  },
  computed: {
    ...mapState(["customerJs"]),
    ...mapGetters(["imageStore"]),
    history() {
      return this.$route.path;
    }
  },
  methods: {
    reloadMe() {
      location.reload();
    },
    ...mapActions(["setCustomerJs", "getNews", "setEnterTime", "setSdNumber"]),
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
    init() {
      this.getNews({
        customerName: this.$route.params.customerName,
        channelId: this.$route.params.type,
        page: this.page,
        pageSize: this.pageSize
      }).then(({ data }) => {
        this.total = data.total;
        let newList = data.list;
        let zIndex = 0;
        let nLength = newList.length - 1;
        for (let i = nLength; i > 0; i--) {
          if (newList[i].snowId === 0) {
            zIndex = i;
          }
        }
        newList.splice(zIndex, 1);

        let newList2 = [];
        newList.forEach((item, index) => {
          item.publishDate = getDateDiff(item.publishDate);
          item = RuleExecEngine.injectAdToList(
            this.$route.params.customerName,
            item,
            index,
            index
          );
          newList2.push(item);
        });
        // const nL = this.list.concat(newList2);
        this.list = newList2;

        this.list.forEach((v, index) => {
          for (let i in this.icon) {
            if (v.come) {
              if (v.come.indexOf(this.icon[i]) != -1) {
                v["icon"] = i;
              }
            }
          }
        });
        this.page++;
        this.loading = false;
      });
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    }
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
