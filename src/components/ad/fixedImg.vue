<template>
  <img
    :src="info.imgUrl"
    style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
    @click="openAd"
  />
</template>

<script>
  export default {
    props: {
      info: {}
    },
    data() {
      return {};
  },
    mounted() {
    },
    methods: {
      openAd() {
        window.open(this.info.openUrl, '_blank');
      }
    }
  };
</script>
