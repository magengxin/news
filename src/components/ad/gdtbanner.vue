<template>
  <div>
    <div id="sss"></div>
  </div>
</template>

<script>
export default {
  created() {
    let that = this
       TencentGDT.push({
        placement_id: '7031118571986650', // 广告位id，请从联盟平台广告位获取
        app_id: '1110489751', 
        type: 'native', // 广告类型
        display_type: 'banner', // 广告播放类型: banner广告
        carousel: 3000, // 轮播时间，> 3000数字类型，否则轮播会被取消
        containerid: 'sss', // 广告容器
        onComplete: function(res) {
            if (res.ret == 0) {
                console.log('广告播放成功');
            } else {
                    setTimeout(function() {
            window.TencentGDT.NATIVE.loadAd('7031118571986650');
          }, 1000);
                console.log('广告播放失败')
            }
        }
      
    });

  
  },
  mounted() {
      
    
     
    
  },
};
</script>

<style>
</style>