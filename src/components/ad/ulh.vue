<template>
  <div>
    <div :id="randomId"></div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      randomId: "ulh" + parseInt(Math.random() * 1000000)
    };
  },
  created() {
    let that = this;
    let tenAdArray = window.localTeng;
    // console.info("tenAdArray", tenAdArray);
    let a =  tenAdArray.find(element => {
       return   element ===  that.info.placement_id
    });
    if(a){
        //  console.info("  window.TencentGDT.NATIVE", window.TencentGDT)
        window.TencentGDT.NATIVE.loadAd(that.info.placement_id)
    }else{
            //   console.info("  window.TencentGDT.NATIVE", window.TencentGDT)
       window.localTeng.push(that.info.placement_id)
      window.TencentGDT.push({
      placement_id: that.info.placement_id, // {String} - 广告位id - 必填
      app_id: "1110489751", // {String} - appid - 必填
      type: "native", // {String} - 原生广告类型 - 必填
      count: 1,
      onComplete: function(res) {
        // console.info("onComplete  ", res);
        if (res && res.constructor === Array) {
        //   console.info("onComplete success ", res);
          window.TencentGDT.NATIVE.renderAd(res[0], that.randomId);
        } else {
          console.info("onComplete fail ", res);
          setTimeout(function() {
            window.TencentGDT.NATIVE.loadAd(that.info.placement_id);
          }, 1000);
        }
      }
    });

    }
  },
  mounted() {
 
  }
};
</script>

<style>
</style>