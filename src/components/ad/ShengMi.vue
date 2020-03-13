<template>
  <div :id="info.divId"></div>
</template>

<script>
export default {
  props: {
    info: {}
  },
  mounted() {
    this.$nextTick(()=>{
      var script = document.createElement("script"); //创建一个script标签
      script.type = "text/javascript";
      script.src = this.info.url;
        document.getElementById(this.info.divId).appendChild(script);

    })
  
  },
  created() {
  },

  activated() {
  }
};
</script>
