<template>
  <div class="videoAdOut">
    <div class="videoContainer">
      <div class="video">
        <div @click.stop="ssss" class="top">
          <div class="time">{{count}}</div>
          <img :src="closePng" v-show="!isAppleDevice" class="closeTag" @click.stop="play"/>
        </div>
        <video-ad ref="lijiaqi" :videoUrl="test"></video-ad>
      </div>
    </div>
  </div>
</template>

<script>
import test from "@/assets/test.mp4";
import closePng from "@/assets/close.png";
// import videoAd from "@/components/adVideoPlayer";
export default {
  data() {
    return {
      closePng: closePng,
      isAppleDevice: false,
      timeStep: 0,
      test: test
    };
  },
  props: {
    count: 0
  },
  // components: { videoAd },
  mounted() {
    let u = navigator.userAgent;
    let isAppleDevice = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    this.isAppleDevice = isAppleDevice;
  },
  methods: {
    zanting() {
      this.$refs.lijiaqi.zanting();
    },
    close() {
      this.$emit("close");
    },
    play() {
      this.$emit("startPlay");
      this.$refs.lijiaqi.play();
    },
    ssss() {
      this.close();


      this.$router.push({
        path: "/adIframe",
        query: {
          url:
            "https://i.iwanbei.cn/activities?appKey=d2edfebb1b244cd9a43a9ec03b0e8aa9&appEntrance=1&business=money"
        }
      });
    }
  }
  ,
 
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.videoAdOut {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  height: 100%;
  width: 100%;
  background: rgba(2, 2, 2, 0.5);
  .closeTag {
    height: px2rem(80px);
    width: px2rem(80px);
    margin-left: px2rem(530px);
    margin-top: px2rem(40px);
    text-align: center;
    line-height: font-dpr(30px);
    font-size: font-dpr(30px);
  }
  .videoContainer {
    border-radius: px2rem(100px);
    position: relative;
    width: px2rem(500px);
    margin: 0 auto;
    top: 50%; /*偏移*/
    margin-top: px2rem(-450px);
    opacity: 1;
    .video {
      margin: 0 auto;
      top: 50%; /*偏移*/
    }
    .top {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      z-index: 80;
      height: 100%;
      width: 100%;
    }
  }
  .time {
    height: px2rem(40px);
    width: px2rem(40px);
    margin-left: px2rem(10px);
    margin-top: px2rem(10px);
    border-radius: px2rem(10px);
    background: white;
    border: white solid px2rem(5px);
    text-align: center;
    position: fixed;
    z-index: 120;
    font-weight: 900;
  }
}
</style>