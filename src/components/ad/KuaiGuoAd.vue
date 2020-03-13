<template>
   <div
    v-if="isIphone"
    :style="{display:'inline-flex', justifyContent: 'space-around', marginTop: 20*scale_w+'px', height: 130*scale_w+'px', width: '100%'}"
  >
    <div
      :style="{width: 1/scale_w*100+'%', height: 130/scale_w + 'px', transform:'scale(3.2,3.6)'}"
      :id="info.divId !== undefined?info.divId:randomId"
    ></div>
  </div>
  <div
  v-else
    style=" display: inline-flex; justify-content: space-around;  width: 100%; height: 70px;font-size:10px;"
    :id="info.divId !== undefined?info.divId:randomId"
  ></div>
</template>

<script>
import {  mapState } from "vuex";
export default {
  props: {
    info: {},
    randomId: 0,
  },
  data() {
    return {
    };
  },
    computed: {
    ...mapState(["scale_w", "isIphone"])
  },
  mounted() {
    this.$nextTick(() => {
      console.info('快果')
      var script = document.createElement("script"); //创建一个script标签
      script.type = "text/javascript";
      script.src = this.info.url;
      script.id = this.info.id;
      if (this.info.divId !== undefined) {
        document.getElementById(this.info.divId).appendChild(script);
      } else {
        document.getElementById(this.randomId).appendChild(script);
      }
    });
  },

};
</script>
