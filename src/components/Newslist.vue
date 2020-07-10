<template>
  <div class="newsList">
    

      
      <!-- target="_blank" -->
      <ul>
        <li v-for="(item, index) in listCon" :key="index">
          <div v-if="item.hasOwnProperty('listIndexAd0') ">
            <div
              v-track-event="{category : '列表固定位置广告0', action :item.listIndexAd0.adType , label :customerName }"
            >
              <component
                v-bind:is="item.listIndexAd0.adType"
                 :randomId="Math.floor(Math.random() * 100000)"
                :info="item.listIndexAd0"
              />
            </div>

            <div v-if="item.listIndexAd0.adType !== 'tengcentAd'" class="line"></div>
          </div>
          <router-link
            v-if="customerName === '684650651064819712'"
            :to="item.snowId === 0?{path :'/adIframe',query : {url:item.sourceUrl}}:{ path : '/content/' + customerName + '/' + item.snowFuck, query : {id:item.snowFuck,time : new Date().getTime(), history : history,flag1:true}}"

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
                  <span class="media_name" v-html="item.come" />
                  <!-- <span class="media_name" v-html="item.publishDate" /> -->
                </div>
              </div>
              <div class="jiange"></div>
              <img v-if="item.contentType !== 14" :src="item.imageArray[0].url" class="inner_img" />
            </div>

            <div class="one_img_out" v-else-if="item.contentType === 10">
              <div class="news_title" v-html="item.title"></div>
              <div class="news_info">
                <img v-if="item.icon" :src="icon[item.icon]" class="icon_img" />

                <span class="media_name" v-html="item.come" />

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

                <span class="media_name" v-html="item.come" />

                <!-- <span class="media_name" v-html="item.publishDate" /> -->
              </div>
            </div>
            <div class="line"></div>
          </router-link>
          <router-link
            :to="item.snowId === 0?{path :'/adIframe',query : {url:item.sourceUrl}}:{ path : '/content/' + customerName + '/' + item.snowFuck, query : {id:item.snowFuck,time : new Date().getTime(), history : history,flag1:true}}"
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
                  <span class="media_name" v-html="item.come" />
                  <!-- <span class="media_name" v-html="item.publishDate" /> -->
                </div>
              </div>
              <div class="jiange"></div>
              <img v-if="item.contentType !== 14" :src="item.imageArray[0].url" class="inner_img" />
            </div>

            <div class="one_img_out" v-else-if="item.contentType === 10">
              <div class="news_title" v-html="item.title"></div>
              <div class="news_info">
                <img v-if="item.icon" :src="icon[item.icon]" class="icon_img" />

                <span class="media_name" v-html="item.come" />

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

                <span class="media_name" v-html="item.come" />

                <!-- <span class="media_name" v-html="item.publishDate" /> -->
              </div>
            </div>
            <div class="line"></div>
          </router-link>

          <div v-if="item.hasOwnProperty('listIndexAd') ">
            <div
              v-track-event="{category : '列表固定位置广告1' , action :item.listIndexAd.adType , label :customerName }"
            >
              <component
                v-bind:is="item.listIndexAd.adType"
                :randomId="Math.floor(Math.random() * 100000)"
                :info="item.listIndexAd"
              />
            </div>
            <div v-if="item.listIndexAd.adType !== 'tengcentAd'" class="line"></div>
          </div>

          <div v-if="item.hasOwnProperty('listIndexAd2') ">
            <div
              v-track-event="{category : '列表固定位置广告2' , action :item.listIndexAd2.adType , label :customerName}"
            >
              <component
                v-bind:is="item.listIndexAd2.adType"
                :randomId="Math.floor(Math.random() * 100000)"
                :info="item.listIndexAd2"
              />
            </div>

            <div v-if="item.listIndexAd2.adType !== 'tengcentAd'" class="line"></div>
          </div>

          <div v-if="item.hasOwnProperty('listIndexAd3') ">
            <div
              v-track-event="{category :'列表固定位置广告3' , action :item.listIndexAd3.adType , label :customerName }"
            >
              <component
                v-bind:is="item.listIndexAd3.adType"
                :randomId="Math.floor(Math.random() * 100000)"
                :info="item.listIndexAd3"
              />
            </div>

            <div v-if="item.listIndexAd3.adType !== 'tengcentAd'" class="line"></div>
          </div>
          <div v-if="item.hasOwnProperty('listIndexAd4') ">
            <div
              v-track-event="{category : '列表固定位置广告4', action :item.listIndexAd4.adType , label : customerName}"
            >
              <component
                v-bind:is="item.listIndexAd4.adType"
                :randomId="Math.floor(Math.random() * 100000)"
                :info="item.listIndexAd4"
              />
            </div>

            <div v-if="item.listIndexAd4.adType !== 'tengcentAd'" class="line"></div>
          </div>

          <div
            v-if="customerJs.hasOwnProperty('listAd') && item.hasOwnProperty('info')"
          >
            <div
              v-track-event="{category : '列表', action : item.info.adType , label : item.info.id}"
            >
              <component
                v-bind:is="item.info.adType"
                :info="item.info"
                :tacType="'listAd'"
                :randomId="'divId'+Math.floor(Math.random() * 100000)"
              />
              <div v-if="item.info.adType !== 'tengcentAd'" class="line"></div>
            </div>
          </div>
        </li>
      </ul>

    <div v-if="customerJs.hasOwnProperty('footerFixedAd') " class="fixed-ad">
      <div v-track-event="{category : '底部悬浮', action : customerName }">
        <component
          v-bind:is="customerJs.footerFixedAd.adType"
          :info="customerJs.footerFixedAd"
          :tacType="'footerFixedAd'"
          :randomId="Math.floor(Math.random() * 100000)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

import fenghuang from "@/assets/icon/fenghuang.png";
import wuli from "@/assets/icon/wuli.png";
import zaker from "@/assets/icon/zaker.png";
import souhu from "@/assets/icon/souhu.png";
import sina from "@/assets/icon/sina.png";

export default {
  components: {
    moment
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
      let newLen = newVal.length;
      this.newsCount = newLen;
      this.$nextTick(() => {});
    }
  },
  mounted() {

  },

  methods: {

  }
};
</script>
<style lang="scss" scoped>
.adIframe {
  width: 100%;
}
</style>
