<template>
  <div
      v-show="customerJs.hasOwnProperty('fixedAd')"
      :style="{ width:imInfo.width }" class="fiexAd">
    <div v-track-event="{category:'小金币', action:customerName}">
      <img :style="{ width:imInfo.width }" @click="openAd()" :src="imInfo.url" alt/>
      <tuiyasdk v-if="show" :randomId="'divId'+Math.floor(Math.random() * 100000)" :info="tuiyaInfo"></tuiyasdk>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from "vuex";
  import { tac_img } from "@/api/news";
  import dialogMixins from "@/components/mixins/dialogImage.js";

  export default {
    mixins: [dialogMixins],
    props: {
      customerName: ""
    },
    data() {
      return {
        floatAd: "",
        show: false,
        tuiyaInfo: {},
        imInfo: {}
      };
    },
    computed: {
      ...mapState(["customerJs"])
    },
    
    
    mounted() {
      console.info("fixedAd  mounted customerJs",this.customerJs)
        this.getImage('coin');
    },
    methods: {
          openTuiyaSDK() {
      this.show = true;
    },
      openAd() {
          if (this.customerJs.fixedAd) {
        let fixedAd = this.customerJs.fixedAd;
        switch (fixedAd.type) {
          case "tuiyasdk":
            this.openTuiyaSDK();
            this.tuiyaInfo = this.customerJs.fixedAd;
            break;
          default:
            window.open(fixedAd.url);
            break;
        }
      }
    
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/style/common.scss";

  .fiexAd {
    z-index: 0;
    position: fixed;
    bottom: 35%;
    right: px2rem(10px);
    // width: px2rem(140px);
    // img {
    //   width: px2rem(140px);
    // }
  }

  .doumeng {
    width: 200px;
    height: 200px;
    margin-top: 20px;
  }
</style>
