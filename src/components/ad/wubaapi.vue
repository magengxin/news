<template>
  <img 
       :src="picture_url"
       style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
       @click="openAd"
  />
</template>

<script>
import {wuba} from '@/api/news'
import {show_url ,click_url } from '@/api/wuba'
  export default {
    props: {
      info: {}
    },
    data() {
      return {
       picture_url:'',
       showU:'',
       clickU:'',
       target_url:''
      };
    },
    mounted() {
        wuba().then(v=>{
        let obj = v.data.bid[0].creative
        this.picture_url = obj.picture_url
        this.target_url = 'https:'+obj.target_url.split(':')[1]
        this.showU = obj.show_url
        this.clickU = obj.click_url
        show_url({show_url:this.showU})
        })
    },
    methods: {
      openAd() {
               click_url({click_url:this.clickU})

     window.open(this.target_url)
    }
    }
  }
</script>