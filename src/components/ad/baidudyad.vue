<template>
  <div :id="randomId?randomId:info.divId" class="zl-dybanner702"></div>
</template>

<script>
export default {
  props: {
    info: {},
    randomId: 0,
  },
  mounted() {
    this.$nextTick(() => {
      var adInfo = document.createElement("script");
      // adInfo.innerHTML = "";
      // adInfo.innerHTML += "var  ";
      // adInfo.innerHTML += " var ws_width =20 ";
      // adInfo.innerHTML += " var ws_height=8 ";
      // adInfo.innerHTML += "  var ws_autosize='2' ";

      var script = document.createElement("script"); //创建一个script标签
      script.type = "text/javascript";
      script.src = "//nads.wuaiso.com/banner/js/adswapunion.js";
      // document.getElementById(this.randomId ? this.randomId : this.info.divId).appendChild(adInfo);
      document.getElementById(this.randomId ? this.randomId : this.info.divId).appendChild(script);
    
        
    });
  },
  created() {},

  activated() {}
};
</script>
