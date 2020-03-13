<template>
  <div class="home_nav">
    <ul class="home_nav_list" ref="homenav">
      <router-link
        v-for="item in channelList"
        class="home_nav_item"
        :key="item.id + ''"
        :to="item.path"
        tag="li"
      >
        <div class="line">{{item.name}}</div>
        <div class="under_line"></div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import * as type from "../store/mutations_type.js";
import { getChannelList } from "@/api/news";
import { mapActions, mapState } from "vuex";
import store from '@/store';

export default {
  created() {
    this.getChannels();
  },
  data() {
    return {
      customerName: "",
      channelId: 0,
      channelList: []
    };
  },
  watch: {
    $route() {
      store.dispatch('setSdNumber','11');
    }
  },
  methods: {
     ...mapActions(["setBid","setCustomerJs"]),
    async getChannels() {
      await getChannelList(this.$route.params.customerName).then(({ data }) => {
        let newList = data.list;
        let dataL = [];
        if (this.$route.params.customerName === "653528533889830912") {
          dataL.push(newList[1]);
          dataL.push(newList[5]);
          dataL.push(newList[8]);
          dataL.push(newList[9]);
          dataL.push(newList[2]);
          dataL.push(newList[3]);
          dataL.push(newList[4]);
          dataL.push(newList[6]);
          dataL.push(newList[7]);
        } else {
          dataL = data.list;
        }
        dataL.forEach(element => {
          element.path =
            "/customer/" + this.$route.params.customerName + "/" + element.id;
        });
        this.channelList = dataL;
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
  flex-basis: px2rem(90px);
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
