<template>
  <div class="newsList">
  <ul>
    <li v-for="(item, index) in listCon" :key="index">
      <router-link
        :to="{ path:'/content/' + customerName+'/'+item.snowFuck,query:{time:new Date().getTime(),history:history}}"
        class="news_box"
        v-show="item.title"
      >
        <!-- 两张图片 -->
        <div class="double_img_out" v-if="item.contentType === '12' || item.contentType === '19' || item.contentType === '11' || item.contentType === '14'">
          <div class="double_img_title_and_info">
            <div class="news_title" v-html="item.title"></div>
            <div class="news_info">
              <img v-if="item.icon" :src="icon[item.icon]" class="icon_img"/>
              <span class="media_name" v-html="item.come"/>
              <!-- <span class="media_name" v-html="item.publishDate"/> -->
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
            <!-- <span class="media_name" v-html="item.publishDate"/> -->
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
             <!-- <span class="media_name" v-html="item.publishDate"/> -->
           </div>
        </div>
      </router-link>
            <div class="line"></div>
             <div v-if="customerJs.hasOwnProperty('recommendAd')  && index===2">
              <div
                v-track-event="{category : '相关推荐' , action : $route.params.customerName }"
              >
                <component
                  v-bind:is="customerJs.recommendAd.adType"
                  :info="customerJs.recommendAd"
                  :tacType="'recommendAd'"
                  :randomId="Math.floor(Math.random() * 100000)"
                />
              </div>
            </div>

    </li>
  </ul>

  </div>
</template>

<script>
import { mapState } from "vuex";
import CLoadmore from "./Loadmore.vue";
import moment from "moment";
import MescrollVue from "mescroll.js/mescroll.vue";


import loadingPng from "@/assets/loading2.gif";
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
  CLoadmore,
  moment,
  MescrollVue,
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
