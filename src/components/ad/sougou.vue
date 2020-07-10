<template>
  <div
    v-if="isIphone"
    :style="{display:'inline-flex', justifyContent: 'space-around', marginTop: 20*scale_w+'px', height: 130*scale_w+'px', width: '100%'}"
  >
    <div
      :style="{width: 1/scale_w*100+'%', height: 130/scale_w + 'px', transform:'scale('+scale_w+')'}"
      :id="randomId"
    ></div>
  </div>
  <div
    v-else-if="!isIphone"
    style="margin-top: 10px; display: inline-flex; justify-content: space-around;height: 90px; width: 100%; "
    :id="randomId"
  ></div>
</template>

<script>
  import { mapState } from "vuex";
  import store from '@/store';
  export default {
    props: {
      info: {},
      randomId:'sogou_wap_' +  + parseInt(Math.random() * 1000000)
    },
    data() {
      return {
        flag:true
      };
    },

    computed: {
      ...mapState(["scale_w", "isIphone","visited"])
    },
    watch:{
      randomId(newV){
      }

    },
    mounted() {
      this.closeScroll()
      window.addEventListener('scroll', this.closeScroll, true);
    },
    methods: {
      closeScroll() {
        // if(this.visited){
        let sogou_div = document.getElementById(this.randomId);
        const offset = sogou_div.getBoundingClientRect();
        const offsetTop = offset.top;
        const offsetBottom = offset.bottom;
        // 进入可视区域
        if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
          if (this.flag) {
            window.sogou_un = window.sogou_un || [];
            window.sogou_un.push({ id: this.info.id, ele: sogou_div });
            this.flag = false;
          }
        }
        // }
      }
    },
    destroyed(){
      window.removeEventListener('scroll', this.closeScroll, true);
    }
  };
</script>
