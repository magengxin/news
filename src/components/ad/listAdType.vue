<template>
  <div>
    <div
        v-if="this.tacType !== 'footerFixedAd'"
        class="news_title" v-html="imInfo.title"/>
    <div class="news_imgs">
      <img
          class="inner_img"
          :src="imInfo.url"
          alt=""
          @click="openAd"
      />
    </div>
    <div
        v-if="tacType ==='recommendAd'"
        class="line"></div>
  </div>
</template>

<script>
  import dialogMixins from "@/components/mixins/dialogImage.js";
  import { tactis_group } from "@/api/outUrl";

  export default {
    mixins: [dialogMixins],
    props: {
      info: {},
      tacType: "xxx"
    },
    data() {
      return {};
    },
    mounted() {
      let type = this.getTacType();
      if (type) {
        this.getImage(type);
      }
    },
    computed: {},
    methods: {
      getTacType() {
        let type = '';
        switch (this.tacType) {
          case "footerFixedAd":
            type = 'under';
            break;
          default:
            type = 'large';
            break;
        }
        return type;
      },
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

  .inner_img {
    width: 100% !important;
  }
</style>
