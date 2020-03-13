<template>
  <div :id="info.divId?info.divId: randomId "></div>
</template>

<script>
  export default {
    props: {
      info: {},
      randomId: 0
    },
    data() {
      return {
        flag: true
      };
    },
    mounted() {
      this.closeScroll();
      window.addEventListener('scroll', this.closeScroll, true);
    },
    methods: {
      closeScroll() {
        let dId = this.info.divId ? this.info.divId : this.randomId;
        let sogou_div = document.getElementById(dId);


        const offset = sogou_div.getBoundingClientRect();
        const offsetTop = offset.top;
        const offsetBottom = offset.bottom;


        var script = document.createElement('script'); //创建一个script标签
        script.type = 'text/javascript';
        script.src = this.info.url;

        // 进入可视区域
        if (offsetTop <= window.innerHeight && offsetBottom >= 0) {

          if (this.flag) {
            script.setAttribute('smua', this.info.smua);
            document.getElementById(dId).appendChild(script);
            this.flag = false;
          }
        } else {
        }
      }
    },
    created() {
    },

    activated() {
    }
  };
</script>
