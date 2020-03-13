<template>
  <div
    v-if="isIphone"
    :style="{display:'inline-flex', justifyContent: 'space-around', marginTop: 20*scale_w+'px', height: 130*scale_w+'px', width: '100%'}"
  >
    <div
      :style="{width: 1/scale_w*100+'%', height: 130/scale_w + 'px', transform:'scale('+scale_w+')'}"
      :id="randomId?'sogou_wap_' +randomId: 'sogou_wap_' + info.divId"
    ></div>
  </div>
  <div
    v-else
    style="margin-top: 10px; display: inline-flex; justify-content: space-around;height: 90px; width: 100%; "
    :id="randomId?'sogou_wap_' +randomId: 'sogou_wap_' + info.divId"
  ></div>
</template>

<script>
  import { mapState } from "vuex";
  import store from '@/store';
  export default {
    props: {
      info: {},
      randomId:0
    },
    data() {
      return {
        flag:true
      };
    },

    computed: {
      ...mapState(["scale_w", "isIphone"])
    },
    watch:{
      randomId(newV){
        console.info('randomId newV',newV)
      }

    },
    mounted() {
          console.info("content mounted");
      this.closeScroll()
      window.addEventListener('scroll', this.closeScroll, true);
    },
    methods: {
      closeScroll() {
        let sogou_div = document.getElementById('sogou_wap_' + this.randomId?'sogou_wap_' +this.randomId: 'sogou_wap_' + this.info.divId);

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
        } else {
        }
      }
    },
    destroyed(){
      window.removeEventListener('scroll', this.closeScroll, true);
    }
  };
</script>
