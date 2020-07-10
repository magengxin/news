<template>
  <div
    class="dialog-body"
    v-if="show "
  >
    

    <div class="dialog-main">
      <div class="dialog-content">
            <div v-track-event="{category :'弹窗' , action :customerJs.dialogAd.adType , label :customerName }">
              <component
                  v-bind:is="customerJs.dialogAd.adType"
                  :randomId="Math.floor(Math.random() * 100000)"
                  :info="customerJs.dialogAd"
                  :tacType="'dialogAd'"
                  />
          </div>
      </div>
    </div>
    <div
        class="dialog-close">
      <div class="clone-content" @click="hideDialog">
        <img src="http://cdn.moonai.com.cn/cancel.png" alt="img" />
      </div>
    </div>
  </div>
</template>

<script>
import { randomNum } from "@/utils/mathUtil";
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
  },
  created() {
  },
  methods: {
    hideDialog() {
      this.show = false;
    },
    showView() {
      this.show = true;
    },
    openAd() {
     window.open(this.info.url);
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
     width: 100%;
    .dialog-content{
      position: relative;
    }
  }

  .dialog-close {
    background: blue;
    z-index: 170;
    position: absolute;
    left: 50%;
    top: 75%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    background: transparent;
    .clone-content {
      padding: px2rem(4px);

      img {
        width: px2rem(50px);
      }
      .close-btn {
        width: px2rem(120px);
        height: px2rem(120px);
      
      }
    }
  }
}
  .dialog-close-tengcent{
    z-index: 9999999;
    right: 0!important;
    top: 0!important;
  }
</style>
