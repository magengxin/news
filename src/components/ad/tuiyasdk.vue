
<template>
  <div v-once  class="tuiyaSdk" :id="randomId">
    
  </div>
</template>
<script>
import {getIEMI} from '@/utils/mathUtil'
export default {
  props: {
    info: {},
    randomId: 0
  },

  data() {
    return {};
  },
  methods: {
    initCallback() {
    }
  },
  mounted() {
    let dom = this.randomId
    dom = '#'+dom
    Tsdk.init({
      appKey: this.info.appKey,
      slotId: this.info.slotId,
 
      deviceId:this.randomId,
      imei:getIEMI(),
      dom: dom,
      debug: false,
      iframeStyle: {
        iframeWidth: document.documentElement.clientWidth,
        iframeHeight: document.documentElement.clientHeight
      }
    });

    // 在活动完成后会执行，这个回调
    Tsdk.ready(this.initCallback);

    // 活动关闭，通知媒体
    Tsdk.on("tuia:close", () => {
    });
  }
};
</script>

<style lang="scss" scoped>
.tuiyaSdk{
  position:fixed;
  top:0;
  left:0;
}
</style>
