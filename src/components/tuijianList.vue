<template>
  <div class="newsList">
  <ul>
    <li v-for="(item, index) in listCon" :key="index">
      <router-link
        :to="{ path:'/content/' + customerName+'/'+item.snowFuck,query:{time:new Date().getTime(),history:history}}"
        class="news_box"
                target="_blank"
        v-show="item.title"
      >
        <!-- 两张图片 -->
        <div class="double_img_out" v-if="item.contentType === '12' || item.contentType === '19' || item.contentType === '11' || item.contentType === '14'">
          <div class="double_img_title_and_info">
            <div class="news_title" v-html="item.title"></div>
            <div class="news_info">
              <img v-if="item.icon" :src="icon[item.icon]" class="icon_img"/>
              <span class="media_name" v-html="item.come"/>
              <span class="media_name" v-html="item.publishDate"/>
            </div>
          </div>
          <div class="jiange"></div>
          <img :src="item.imageArray[0].url" class="inner_img"  alt=""/>
        </div>


        <div class="one_img_out" v-else-if="item.contentType === '10'">
          <div class="news_title" v-html="item.title"></div>
          <div class="news_info">
            <img v-if="item.icon" :src="icon[item.icon]" class="icon_img"/>
            <span class="media_name" v-html="item.come"/>
            <span class="media_name" v-html="item.publishDate"/>
          </div>
        </div>

        <div class="more_img_out" v-else-if="item.contentType === '13'">
          <div class="news_title" v-html="item.title"></div>
          <div class="news_imgs">
            <img
              class="inner_img"
              v-if="imgIdx < 3"
              v-for="(imgItem,imgIdx) in item.imageArray"
              :src="imgItem.url"
              :key="imgIdx"
             alt=""/>
          </div>
           <div class="news_info">
             <img v-if="item.icon" :src="icon[item.icon]" class="icon_img"/>
             <span class="media_name" v-html="item.come"/>
             <span class="media_name" v-html="item.publishDate"/>
           </div>
        </div>
      </router-link>
            <div v-if="customerJs.hasOwnProperty('recommendAd') && customerJs.adsSwitch && index===2">
              <div
                v-track-event="{category : $route.params.customerName, action : customerJs.recommendAd.type,label:'详情推荐广告' }"
              >
                <component
                  v-bind:is="customerJs.recommendAd.adType"
                  :info="customerJs.recommendAd"
                  :randomId="Math.floor(Math.random() * 100000)"
                />
              </div>
            </div>
      <div class="line"></div>
    </li>
  </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CLoadmore from "./Loadmore.vue";
import moment from "moment";
import loadingPng from "@/assets/loading2.gif";
import ExternalUrl from "../components/ad/ExternalUrl.vue";
import baidu from "../components/ad/BaiduAdA.vue";
import baidub from "../components/ad/BaiduAdB.vue";
import sougou from "../components/ad/SougouAd.vue";
import doumenglist from "../components/ad/DouMengList.vue";
import doumengjs from "../components/ad/DouMengJs.vue";
import kuaiguo from "../components/ad/KuaiGuoAd.vue";
import tuijian from "../components/tuijianList.vue";
import baidudyad from "@/components/ad/baidudyad.vue";
import MescrollVue from "mescroll.js/mescroll.vue";
import wubaad from "../components/ad/wubaad.vue";
import wlgdt from "../components/ad/wlgdtAd.vue";
import bianxianmaojs from "../components/ad/BianXianMaoJs.vue";
import shengmi from "../components/ad/ShengMi.vue";
import wapzhanyue from "@/components/ad/wapzhanyue";
import wubaapi from "@/components/ad/wubaapi";
import wulibst from "@/components/ad/wulibst";
import wulitoutiao from "../components/ad/wuliAd.vue";
import { customerAd } from "@/store/adengine/customerAd.js";

import wuli from '@/assets/icon/wuli.png';
import zaker from '@/assets/icon/zaker.png';
import fenghuang from '@/assets/icon/fenghuang.png';
import souhu from '@/assets/icon/souhu.png';
import sina from '@/assets/icon/sina.png';

export default {
  props: {
    history: "",
    listCon: Array,
    customerName: {
      require: true
    },

  },
  components: {
    // CLoadmore
   baidu,
    baidub,
    bianxianmaojs,
    baidudyad,
    doumenglist,
    doumengjs,
    ExternalUrl,
    wulitoutiao,
    kuaiguo,
    MescrollVue,
    sougou,
    shengmi,
    tuijian,
    wlgdt,
    wubaapi,
    wulibst,
    wubaad,
    wapzhanyue
  },
  data() {
    return {
      icon:{
        sina,
        fenghuang,
        wuli,
        souhu,
        zaker,
      },
    };
  },
  computed:{
       ...mapState([
      "adConfig",
      "customerJs"
    ]),

  }
};
</script>

<style lang="scss" scoped>
.newsList{
  padding: 0;
}

</style>
