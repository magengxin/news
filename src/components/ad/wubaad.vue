<template>
  <img 
       :src="listImgList[mathRandom(0, 0)]"
       style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
       @click="openAd"
  />
</template>

<script>
  import tongCheng1 from '@/assets/58/5801.jpg';
  import tongCheng2 from '@/assets/58/5802.png';
  import tongCheng3 from '@/assets/58/5803.png';
  import tongCheng4 from '@/assets/58/5804.jpg';
  import { randomNum } from '@/utils/mathUtil';
  export default {
    props: {
      info: {}
    },
    data() {
      return {
        mathRandom: randomNum,
        listImgList: [
          tongCheng1,
          tongCheng2,
          tongCheng3,
          tongCheng4,
        ]
      };
    },
    mounted() {
    },
    methods: {
      openAd() {

     this.$router.push({
              path: '/adIframe',
              query: {
                url:
                  'https://jumpluna.58.com/i/2e319ab7e97pnc46zg'
              }
            });
    }
    }
  }
</script>