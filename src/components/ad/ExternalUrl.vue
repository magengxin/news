<template>

  <img 
       :src="listImgList[mathRandom(0, 13)]"
       style="margin-top: 15px; width: 100%; height: 100%; object-fit: fill"
       @click="openAd"
  />
</template>

<script>


  import tuiya1 from '@/assets/ad/tuiya1.jpg';
  import tuiya2 from '@/assets/ad/tuiya2.png';
  import tuiya3 from '@/assets/ad/tuiya3.png';
  import tuiya4 from '@/assets/ad/tuiya4.png';
  import tuiya5 from '@/assets/ad/tuiya5.png';
  import tuiya6 from '@/assets/ad/tuiya6.png';
  import tuiya7 from '@/assets/ad/tuiya7.png';
  import tuiya8 from '@/assets/ad/tuiya8.png';
  import tuiya9 from '@/assets/ad/tuiya9.png';
  import tuiya12 from '@/assets/ad/tuiya12.png';
  import tuiya15 from '@/assets/ad/tuiya15.png';
  import tuiya19 from '@/assets/ad/tuiya19.png';
  import tuiya20 from '@/assets/ad/tuiya20.png';
  import tuiya21 from '@/assets/ad/tuiya21.png';
  import { randomNum } from '@/utils/mathUtil';
  export default {
    props: {
      info: {}
    },
    data() {
      return {
        mathRandom: randomNum,
        listImgList: [
          tuiya1,
          tuiya2,
          tuiya3,
          tuiya4,
          tuiya5,
          tuiya6,
          tuiya7,
          tuiya8,
          tuiya9,
          tuiya12,
          tuiya15,
          tuiya19,
          tuiya20,
          tuiya21
        ]
      };
    },
    mounted() {
    },
    methods: {
      openAd() {
        const customerName = this.$route.params.customerName;
        const name = this.info.typeName;

        if (name === 'tuiya') {
          {
            this.$router.push({
              path: '/adIframe',
              query: {
                url:
                  'https://engine.tuicoco.com/index/activity?appKey=3ZVQvQpCY6C2TTMdYnTo4GPhvjyz&adslotId=' +
                  this.info.id
              }
            });
          }
        } else if (name === 'hudongtui') {
          const routeData = this.$router.resolve({
            path: '/adIframe',
            query: {
              url:
                'https://display.intdmp.com/site_login_ijf.htm?app_key=adhu4d4bb76314be4d29'
            }
          });
          window.open(routeData.href, '_blank');
        }  else if (name === 'baichuanhudong') {
          const routeData = this.$router.resolve({
            path: '/adIframe',
            query: {
              url:
                'https://game.hdbaichuan.cn/show.htm?app_key=0540ea929e754582'
            }
          });
          window.open(routeData.href, '_blank');
        }else if (name === 'bianxianmao') {
          if (customerName === '653829632672780288') {
            const routeData = this.$router.resolve({
              path: '/adIframe',
              query: {
                url:
                  'https://i.iwanbei.cn/activities?appKey=d2edfebb1b244cd9a43a9ec03b0e8aa9&appEntrance=' +
                  this.info.id +
                  '&business=money'
              }
            });
            window.open(routeData.href, '_blank');
          } else {
            this.$router.push({
              path: '/adIframe',
              query: {
                url:
                  'https://i.iwanbei.cn/activities?appKey=d2edfebb1b244cd9a43a9ec03b0e8aa9&appEntrance=' +
                  this.info.id +
                  '&business=money'
              }
            });
          }
        } else if (name === 'doumeng') {
          window.location.href =
            "https://backup.39temai.top/static/kaimen1/index.html?hdgghtmlid=506&appkey=94b507b748994ea2b1e209b3c299adc7&adSpaceKey=02d59bbe039adf370f04dcd2ec22cc7a&from=H5&1=1&t=1578378971637&interactionType=html";
        }else  {
          window.location.href = this.info.url
        }
      }
    }
  };
</script>