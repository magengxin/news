<template>
<div >
  <div v-if="tacType === 'dialogAd'">
    <img
        :src="imInfo.url"
        class="dialogIamge"
        :style="{ width:imInfo.width }"
        @click="openAd"
    />
  </div>
  <div v-else>
    <listAdType :tacType="tacType" :info="info"/>
  </div>
  </div>
</template>

<script>
  import dialogMixins from "@/components/mixins/dialogImage.js";
  import { tactis_group } from "@/api/outUrl";
  import { randomNum } from "@/utils/mathUtil";
   import {  mapState } from "vuex";

  export default {
    mixins: [dialogMixins],
    props: {
      info: {},
      tacType: "xxx"
    },
    created(){
      console.info("created customerJs",this.customerJs)
    },
    data() {
      return {
        mathRandom: randomNum,
        imageUrl: ""
      };
    },
    mounted() {
      if (this.tacType === "dialogAd") {
        this.getImage('big');
      }
    },
    computed: {

       ...mapState([
        "customerJs",
      ]),
      isType() {
        return this.tacType === 'listAd' || this.tacType === 'footerFixedAd';
      }
    },
    methods: {
      openAd() {
        tactis_group({
          code_key: this.info.codekey,
          ip: returnCitySN.cip
        });
        window.open(this.info.url);
      }
    }
  };
</script>
<style scoped>
  .dialogIamge {
    width: 80%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto
  }
</style>
