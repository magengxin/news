<template>
  <div ref="tencent" style="margin-bottom:20px;"></div>
</template>

<script>
import { randomNum } from "@/utils/mathUtil";
export default {
  props: {
    info: {},
    randomId: 0
  },
  data() {
    return {
      posid: [100224, 100223, 100239, 100240]
    };
  },
  mounted() {
    this.$nextTick(() => {
      var div = document.createElement("div");
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = this.info.src + Math.random();
      script.setAttribute("posid", this.posid[randomNum(0, 3)], 0);
      script.setAttribute("adkey", this.info.adkey);
      div.appendChild(script);
      this.$refs.tencent.appendChild(div);
    });
  },
  methods: {
    handleAdEvent() {
      const evt = arguments[0];
    },
    onAdError() {
      const evt = arguments[0];
    }
  }
};
</script>
