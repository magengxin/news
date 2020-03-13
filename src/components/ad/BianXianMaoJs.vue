
<template>
  <div :id="info.divId">
  </div>
</template>

<script>

export default {
  props: {
    info: {}
  },
  data() {
    return {
     
    };
  },
  mounted() {
    this.$nextTick(() => {
      var hm = document.createElement("script");
      hm.src = "//m.cudaojia.com/dist/floatModel/adMateri.js";
      hm.id = "BxmExbannerScript";
      hm.setAttribute(
        "data-adPositionId",
        "d2edfebb1b244cd9a43a9ec03b0e8aa9-6"
      );
      hm.setAttribute("data-bannerContainer", this.info.divId);
      var s = document.getElementsByTagName("head")[0];
      s.appendChild(hm);
    });
  },
  methods: {}
};
</script>