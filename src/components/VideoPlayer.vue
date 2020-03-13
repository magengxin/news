<template>
  <div>
    <div style="margin-bottom:20px ;" class="video-container">
      <video-player
        v-if="exist"
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoUrl: "",
    posterImg: ""
  },
  data() {
    return {
      exist: true,
      switch: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 3.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: "none", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: this.videoUrl
          }
        ],
        poster: this.posterImg, //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: false //全屏按钮
        }
      }
    };
  },
  watch: {
    videoUrl(val) {
      this.playerOptions.sources[0].src = val
    },
    posterImg(val){
        this.playerOptions.poster = val
    }
  },
  methods: {
    zanting() {
      this.$refs.videoPlayer.player.pause();
    },
    play() {
      this.$refs.videoPlayer.player.play();
    },
    closeScroll() {}
  },

  mounted() {
    this.$nextTick(() => {
      // window.addEventListener("scroll", this.closeScroll, true);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";

.video-container /deep/ .vjs-big-play-button {
  @include font-dpr(20px);
  height: px2rem(400px);
  width: px2rem(100px);
  border-radius: px2rem(200px);
}

.video-container /deep/ .vjs-control-bar {
  color: #ffffff;
  @include font-dpr(12px);
}
</style>
