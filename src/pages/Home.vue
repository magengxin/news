<template>
  <div class="newsList">
    <ul v-show="loading">
      <li v-for="(item, index) in listCon" :key="index">
        <!-- 两张图片 -->
        <div class="double_img_out" v-if="item.imageArray.length===2">
          <div class="double_img_title_and_info">
            <div class="news_title" v-html="item.title"></div>
            <div class="news_info">
              <span class="media_name" v-html="item.mediaName"></span>
              <span class="comment_count">评论 {{item.comment_count}}</span>
              <!-- <span class="datetime">{{item.publishtime|dateFormat}}</span> -->
            </div>
          </div>
          <img :src="item.imageArray[0].url" class="inner_img" />
        </div>

        <div class="one_img_out" v-else-if="item.imageArray.length===1">
          <div class="news_title" v-html="item.title"></div>
          <img :src="item.imageArray[0].url" class="only_img" />
          <div class="news_info">
            <span class="media_name" v-html="item.mediaName"></span>
            <!-- <span class="comment_count">评论 {{item.comment_count}}</span> -->
            <!-- <span class="datetime">{{item.publishtime|dateFormat}}</span> -->
          </div>
        </div>
        <!-- <div v-if="index === 3" ref="videoPlayer"> -->

        <!-- </div> -->

        <div class="more_img_out" v-else-if="item.imageArray.length > 2">
          <div class="news_title" v-html="item.title"></div>
          <div class="news_imgs">
            <img
              class="inner_img"
              v-if="imgIdx < 3"
              v-for="(imgItem,imgIdx) in item.imageArray"
              :src="imgItem.url"
              :key="imgIdx"
            />
          </div>


          <div class="news_info">
            <span class="media_name" v-html="item.mediaName"></span>
            <span class="comment_count">评论 {{item.comment_count}}</span>
          </div>
        </div>
        <div class="one_img_out">
          <div class="double_img_title_and_info">
            <div class="news_title" v-html="videoInfo.title"></div>
          </div>

          <div style="margin-bottom:20px ;"></div>
        </div>
        <div v-if="item.adType !== undefined" class="ali">
           <component :is="item.adType" :info="item.info"></component>
          <div class="line"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import loadingPng from "@/assets/loading2.gif";
import baidu from "../components/ad/BaiduAdA.vue";
import tuiya from "../components/ad/TuiYaAd.vue";
import videoPlayer from "../components/VideoPlayer.vue";
import sougou from "../components/ad/SougouAd.vue";
import shengmi from "../components/ad/ShengMi.vue";
import kuaiguo from "../components/ad/KuaiGuoAd.vue";
import { getNewsList } from "@/api/news";

export default {
 
  created() {
    this.screenWidth = window.screen.width;
    switch (window.screen.width) {
      case 320: {
        this.scale_w = 1;
        break;
      }
      case 375: {
        this.scale_w = 2;
        break;
      }
      default: {
        this.scale_w = 3;
        break;
      }
    }

    this.mobile =
      navigator.appVersion.indexOf("iPhone") !== -1 ? "iPhone" : "android";
    getNewsList({
      customerName: "652851733765410816",
      channelId: 1,
      page: this.page,
      pageSize: this.pageSize
    })
      .then(({ data }) => {
        let listA = data.list;
        for (let i = 0; i < listA.length; i++) {
          if (i % 2 === 0) {
            listA[i].adType = "kuaiguo";
            listA[i].info = {
              url: "//ssp.huayuidc.com/js/127741.js",
              divId: i + "kuaiguo",
              id:'_gg_127741'
            };
          }
        }
        this.listCon = listA;
      })
  },
  data() {
    return {
      // newsList: [],
      page: 1,
      mobile: "",

      pageSize: 10,
      listCon: [],
      baiduAdCount: 0,
      loading: true,
      newsCount: 0,
      screenWidth: 0,
      scale_w: 1,
      videoInfo: {
        title: "辽宁老年干部大学民族斗笠舞蹈傣族情",
        url_mp4:
          "http://kvideo01.youju.sohu.com/edb5369c-bcd1-4342-9150-56e5ee5548972_0_0.mp4?vid=166209551&uid=1608272337357415&plat=17&SOHUSVP=pxq2ao0RE6vu58hamqr2MccG_uxoECu88xZ4e3G6LBA&pt=1&prod=56&pg=1&eye=0&cv=1.0.0&qd=68000&src=11050001&ca=4&cateCode=324&_c=1&appid=tv",
        url_l: [
          "http://kvideo01.youju.sohu.com/edb5369c-bcd1-4342-9150-56e5ee5548972_0_0.mp4?vid=166209551&uid=1608272337357415&plat=17&SOHUSVP=pxq2ao0RE6vu58hamqr2MccG_uxoECu88xZ4e3G6LBA&pt=1&prod=56&pg=1&eye=0&cv=1.0.0&qd=68000&src=11050001&ca=4&cateCode=324&_c=1&appid=tv"
        ]
      },
      isAppleDevice: navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad)/i
      )
    };
  },
  computed: {
    ...mapState(["loadmore", "ifReturnMore", "adConfig"])
  },

  components: {
    // CLoadmore
    baidu,
    tuiya,
    sougou,
    shengmi,
    aliAd,
    kuaiguo,
    videoPlayer
  },
  filters: {
    dateFormat(time) {
      return moment(time)
        .startOf("mimute")
        .fromNow();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.adIframe {
  width: 100%;
}
</style>
