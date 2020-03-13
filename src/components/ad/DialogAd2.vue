<template>
  <div
    class="dialog-body"
    v-if="customerJs.hasOwnProperty('dialogAd') && customerJs.adsSwitch  && show "
  >
    <div class="dialog-close">
      <div class="clone-content" @click="hideDialog">
        <img :src="close" alt="img" />
      </div>
    </div>
    <div class="dialog-main">
      <div class="dialog-content">
        <div v-track-event="{category : customerName, label : '弹框广告'}">
          <img @click="openAd()" :src="imgs[randomNum(0, 2)]" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { randomNum } from "@/utils/mathUtil";
import img1 from "@/assets/dialog/dialog1.gif";
import img2 from "@/assets/dialog/dialog2.gif";
import img3 from "@/assets/dialog/dialog3.gif";
import close from "@/assets/dialog/dialog-close.png";
import { mapState } from "vuex";

export default {
  props: {
    customerName: ""
  },
  data() {
    return {
      close,
      imgs: [img1, img2, img3],
      randomNum,
      show: true
    };
  },

  computed: {
    ...mapState(["customerJs"])
  },
  methods: {
    hideDialog() {
      this.show = false;
    },
    showView() {
      this.show = true;
    },
    openAd() {
      if (this.customerJs) {
        let dialogAd = this.customerJs.dialogAd;
        switch (dialogAd.type) {
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
    openBianXianMao() {
      let adInfo = this.customerJs.dialogAd;
      window.location.href = `https://i.iwanbei.cn/activities?appKey=d2edfebb1b244cd9a43a9ec03b0e8aa9&appEntrance=${adInfo.id}&business=money`;
    },
    openTuiya() {
      let adInfo = this.customerJs.dialogAd;
      window.location.href = `https://engine.tuicoco.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=${adInfo.id}`;
    },
    opendoumeng() {
      let adInfo = this.customerJs.dialogAd;
      window.location.href = `https://backup.39temai.top/static/kaimen1/index.html?
      hdgghtmlid=506&appkey=${adInfo.appkey}&adSpaceKey=${adInfo.adSpaceKey}&from=H5&1=1&t=1578378971637&interactionType=html`;
    },
    openhudongtui() {
      window.location.href = `https://display.intdmp.com/site_login_ijf.htm?app_key=adhu4d4bb76314be4d29`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";

.dialog-body {
  z-index: 70;
  position: fixed;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  .dialog-main {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .dialog-content {
      img {
        width: px2rem(620px);
      }
    }
  }

  .dialog-close {
    z-index: 170;
    position: absolute;
    right: px2rem(50px);
    top: px2rem(180px);
    cursor: pointer;

    .clone-content {
      padding: px2rem(4px);

      img {
        width: px2rem(50px);
      }
    }
  }
}
</style>
