<template>
  <div
    v-if="
    customerAd[customerName] &&
    customerAd[customerName].fixedAd &&
    customerAd[customerName].fixedAd.switch"
    class="fiexAd"
  >
    <div
      v-track-event="{category:customerName, action:customerAd[customerName].fixedAd.type,label:'悬浮广告'}"
    >
      <img @click="openAd()" :src="floatAd" />
    </div>
    <!-- <div v-show="show" id="fiexAd" class="doumeng"></div> -->
  </div>
</template>

<script>
import { customerAd } from "@/store/adengine/customerAd";
import floatAd from "@/assets/floatAd.gif";
export default {
  props: {
    customerName: ""
  },
  data() {
    return {
      customerAd: customerAd,
      floatAd: floatAd,
      show: false
    };
  },
  mounted() {
    // if (
    //   customerAd[this.customerName].fixedAd.switch &&
    //   customerAd[this.customerName].fixedAd.type === "doumeng"
    // ) {
    //   let fiexAd = document.getElementById("fiexAd");
    //   let hm = document.createElement("script");
    //   hm.setAttribute("appkey", "f76a92bc164f06226dceb4b5ca2bfad8");
    //   hm.setAttribute("adSpaceKey", "8c18997d2e25f6714a9ff212142a31f4");
    //   hm.src = "https://static.abtech.xyz/static/media.js";
    //   fiexAd.appendChild(hm);
    // }
  },
  methods: {
    openAd() {
      if (customerAd[this.customerName]) {
        let fixedAd = customerAd[this.customerName].fixedAd;
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
      let url =
        "https://display.intdmp.com/site_login_ijf.htm?app_key=adhu4d4bb76314be4d29";
      window.location.href = url;

      //  const routeData = this.$router.resolve({
      //     path: "/adIframe",
      //     query: {
      //       url:
      //         "https://display.intdmp.com/site_login_ijf.htm?app_key=adhu4d4bb76314be4d29"
      //     }
      //   });
      //   window.open(routeData.href, "_blank");
    },
    openTuiya() {
      let url =
        "https://engine.tuicoco.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=322501";
      window.location.href = url;

      // this.$router.push({
      //   path: "/adIframe",
      //   query: {
      //     url:

      //   }
      // });
    },
    opendoumeng() {
      window.location.href =
        "https://backup.39temai.top/static/kaimen1/index.html?hdgghtmlid=506&appkey=94b507b748994ea2b1e209b3c299adc7&adSpaceKey=02d59bbe039adf370f04dcd2ec22cc7a&from=H5&1=1&t=1578378971637&interactionType=html";
    },

    openBianXianMao() {
      let url =
        "https://i.iwanbei.cn/activities?appKey=d2edfebb1b244cd9a43a9ec03b0e8aa9&appEntrance=" +
        this.info.id +
        "&business=money";
      window.location.href = url;

      // this.$router.push({
      //   path: "/adIframe",
      //   query: {
      //     url:
      //       "https://i.iwanbei.cn/activities?appKey=d2edfebb1b244cd9a43a9ec03b0e8aa9&appEntrance=" +
      //       this.info.id +
      //       "&business=money"
      //   }
      // });
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
