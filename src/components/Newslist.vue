<template>
  <div class="newsList">
    <ul v-show="loading">
      <li v-for="(item, index) in listCon" :key="index">
        <router-link
          v-if="customerName === '684650651064819712'"
          :to="item.snowId === 0?{path :'/adIframe',query : {url:item.sourceUrl}}:{ path : '/content/' + customerName + '/' + item.snowFuck, query : {id:item.snowFuck,time : new Date().getTime(), history : history,flag1:true}}"
          target="_blank"
          class="news_box"
          v-show="item.title"
        >
          <!-- 两张图片 -->
          <div
            class="double_img_out"
            v-if="item.contentType === 12 || item.contentType === 11 || item.contentType === 19 || item.contentType === 14"
          >
            <div class="double_img_title_and_info">
              <div class="news_title" v-html="item.title"></div>
              <div class="news_info">
                <img v-if="item.icon" :src="icon[item.icon]" class="icon_img" />
                <!-- <span class="media_name" v-html="item.come" /> -->
                <!-- <span class="media_name" v-html="item.publishDate" /> -->
              </div>
            </div>
            <div class="jiange"></div>
            <img v-if="item.contentType !== 14" :src="item.imageArray[0].url" class="inner_img" />

            <div
              v-else
              :style="{'background-image' : 'url(' + item.imageArray[0].url + ') '}"
              class="inner_div"
            >
              <img :src="playPng" alt />
            </div>
          </div>

          <div class="one_img_out" v-else-if="item.contentType === 10">
            <div class="news_title" v-html="item.title"></div>
            <div class="news_info">
              <img v-if="item.icon" :src="icon[item.icon]" class="icon_img" />

              <!-- <span class="media_name" v-html="item.come" /> -->

              <!-- <span class="media_name" v-html="item.publishDate" /> -->
            </div>
          </div>

          <div class="more_img_out" v-else-if="item.contentType === 13">
            <div class="news_title" v-html="item.title"></div>
            <div class="news_imgs">
              <img
                class="inner_img"
                v-if="imgIdx < 3"
                v-for="(imgItem, imgIdx) in item.imageArray"
                :src="imgItem.url"
                :key="imgIdx"
                alt
              />
            </div>
            <div class="news_info">
              <img v-if="item.icon" :src="icon[item.icon]" class="icon_img" />

              <!-- <span class="media_name" v-html="item.come" /> -->

              <!-- <span class="media_name" v-html="item.publishDate" /> -->
            </div>
          </div>
          <div class="line"></div>
        </router-link>
        <router-link
          :to="item.snowId === 0?{path :'/adIframe',query : {url:item.sourceUrl}}:{ path : '/content/' + customerName + '/' + item.snowFuck, query : {id:item.snowFuck,time : new Date().getTime(), history : history,flag1:true}}"
          target="_blank"
          class="news_box"
          v-else
          v-show="item.title"
        >
          <!-- 两张图片 -->
          <div
            class="double_img_out"
            v-if="item.contentType === 12 || item.contentType === 11 || item.contentType === 19 || item.contentType === 14"
          >
            <div class="double_img_title_and_info">
              <div class="news_title" v-html="item.title"></div>
              <div class="news_info">
                <img v-if="item.icon" :src="icon[item.icon]" class="icon_img" />
                <!-- <span class="media_name" v-html="item.come" /> -->
                <!-- <span class="media_name" v-html="item.publishDate" /> -->
              </div>
            </div>
            <div class="jiange"></div>
            <img v-if="item.contentType !== 14" :src="item.imageArray[0].url" class="inner_img" />

            <div
              v-else
              :style="{'background-image' : 'url(' + item.imageArray[0].url + ') '}"
              class="inner_div"
            >
              <img :src="playPng" alt />
            </div>
          </div>

          <div class="one_img_out" v-else-if="item.contentType === 10">
            <div class="news_title" v-html="item.title"></div>
            <div class="news_info">
              <img v-if="item.icon" :src="icon[item.icon]" class="icon_img" />

              <!-- <span class="media_name" v-html="item.come" /> -->

              <!-- <span class="media_name" v-html="item.publishDate" /> -->
            </div>
          </div>

          <div class="more_img_out" v-else-if="item.contentType === 13">
            <div class="news_title" v-html="item.title"></div>
            <div class="news_imgs">
              <img
                class="inner_img"
                v-if="imgIdx < 3"
                v-for="(imgItem, imgIdx) in item.imageArray"
                :src="imgItem.url"
                :key="imgIdx"
                alt
              />
            </div>
            <div class="news_info">
              <img v-if="item.icon" :src="icon[item.icon]" class="icon_img" />

              <!-- <span class="media_name" v-html="item.come" /> -->

              <!-- <span class="media_name" v-html="item.publishDate" /> -->
            </div>
          </div>
          <div class="line"></div>
        </router-link>

        <div v-if="item.hasOwnProperty('xiaoshuo') && customerJs.adsSwitch">
          <div v-track-event="{category : customerName, action :'小说' , label : '小说'}">
            <xiaoshuo :info="item.xiaoshuo"></xiaoshuo>
          </div>
        </div>
        <div
          v-if="customerJs.hasOwnProperty('listAd') && customerJs.adsSwitch&& item.hasOwnProperty('info')"
        >
          <div
            v-track-event="{category : customerName, action : item.info.adType , label : item.info.id}"
          >
            <component
              v-bind:is="item.info.adType"
              :info="item.info"
              :randomId="'divId'+Math.floor(Math.random() * 100000)"
            />
            <div class="line"></div>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="customerJs.hasOwnProperty('footerFixedAd') && customerJs.adsSwitch" class="fixed-ad">
      <div v-track-event="{category : customerName, action : customerJs.footerFixedAd.adType }">
        <component
          v-bind:is="customerJs.footerFixedAd.adType"
          :info="customerJs.footerFixedAd"
          :randomId="Math.floor(Math.random() * 100000)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

import baidu from "../components/ad/BaiduAdA.vue";
import baidub from "../components/ad/BaiduAdB.vue";
import baidudyad from "./ad/baidudyad.vue";
import bianxianmaojs from "../components/ad/BianXianMaoJs.vue";
import bxmapi from "@/components/ad/BianXianMaoApi";
import doumenglist from "../components/ad/DouMengList.vue";
import doumengjs from "@/components/ad/DouMengJs.vue";
import ExternalUrl from "./ad/ExternalUrl.vue";
import fixedImg from "./ad/fixedImg.vue";
import kuaiguo from "../components/ad/KuaiGuoAd.vue";
import sougou from "../components/ad/SougouAd.vue";
import shengmi from "../components/ad/ShengMi.vue";
import tengcentAd from "../components/ad/tengcentAd.vue";
import xiaoshuo from "../components/ad/xiaoshuo.vue";
import wubaad from "../components/ad/wubaad.vue";
import wapzhanyue from "@/components/ad/wapzhanyue";
import wulitoutiao from "../components/ad/wuliAd.vue";
import wlgdt from "../components/ad/wlgdtAd.vue";
import wubaapi from "@/components/ad/wubaapi";
import wulibst from "@/components/ad/wulibst";

import fenghuang from "@/assets/icon/fenghuang.png";
import playPng from "@/assets/play.png";
import wuli from "@/assets/icon/wuli.png";

import zaker from "@/assets/icon/zaker.png";
import souhu from "@/assets/icon/souhu.png";
import sina from "@/assets/icon/sina.png";

export default {
  components: {
    // CLoadmore
    baidu,
    baidub,
    wubaad,
    wubaapi,
    tengcentAd,
    wulitoutiao,
    wapzhanyue,
    sougou,
    ExternalUrl,
    baidudyad,
    wlgdt,
    bxmapi,
    fixedImg,
    shengmi,
    kuaiguo,
    doumenglist,
    bianxianmaojs,
    doumengjs,
    wulibst,
    xiaoshuo
  },

  filters: {
    dateFormat(time) {
      return moment(time)
        .startOf("mimute")
        .fromNow();
    }
  },

  props: {
    // 新闻列表
    listCon: {
      require: true
    },
    // 是否可以请求更多
    ifLoadmore: {
      default: true
    },
    // 是否请求
    flag: {
      require: true
    },
    // 请求是否成功
    ifFlag: {
      require: true
    },
    // 渠道
    customerName: {
      require: true
    },
    // 类型
    type: {
      require: true
    }
  },
  data() {
    return {
      icon: {
        sina,
        fenghuang,
        wuli,
        souhu,
        zaker
      },
      // newsList: [],
      playPng: playPng,
      loading: true,
      newsCount: 0
    };
  },
  computed: {
    ...mapState(["loadmore", "ifReturnMore", "adConfig", "customerJs"]),
    history() {
      return this.$route.path;
    }
  },
  watch: {
    listCon: function(newVal, oldVal) {
      let oldLen = this.newsCount;
      console.info("..newVal", newVal);
      let newLen = newVal.length;
      this.newsCount = newLen;
      this.$nextTick(() => {});
    }
  },
  mounted() {},

  methods: {
    openAd(url) {
      window.open(
        url // "https://engine.lvehaisen.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=315106"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.adIframe {
  width: 100%;
}
</style>
