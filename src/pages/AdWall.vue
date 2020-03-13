<template>
  <div class="newsList">
    <!-- <baidu :id="22"></baidu>
    <div class="line"></div> -->
    <!-- <shengmi :info="shengmiInfo"></shengmi>
    <div class="line"></div> -->
    <sougou :info="sougouInfo1"></sougou>
    <div class="line"></div>
        <sougou :info="sougouInfo2"></sougou>
    <div class="line"></div>
        <sougou :info="sougouInfo3"></sougou>
    <div class="line"></div>
        <sougou :info="sougouInfo4"></sougou>
    <div class="line"></div>
        <sougou :info="sougouInfo5"></sougou>
    <div class="line"></div>
 
    <!-- <pingduoduo :info="pingduoduoInfo"></pingduoduo>
    <div class="line"></div> -->
  </div>
</template>

<script>
import baidu from "../components/ad/BaiduAdB.vue";
import kuaiguo from "../components/ad/KuaiGuoAd.vue";
import bianxianmao from "../components/ad/BianXianMao.vue";
import tuiya from "../components/ad/TuiYaAd.vue";
import sougou from "../components/ad/SougouAd.vue";
import shengmi from "../components/ad/ShengMi.vue";
import pingduoduo from "../components/ad/pingduoduo.vue";
export default {
  components: {
    baidu,
    kuaiguo,
    bianxianmao,
    tuiya,
    sougou,
    shengmi,
    pingduoduo
  },
  data() {
    return {
      baiduInfo: {
        url: "https://juhe.funshipin.com/js-137.js",
        divId: "baidu"
      },
      shengmiInfo: {
        url: "https://gup8.cxfzw.cn/js/mob/725.js",
        divId: "shengmi"
      },
      kuaiguoInfo: {
        id: "_gg_127741",
        url: "//ssp.huayuidc.com/js/127741.js",
        divId: "kuaiguo"
      },
      tuiyaInfo: {
        id: "322501",
        type: "list",
        divId: "tuiya"
      },
      bianxianmaoInfo: {
        id: 1,
        divId: "bianxianmao"
      },
      sougouInfo1: {
        id: "1087140",
        divId: "sougou1"
      },
          sougouInfo2: {
        id: "1087140",
        divId: "sougou2"
      },
          sougouInfo3: {
        id: "1087140",
        divId: "sougou3"
      },
          sougouInfo4: {
        id: "1087140",
        divId: "sougou4"
      },
          sougouInfo5: {
        id: "1087140",
        divId: "sougou5"
      },
      pingduoduoInfo: {
        url: "https://www.auspiciousvp.com/dbbwap/js/bwap.js",
        divId: "pingduoduo"
      }
    };
  }
};
</script>

<style>
</style>



