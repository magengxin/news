<template>
  <div class="content-container">
    <div v-if="customerJs.hasOwnProperty('contenttop') " class="content-top" v-track-event="{category : '顶部固定', action : customerName }">
        <component
          v-bind:is="customerJs.contenttop.adType"
          :info="customerJs.contenttop"
          :tacType="'footerFixedAd'"
          :randomId="Math.floor(Math.random() * 100000)"
        />
    </div>
    <div v-if="customerJs.hasOwnProperty('contentdown') " class="content-down" v-track-event="{category : '底部固定', action : customerName }">
        <component
          v-bind:is="customerJs.contentdown.adType"
          :info="customerJs.contentdown"
          :tacType="'footerFixedAd'"
          :randomId="Math.floor(Math.random() * 100000)"
        />
    </div>
      <div class="detail" ref="content" v-show="loading">
        <div class="container">
          <div class="content-head">
            <h2
              class="detail-title"
              :class="[this.$route.query.flag1 ? 'head' : '']"
              :id="[this.$route.query.flag1 ? 'head' : '']"
              :data-d="[this.$route.query.flag1 ? '娱乐21www' : '']"
            >{{detail.title}}</h2>
                  <!-- <gdt2></gdt2> -->
            <div class="media_name" style="display: block">
              <img v-if="detail.icon" :src="icon[detail.icon]" class="icon_img" />

              <span class="name" v-html="detail.come"></span>
              <!-- <span v-html="detail.publishDate" /> -->
            </div>
          </div>
          <div v-if="customerJs.hasOwnProperty('contentHeadAd')">
            <div class="line"></div>
            <div
              v-track-event="{category : '详情顶部', action :  $route.params.customerName }"
            >
              <component
                v-bind:is="customerJs.contentHeadAd.adType"
                :info="customerJs.contentHeadAd"
                :randomId="Math.floor(Math.random() * 100000)"
              />
            </div>
            <div class="line"></div>
          </div>

          <div
            class="contentNews"
            :class="[this.$route.query.flag1 ? 'article' : '']"
            :id="[this.$route.query.flag1 ? 'article' : '']"
            :style="{height:contentStatus?realHeight:'100%'}"
            ref="bodyFont"
          >
            <div v-if="detail.imageArray && detail.imageArray.length>0">
              <a
                v-if="detail.imageArray[0].mapping ===-1 && detail.contentType!==14"
                :href="detail.imageArray[0].url"
                download
              >
                <img
                  :src="detail.imageArray[0].url"

                  style="width: 100%;border-radius: 4px; object-fit: cover"
                />
              </a>
            </div>

            <div class="paras" v-for="(pitem,paraIdx) in  detail.paraArray" :key="paraIdx">
              <div>{{pitem.para}}</div>
              <div v-if="detail.imageArray && detail.imageArray.length>0">
                <div v-for="(img, imgIdx) in detail.imageArray" :key="imgIdx">
                  <a :href="img.url" download>
                    <img
                      v-if=" detail.imageArray[imgIdx].mapping === paraIdx"
                      :src="img.url"
                      style="width: 100%;border-radius: 4px; object-fit: cover"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="contentToggle"
            type="text"
            v-if="contentStatus"
            @click="contentStatus=!contentStatus"
          >
            <p>展开全文</p>
            <img class="down" :src="readMore" />
          </div>
          <div class="content-foot">
            <div class="ann">
              <br />
              <p>版权与免责声明：</p>
              <p>本文内容转载自其他媒体，目的在于传递更多信息，并不代表本网赞同其观点或证实其内容的真实性。不承担此类作品侵权行为的直接责任及连带责任。</p>
            </div>
            <div class="line"></div>
            <div v-if="customerJs.hasOwnProperty('contentFootAd') ">
              <div
                v-track-event="{category :'详情底部', action : $route.params.customerName }"
              >
                <component
                  v-bind:is="customerJs.contentFootAd.adType"
                  :info="customerJs.contentFootAd"
                  :randomId="Math.floor(Math.random() * 100000)"
                />
                   <div class="line"></div>
              </div>
            </div>
          </div>
          <div>
            <div class="tuijiantitle">
              <div class="red"></div>
              <div class="xiangguan">相关推荐</div>
            </div>
            <tuijian :listCon="tuijian" :history="history" :customerName="customerName"></tuijian>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import CLoading from "../components/Loading.vue";
import moment from "moment";
import "moment/locale/zh-cn";
import tuijian from "../components/tuijianList.vue";
import { mapState } from "vuex";
import { getArticle } from "@/api/news";
import { getDateDiff } from "@/utils/dateUtil";
import router from "@/router";
import store from "@/store";
import readMore from "@/assets/readMore.png";
import loadingPng from "@/assets/loading2.gif";
import wuli from "@/assets/icon/wuli.png";
import zaker from "@/assets/icon/zaker.png";
import fenghuang from "@/assets/icon/fenghuang.png";
import souhu from "@/assets/icon/souhu.png";
import sina from "@/assets/icon/sina.png";

export default {
  components: {
        tuijian,
        CLoading,
        moment,
  },
  inject: ["reload"],
  data() {
    return {
      findIcon: {
        sina: "新浪",
        fenghuang: "凤凰",
        wuli: "唔哩头条",
        souhu: "搜狐新闻",
        zaker: "zaker"
      },
      icon: {
        sina,
        fenghuang,
        wuli,
        souhu,
        zaker
      },
      flag: true,
      readMore: readMore,
      tuijian: [],
      mescroll: {},
      realHeight: 0,
      scrollTop: 0,
      loadingPng: loadingPng,
      sougouAd1: "sogou_wap_1081165",
      loading: false,
      contentStatus: true,
      detail: {},
      screenWidth: 0,
      customerName: this.$route.params.customerName,
      isAppleDevice: navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad)/i
      ),
      fuel_time: [], // 用户停留时间
      snowFlakeid: "", // 用户id
      fuel_timeFlag: true // 用户flag
    };
  },

  created() {
    this.screenWidth = window.screen.width;

    // 获取用户停留时长
    this.recordingTimerView();

    // 获取用户访问历史记录
    this.historyData();
  },

  mounted() {
    this.contentStatus = true;
    this.realHeight = 0;
    this.getDetail();
  },
  updated() {
    if (this.customerJs.keyword) {
      this.init1();
    }
  },

  beforeDestroy() {},
  destroyed() {},
  methods: {

    init1() {
      function getDevice_os() {
        var ua = navigator.userAgent;
        if (/android/.test(ua)) {
          return "android";
        } else if (/iphone/.test(ua)) {
          return "ios";
        }
        return "";
      }

      (function() {
        var css = document.createElement("link");
        css.rel = "stylesheet";
        css.href =
          "https://dler-zhijian-effect.oss-cn-beijing.aliyuncs.com/deepleaper-H5/web_ad/deepleaper-midas/src/index.css" +
          "?v=" +
          parseInt(Math.random() * 1000000000);
        document.getElementsByTagName("head")[0].appendChild(css);
        var hm = document.createElement("script");
        hm.src =
          "https://dler-zhijian-effect.oss-cn-beijing.aliyuncs.com/deepleaper-H5/web_ad/deepleaper-midas/src/dler-midas-v1.0.0.js" +
          "?v=" +
          parseInt(Math.random() * 1000000000);
        hm.className = "deepleaper-midas";
        hm.setAttribute(
          "data-post-url",
          '"https://publisher-api.deepleaper.com/midas"'
        );
        hm.setAttribute(
          "data-feed-upload",
          '"https://publisher-api.deepleaper.com/signpost-feed-upload"'
        );
        hm.setAttribute("data-slot", '"e6a37e99-5721-4cec-8e1c-5645c43816dc"');
        hm.setAttribute(
          "data-publisher-id",
          '"45ec3859-8a20-4ac6-8794-7795e9195b9e_9"'
        );
        hm.setAttribute("data-bundle", '"xinwen"');
        hm.setAttribute("data-title-classname", '"head"');
        hm.setAttribute("data-content-classname", '"article"');
        hm.setAttribute(
          "data-setting",
          '{"font_family":"SYH","font_size":"24","font_color":"#0067FF"}'
        );
        hm.setAttribute("data-category", '"娱乐"');
        hm.setAttribute("data-feed-id-type", '"1"');
        hm.setAttribute("data-feed-id", '"id"'); // 文章id
        hm.setAttribute("data-uid-type", '"session"');
        hm.setAttribute("data-join-type", "3");

        hm.setAttribute("data-uid-encryption", "NA");
        hm.setAttribute("data-device-os", getDevice_os());
        hm.setAttribute("data-content-type", "h5");
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    },
    recordingTimerView(param) {
      this.fuel_time = JSON.parse(localStorage.getItem("fuel_time"));
      this.snowFlakeid = this.$route.params.snowFlakeid;
      let obj = {};

      if (param === "router") {
        for (var i = 0; i < this.fuel_time.length; i++) {
          let v = this.fuel_time[this.fuel_time.length - 1];
          if (v) {
            v.endTime = new Date().getTime();
          }
        }
      }

      if (this.snowFlakeid) {
        obj.id = this.snowFlakeid;
        obj.startTime = new Date().getTime();
        this.fuel_time.push(obj);
      }

      localStorage.setItem("fuel_time", JSON.stringify(this.fuel_time));
    },
    historyData() {
      let currentData = {
        path: router.history.current.path,
        customerName: this.$route.name
      };
      store.dispatch("setPathListA", currentData);
    },
    randomId() {
      return "kuaiguo" + Math.floor(Math.random() * 100000);
    },
    setHidden() {
      if (this.isAppleDevice) {
        this.realHeight =
          (document.documentElement.clientHeight - 650) / 64 + "rem";
      } else {
        this.realHeight =
          (document.documentElement.clientHeight + 600) / 64 + "rem";
      }
    },
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    getDetail() {
      const customerName = this.$route.params.customerName;
      const snowFlakeid = this.$route.params.snowFlakeid;
      getArticle(customerName, snowFlakeid).then(v => {
        let det = v.data;
        det.publishDate = getDateDiff(det.publishDate);

        this.detail = det;
        for (let i in this.icon) {
          if (this.detail.come) {
            if (this.detail.come.indexOf(this.findIcon[i]) != -1) {
              this.detail["icon"] = i;
            }
          }
        }

        let tuijian = det.list;
        let newList2 = [];

        tuijian.forEach((item, index) => {
          item.imageArray = JSON.parse(item.imageArray);

          item.publishDate = getDateDiff(item.publishDate);
          for (let i in this.icon) {
            if (item.come) {
              if (item.come.indexOf(this.findIcon[i]) != -1) {
                item["icon"] = i;
              }
            }
          }
          newList2.push(item);
        });

        this.tuijian = newList2;
        this.loading = true;
        if (
          this.detail.contentType === 14 ||
          this.detail.contentType === 11 ||
          this.detail.contentType === 19
        ) {
          this.contentStatus = false;
        } else {
          this.setHidden();
        }
      });
      this.loading = false;
    }
  },
  computed: {
    ...mapState([
      "ifReturnMsg",
      "hasParagraph",
      "contentType",
      "localCollection",
      "adConfig",
      "customerJs"
    ]),
    history: function() {
      return this.$route.query.history;
    },
  },
  watch: {
    $route(to, from) {
      this.loading = true;
      if (to.path.includes("content")) {
        this.getDetail();
        this.$nextTick(() => {
          this.mescroll.scrollTo(0, 0);
        });
      }

      this.recordingTimerView("router");
      this.historyData();
    }
  },
  filters: {
    dateFormat(time) {
      return moment(time)
        .startOf("mimute")
        .fromNow();
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === from.name) {
      if (to.query.time < from.query.time) {
        next(this.history);
      }
    }
    next();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
@import "../assets/style/content.scss";
.tuijiantitle {
  margin: px2rem(20px) 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  .red {
    border: 1px rgba(254, 109, 107, 1) solid;
    background:rgba(254, 109, 107, 1) ;
    height: px2rem(32px);
    width: px2rem(2px);
  }
  .xiangguan {
    margin-left: px2rem(6px);
    @include font-dpr(17px);
    line-height: px2rem(17px);

    font-weight: 500;
    color: rgba(64, 64, 64, 1);
  }
}

.bodyFont {
  word-break: break-all;
  word-wrap: break-word;
  height: auto;
  overflow: hidden;
  max-height: 100%;
  p {
    margin: 16px 0 0 0;
  }
}
.bodyHeight {
  height: px2rem(400px);
  overflow: hidden;
}

.position-box {
  position: fixed;
  top: px2rem(20px);
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
}
</style>

