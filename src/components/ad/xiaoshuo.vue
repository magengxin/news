
<template>
  <div>
    <img :src="imageSrc" style="margin-top: 15px; width: 100%; height: 100%;" @click="openAd" />
  </div>
</template>

<script>
import xiaoshuo1 from "@/assets/xiaoshuo/1.jpg";
import xiaoshuo2 from "@/assets/xiaoshuo/2.jpg";
import xiaoshuo3 from "@/assets/xiaoshuo/3.jpg";

import xiaoshuo11 from "@/assets/xiaoshuo/11.jpg";
import xiaoshuo12 from "@/assets/xiaoshuo/12.jpg";
import xiaoshuo13 from "@/assets/xiaoshuo/13.jpg";

import { randomNum } from "@/utils/mathUtil";
import { customerAd } from "@/store/adengine/customerAd.js";
export default {
  props: {
    info: {}
  },
  data() {
    return {
      imageSrc: "",
      mathRandom: randomNum,
      listImgList: [xiaoshuo1, xiaoshuo2, xiaoshuo3],
      listImgList2: [xiaoshuo11, xiaoshuo12, xiaoshuo13]
    };
  },
  mounted() {
    if (this.info.url) {
      this.imageSrc = this.listImgList2[this.mathRandom(0, 2)];
    } else {
      this.imageSrc = this.listImgList[this.mathRandom(0, 2)];
    }
  },
  methods: {
    openAd() {
      console.info("this.info", this.info);
      if (this.info.url) {
        window.location.href = this.info.url;
      } else {
        let url = "http://t.wykz.com/s/GZQDGv0a2a";
        window.location.href = url;
      }
    }
  }
};
</script>
<style >
</style>