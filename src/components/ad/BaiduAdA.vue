<template>
  <div :id="randomId?randomId:info.divId"></div>
</template>

<script>
export default {
  props: {
    info: {},
    randomId:0
  },
  mounted() {

    this.$nextTick(() => {
      var script = document.createElement("script"); //创建一个script标签
      script.type = "text/javascript";
      script.src = this.info.url;
      document.getElementById(this.randomId?this.randomId:this.info.divId).appendChild(script);
    });
  },
  created() {},

  activated() {}
};
</script>
