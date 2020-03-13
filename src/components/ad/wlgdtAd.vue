<template>
  <div>
    <div>

    
  </div>
  <div id="test123456">
    
  </div>


  </div>
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
      script.src = this.info.url;
      script.type = "text/javascript";
      document.getElementById('test123456').appendChild(script);
    });
  },
  created() {},

  activated() {}
};
</script>
