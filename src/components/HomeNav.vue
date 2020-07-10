<template>
  <div class="home_nav">
    <ul class="home_nav_list" ref="homenav">
      <router-link
          v-for="item in channelList"
          class="home_nav_item"
          :key="item.id + ''"
          :to="item.path"
          :query="item.query"
          tag="li"
      >
        <div class="line">{{item.name}}</div>
        <div class="under_line"></div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import * as type from '../store/mutations_type.js';
  import { getChannelList } from '@/api/news';
  import { mapActions, mapState } from 'vuex';
  import store from '@/store';

  export default {
    created() {
  
      this.getChannels();
    },
    data() {
      return {
        customerName: '',
        channelId: 0,
        channelList: [
             {
                "id":1,
                "name":"推荐"
            },
            {
                "id":6,
                "name":"搞笑"
            },
            {
                "id":27,
                "name":"情感"
            },
            {
                "id":20,
                "name":"健康"
            },
            {
                "id":17,
                "name":"美食"
            },
            {
                "id":13,
                "name":"社会"
            },
            {
                "id":10,
                "name":"游戏"
            },
            {
                "id":2,
                "name":"娱乐"
            },
            {
                "id":3,
                "name":"汽车"
            },
            {
                "id":4,
                "name":"财经"
            },
            {
                "id":5,
                "name":"教育"
            },
            {
                "id":7,
                "name":"体育"
            },
       
            {
                "id":12,
                "name":"热点"
            },
            {
                "id":14,
                "name":"军事"
            },
            {
                "id":15,
                "name":"历史"
            },
            {
                "id":16,
                "name":"科技"
            },
            {
                "id":18,
                "name":"时尚"
            },
            {
                "id":23,
                "name":"国际"
            },
          
            {
                "id":29,
                "name":"旅游"
            },
            {
                "id":30,
                "name":"美文"
            },
            {
                "id":31,
                "name":"房产"
            },
        ]
      };
    },
    watch: {
      $route() {
        store.dispatch('setSdNumber', '11');
      }
    },
    methods: {
      ...mapActions(['setBid', 'setCustomerJs']),
      async getChannels() {
        // await getChannelList(this.$route.params.customerName).then(({ data }) => {
        //   let newList = data.list;
        //   let dataL = [];
        //   dataL = data.list;
        //   dataL.forEach(element => {
        //       element.path = '/customer/' + this.$route.params.customerName + '/' + element.id;
        //   });
        //   this.channelList = dataL;
        // });
          this.channelList.forEach(element => {
              element.path = '/customer/' + this.$route.params.customerName + '/' + element.id;
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../assets/style/common.scss";

  .home_nav {
    position: fixed;
    top: px2rem(0px);
    left: 0;
    width: 100%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
    height: px2rem(80px);
    z-index: 50;
    background-color: white;
    text-align: center;
  }

  .home_nav_list {
    padding: 2px;
    display: flex;
    overflow: auto;
  }

  .home_nav_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    height: px2rem(80px);
    @include font-dpr(15px);
    flex-shrink: 0;
    // flex-basis: px2rem(90px);
    padding: 0 px2rem(12px);
    color: #7d7d7d;
  }

  .router-link-active {
    color: #333333;
    font-weight: bold;
  }

  .line {
    margin-top: px2rem(10px);
  }

  .under_line {
    width: px2rem(24px);
    margin-bottom: px2rem(24px);
  }

  .router-link-active .under_line {
    border-bottom: solid #fe6d6b px2rem(4px);
    border-radius: px2rem(2px);
    width: px2rem(24px);
    margin-bottom: px2rem(24px);
  }
</style>
