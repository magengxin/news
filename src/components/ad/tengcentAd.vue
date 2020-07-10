<template>
  <div >
    <div :id="randomId" ref="teng" :class="[tacType === 'dialogAd'?'tbsdialog':'']" ></div>
    <div v-if="tacType!='footerFixedAd'" style="visibility:hidden" class="line"></div>
  </div>
</template>

<script>
import { randomNum } from "@/utils/mathUtil";

export default {
  props: {
    tacType:'',
    info: {},
     fatherMethod: {
        type: Function,
        default: null
      }
  },
  data() {
    return {
      flag:true,
      show: false,
      posid: [100224, 100223, 100239, 100240, 100329,100255],
      randomId: "tengcent" + parseInt(Math.random() * 1000000)
    };
  },
  computed: {
  divStyle: function () {
    let c = {

    }
    if(this.tacType === 'footerFixedAd'){
        c = {
      'margin-bottom': '0px'
      }
    }else{
    }
    return c
  },
  },
  mounted() {
     this.$nextTick(() => {
        this.init()
     })
      
    // this.closeScroll()
    // window.addEventListener('scroll', this.closeScroll, true);
  },
  methods: {
    init(){
      var that = this
        window.handleAdEvent = (...rest) => {
          const evt = rest[0];
          if (evt === "CLICK") {
            
          } else if (evt === "CLOSE") {
          } else if (evt === "SHOW") {
            if (!this.$store.state.x5show) {
              this.$store.commit("setX5");
              var lineArray = document.getElementsByClassName("line");
              Array.prototype.forEach.call(lineArray, function(el) {
                el.style.visibility = "visible";
              });
            }
          }
        };
        window.handleAdError = (...rest) => {
          const evt = rest[0];
        };
        var div = document.createElement("div");
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = this.info.src + Math.random();
        script.setAttribute("posid", this.info.type, 0);
        script.setAttribute("onAdEvent", "handleAdEvent");
        script.setAttribute("onAdError", "handleAdError");
        script.setAttribute("adkey", this.info.adkey);
        div.appendChild(script);
        document.getElementById(this.randomId).appendChild(div)
        // this.$refs.teng.appendChild(div);
    },
    closeScroll() {
      let sogou_div = document.getElementById(this.randomId);
      const offset = sogou_div.getBoundingClientRect();
      const offsetTop = offset.top;
      const offsetBottom = offset.bottom;
      // 进入可视区域
      if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
        if (this.flag) {
       
          this.flag = false;
        }
      }
    }
  },
  destroyed(){
    // window.removeEventListener('scroll', this.closeScroll, true);
  }

};
</script>
<style  scoped>
.tbsdialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
     width: 85%;
}

</style>
