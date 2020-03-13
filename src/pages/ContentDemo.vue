<template>
  <div class="content-container">
    <div v-show="!loading" class="loading">
      <img class="back" :src="loadingPng" alt />
    </div>
    <div class="detail" v-show="loading">
      <div class="container">
        <h2 class="detail-title">{{detail.title}}</h2>
        <div class="media_name">
          <span class="name" v-html="detail.mediaName"></span>
        </div>
        <component :is="contentHeadAd.type" :info="contentHeadAd.info"></component>
        <!-- <cat-ad></cat-ad> -->
        <div
          class="contentNews bodyFont clearfloat"
          id="contFromParas"
          ref="bodyFont"
          :class="{bodyHeight:contentStatus}"
        >
          <div v-html="content"></div>

        </div>
        <div class="contentToggle" v-if="contentStatus" @click="contentStatus=!contentStatus">阅读全文</div>
        <div class="ann">
          <br />
          <p>版权与免责声明：</p>
          <p>本文内容转载自其他媒体，目的在于传递更多信息，并不代表本网赞同其观点或证实其内容的真实性。不承担此类作品侵权行为的直接责任及连带责任。</p>
        </div>
        <div class="line"></div>
        <!-- <tui-ya-ad></tui-ya-ad> -->
        <component :is="contentFootAd.type" :info="contentFootAd.info"></component>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import CLoading from "../components/Loading.vue";
import CWarning from "../components/Warning.vue";
import moment from "moment";
import "moment/locale/zh-cn";
// import CatAd from "../components/ad/CatAd.vue";

import { getArticle } from "@/api/news";
import loadingPng from "@/assets/loading.png";
import tuiya from "../components/ad/TuiYaAd.vue";
import baidu from "../components/ad/BaiduAdA.vue";
import sougou from "../components/ad/SougouAd.vue";

import { customerAd } from "@/store/adengine/customerAd";

export default {
  components: {
    tuiya,
    baidu,
    sougou
  },
  inject: ["reload"],
  data() {
    return {
      loadingPng: loadingPng,
      sougouAd1: "sogou_wap_1081165",
      loading: false,
      content: "",
      bodyHeight: 300,
      contentStatus: false,
      curHeight: 0,
      detail: {},
      screenWidth: 0,
      scale_w: 1,
      isAppleDevice: navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad)/i
      )
    };
  },
mounted(){
        setTimeout(()=>{
          this.contentToggle();
        },500)
    },
  activated() {
    this.loading = false;
  },
  

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
    this.getDetail();
  },

  methods: {
        contentToggle(){
        this.curHeight=this.$refs.bodyFont.offsetHeight;
        if(this.curHeight>this.bodyHeight){
          this.contentStatus=true;
        }else{
          this.contentStatus=false;
        }
      },
    getDetail() {
      const customerName = this.$route.params.customerName;
      const snowFlakeid = this.$route.params.snowFlakeid;
      getArticle(customerName, snowFlakeid).then(v => {
        this.detail = v.data;

        let content = "";
        v.data.paraArray.forEach(function(value, index) {
          content =
            content + '<div class="paras"> <div>' + value.para + "</div>";
          v.data.imageArray.forEach(function(value) {
            if (value.mapping === index) {
              content +=
                "<img src=" +
                value.url +
                ' style="width:100%;border-radius:4px;object-fit: cover;"/>';
            }
          });
          content += "</div>";
        });
        this.content = content;

        this.loading = true;
      });
      // this.getOneNews({
      //   type: type,
      //   start: id,
      //   end: (parseInt(id) + 1).toString()
      // }).then(res => {
      //   this.detail = res[0];
      // });
    }
  },
  computed: {
    ...mapState([
      "ifReturnMsg",
      "hasParagraph",
      "contentType",
      "localCollection",
      "adConfig"
    ]),
    contentHeadAd: function() {
      return customerAd[this.$route.params.customerName]["contentHeadAd"];
    },

    contentFootAd: function() {
      return customerAd[this.$route.params.customerName]["contentFootAd"];
    },

    title: function() {
      return this.detail.title;
    },
    media_name: function() {
      return this.detail.mediaName;
    },
    image_list: function() {
      return this.detail.imageArray;
    }
  },
  watch: {
    $route(to, from) {
      this.loading = true;
      if (to.path.indexOf("content") !== -1) {
        this.getDetail();
      }
    }
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
@import "../assets/style/content.scss";
.bodyFont{
    word-break:break-all;
    word-wrap:break-word;
    height:auto;
    overflow: hidden;
    max-height: 100%;
    p{margin:16px 0 0 0;}
  }
  .bodyHeight{
    height:300px;
  }
  .contentToggle{
    height:60px;
    line-height:60px;
    text-align: center;
    margin-bottom:30px;
  }
</style>

