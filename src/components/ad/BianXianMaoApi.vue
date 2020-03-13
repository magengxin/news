
<template>
  <div :id="info.divId"></div>
</template>

<script>
import { getBianxianMao } from "@/api/bianxianmao";
export default {
  props: {
    info: {}
  },
  data() {
    return {};
  },
  created() {
    //   var rand = Math.floor(Math.random()*(max-min+1))+min;
    //    let adPostitionId = info.adPostitionId
    let adPositionId = "d2edfebb1b244cd9a43a9ec03b0e8aa9-7";
    let sex = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    let age = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    let netEnv = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    let education = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    let income = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    let city = returnCitySN.cname;
    getBianxianMao({
      adPositionId,
      sex,
      age,
      netEnv,
      education,
      income,
      city
    }).then(v => {
    });
  },
  mounted() {},
  methods: {}
};
</script>