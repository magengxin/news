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
          <img @click="openAd()" :src="imgUrl" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { wuba } from "@/api/news";
import { show_url, click_url } from "@/api/wuba";
import { randomNum } from "@/utils/mathUtil";
import { getBianxianMao } from "@/api/bianxianmao";
import img1 from "@/assets/dialog/dialog1.jpg";
import img2 from "@/assets/dialog/dialog2.jpg";
import img3 from "@/assets/dialog/dialog3.jpg";
import img4 from "@/assets/dialog/dialog4.jpg";
import close from "@/assets/dialog/dialog-close.png";
import { mapState } from "vuex";

export default {
  props: {
    customerName: "",
    info:{}
  },
  data() {
    return {
      close,
      imgs: [img1, img2, img3, img4],
      imgUrl: "",
      randomNum,
      show: true,
      bxmapiUrl: "",
      target_url: "",
      showU: "",
      clickU: ""
    };
  },

  computed: {
    ...mapState(["customerJs"]),
    iu1() {
      return this.imgs[randomNum(0, 3)];
    }
  },
  created() {
    if (this.customerJs) {
      let dialogAd = this.customerJs.dialogAd;
      switch (dialogAd.type) {
        case "tuiya":
          this.imgUrl = this.iu1;
          break;
        case "bianxianmao":
          this.imgUrl = this.iu1;
          break;
        case "doumeng":
          this.imgUrl = this.iu1;
          break;
        case "hudongtui":
          this.imgUrl = this.iu1;
          break;
        case "baichuanhudong":
          this.imgUrl = this.iu1;
          break;

        case "wubaapi":
          this.imgUrl;
          wuba().then(v => {
            let obj = v.data.bid[0].creative;
            this.imgUrl = obj.picture_url;
            this.target_url = "https:" + obj.target_url.split(":")[1];
            this.showU = obj.show_url;
            this.clickU = obj.click_url;
            show_url({ show_url: this.showU });
          });
          break;

        case "bxmapi":
          let adPositionId = dialogAd.adPositionId;
          let sex = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
          let age = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
          let netEnv = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
          let education = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
          let income = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
          let city = returnCitySN.cname;

          getBianxianMao({
            adPositionId,
            sex,
            age,
            netEnv,
            education,
            income,
            city
          }).then(v => {
            this.imgUrl = v.returnValue.imgUrl;
            this.bxmapiUrl = v.returnValue.redirectUrl;
          });

          break;
          default:
  
             this.imgUrl = this.iu1;
            break;
      }
    }
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
            this.imgUrlc = this.iu1;
            break;
          case "bianxianmao":
            this.openBianXianMao();
            this.imgUrlc = this.iu1;
            break;
          case "doumeng":
            this.opendoumeng();
            this.imgUrlc = this.iu1;
            break;
          case "hudongtui":
            this.openhudongtui();
            this.imgUrlc = this.iu1;
            break;
          case "baichuanhudong":
            this.openbaichuanhudong();
            this.imgUrlc = this.iu1;
            break;
          case "bxmapi":
            this.openbxmapi();
            break;
          case "wubaapi":
            click_url({ click_url: this.clickU });
            window.open(this.target_url);
            break;
            default:
     window.open(this.info.url);
                     break;


                      
        }
      }
    },

    openbaichuanhudong() {
      let adInfo = this.customerJs.dialogAd;
      window.location.href = `https://game.hdbaichuan.cn/show.htm?app_key=0540ea929e754582`;
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
    },
    openbxmapi() {
      window.location.href = this.bxmapiUrl;
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
