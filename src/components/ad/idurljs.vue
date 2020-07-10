<template>
  <div :id="id"></div>
</template>

<script>
export default {
  props: {
    info: {},
  },
  data(){
    return {
      id:parseInt(Math.random() * 1000000)
    }
  },
  mounted() {
    this.$nextTick(() => {
      var script = document.createElement("script"); //创建一个script标签
      script.src = this.info.url;
      document.getElementById(this.id).appendChild(script);
    });
  },
  created() {},
  activated() {}
};
</script>
