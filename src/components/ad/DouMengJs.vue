
<template>
  <div>
  <img class="adImage" :src="imageUrl" @click="jumpTo">
  </div>
</template>
<script>
  import {getDoumeng} from "@/api/news";
export default {
  props: {
    info: {}
  },
   
  data() {
    return {
       imageUrl:'',
       adUrl:''

     
    };
  },
  methods:{
    jumpTo(){
      // window.open(this.adUrl)
      window.location.href=this.adUrl

    }
  },
  mounted() {
     getDoumeng().then(v=>{
     let res = JSON.parse(v.data).result
     this.imageUrl = res.imageUrl
     this.adUrl = res.adUrl

    })
  },
}
</script>

<style lang="scss"  scoped>
@import "../../assets/style/common.scss";
.adImage {
  width: 100%;
}
</style>
