<template>
  <div v-if="customerJs.hasOwnProperty('fixedAd') && customerJs.adsSwitch" class="fiexAd">
    <!-- <div v-track-event="{category:customerName, action:customerJs.fixedAd.type,label:'悬浮广告'}"> -->
      <img @click="openAd()" :src="floatAd"  alt=""/>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import floatAd from "@/assets/floatAd.gif";
export default {
  props: {
    customerName: ""
  },
  data() {
    return {
      floatAd: floatAd,
    };
  },
  computed: {
    ...mapState(["customerJs"])
  },

  mounted() {},
  methods: {
    openAd() {
      if (this.customerJs.fixedAd) {
        let fixedAd = this.customerJs.fixedAd;
        switch (fixedAd.type) {
          case "tuiya":
            this.openTuiya();
            break;
          case "bianxianmao":
            this.openBianXianMao();
            break;
          case "doumeng":
            this.opendoumeng();
            break;
          case "hudongtui":
            this.openhudongtui();
            break;
        }
      }
    },
    openhudongtui() {
      let adInfo = this.customerJs.fixedAd;
      window.location.href = `https://display.intdmp.com/site_login_ijf.htm?app_key=adhu4d4bb76314be4d29`;
    },
    openTuiya() {
      let adInfo = this.customerJs.fixedAd;
      window.location.href = `https://engine.tuicoco.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=${adInfo.id}`;
    },
    opendoumeng() {
      let adInfo = this.customerJs.fixedAd;
      window.location.href = `https://backup.39temai.top/static/kaimen1/index.html?
      hdgghtmlid=506&appkey=${adInfo.appkey}&adSpaceKey=${adInfo.adSpaceKey}&from=H5&1=1&t=1578378971637&interactionType=html`;
    },
    openBianXianMao() {
      let adInfo = this.customerJs.fixedAd;
      window.location.href = `https://i.iwanbei.cn/activities?appKey=d2edfebb1b244cd9a43a9ec03b0e8aa9&appEntrance=${adInfo.id}&business=money`
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.fiexAd {
  z-index: 70;
  position: fixed;
  bottom: 45%;
  right: px2rem(10px);
  img {
    width: px2rem(200px);
  }
}
.doumeng {
  width: 200px;
  height: 200px;
  margin-top: 20px;
}
</style>
