
<template>
  <div v-once  class="tuiyaSdk" :id="randomId">
    
  </div>
</template>
<script>
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
      // deviceId: "12324123123",
      // dom: "#asdasfasd",
      deviceId:this.randomId,
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
  position:absolute;
  top:0;
  left:0;
}
</style>
