<template>
  <div :id="randomId"></div>
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
      script.setAttribute('qsydg',"uhwkm")
      document.getElementById(this.randomId).appendChild(script);
    });
  },
  created() {},

  activated() {}
};
</script>
