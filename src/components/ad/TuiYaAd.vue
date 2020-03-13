
<template>
  <img
    v-if="info.type === 'content'"
    :src="contentImgList[mathRandom(0,4)]"
    style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
    @click="openAd"
  />
  <img
    v-else-if="info.type === 'list'"
    :src="listImgList[mathRandom(0,13)]"
    style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
    @click="openAd"
  />
</template>

<script>
import catAd1 from "@/assets/ad/1.png";
import catAd2 from "@/assets/ad/2.png";
import catAd3 from "@/assets/ad/3.png";
import catAd4 from "@/assets/ad/4.png";
import catAd5 from "@/assets/ad/5.png";

import tuiya1 from "@/assets/ad/tuiya1.jpg";
import tuiya2 from "@/assets/ad/tuiya2.png";
import tuiya3 from "@/assets/ad/tuiya3.png";
import tuiya4 from "@/assets/ad/tuiya4.png";
import tuiya5 from "@/assets/ad/tuiya5.png";
import tuiya6 from "@/assets/ad/tuiya6.png";
import tuiya7 from "@/assets/ad/tuiya7.png";
import tuiya8 from "@/assets/ad/tuiya8.png";
import tuiya9 from "@/assets/ad/tuiya9.png";
import tuiya12 from "@/assets/ad/tuiya12.png";
import tuiya15 from "@/assets/ad/tuiya15.png";
import tuiya19 from "@/assets/ad/tuiya19.png";
import tuiya20 from "@/assets/ad/tuiya20.png";
import tuiya21 from "@/assets/ad/tuiya21.png";

import { randomNum } from "@/utils/mathUtil";
import { customerAd } from "@/store/adengine/customerAd.js";
export default {
  props: {
    info: {}
  },
  data() {
    return {
      mathRandom: randomNum,
      contentImgList: [catAd1, catAd2, catAd3, catAd4, catAd5],
      listImgList: [
        tuiya1,
        tuiya2,
        tuiya3,
        tuiya4,
        tuiya5,
        tuiya6,
        tuiya7,
        tuiya8,
        tuiya9,
        tuiya12,
        tuiya15,
        tuiya19,
        tuiya20,
        tuiya21,
      ]
    };
  },
  mounted() {},
  methods: {
    openAd() {
      const customerName = this.$route.params.customerName;

     let url = "https://engine.tuicoco.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=" + this.info.id
      window.location.href = url;
    }
  }
};
</script>