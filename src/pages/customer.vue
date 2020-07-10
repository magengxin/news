<template>
  <router-view></router-view>
</template>

<script>
import MtaH5 from "mta-h5-analysis";

export default {
  created() {
    console.info("customer created", this.$route);
    if (this.$route.params.customerName === "720157317309198336") {
      MtaH5.init({
        sid: "500723384", //必填，统计用的appid
        autoReport: 0, //是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
        senseHash: 0, //hash锚点是否进入url统计
        senseQuery: 0, //url参数是否进入url统计
        performanceMonitor: 1, //是否开启性能监控
        ignoreParams: [] //开启url参数上报时，可忽略部分参数拼接上报
      });
      // 页面上报
      MtaH5.pgv();
    }
    if(this.$route.params.type){

    }else{
      this.$router.push({ path: '/customer/'+ this.$route.params.customerName + "/1" });
    }

   
  }
};
</script>

<style>
</style>