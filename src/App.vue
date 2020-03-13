<template>
  <div id="app" v-cloak>
    <transition :name="page">
      <!-- <keep-alive> -->
      <router-view v-if="isRouterAlive" class="container"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
// import CFooter from './components/Footer.vue'
import CTop from "./components/Top.vue";
import { buyr_point } from "@/api/news";

export default {
  metaInfo: {
    title: "月亮资讯", // set a title
    meta: [
      {
        // set meta
        name: "keyWords",
        content: "月亮资讯"
      }
    ]
  },
  name: "app",
  beforeDestroy() {
    // let params = {};
    // params.enterTime = "123123123";
    // params.ip = returnCitySN.cip;
    // params.historyPath = "customer/100/1";
    // params.deviceInfo = { info: "test" };
    // params.stayTime = "123123123";
    // buyr_point(params);
  },
  created() {
    let fuel_time = [];
    localStorage.setItem("fuel_time", JSON.stringify(fuel_time));

 

    // this.fuel_time = JSON.parse(localStorage.getItem('fuel_time'));

    // let params = {};
    //   params.enterTime = "123123123";
    //   params.ip = returnCitySN.cip;
    //   params.historyPath = "customer/100/1";
    //   params.deviceInfo = { info: "test" };
    //   params.stayTime = "123123123";
    //   buyr_point(params);
  },

  provide() {
    return {
      reload: this.reload
    };
  },

  data() {
    return {
      page: "",
      isRouterAlive: true
    };
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },

  components: {
    // CFooter,
  },
  watch: {
    $route(to, from) {
      if (to.path.includes("content")) {
        this.page = "content-right";
      } else if (from.path.includes("content")) {
        this.page = "content-left";
      } else {
        this.page = "fadeIn";
      }
    }
  }
};
</script>

<style lang="scss">
@import "./assets/style/common.scss";
@import "./assets/style/newsList.scss";
@import "./assets/style/global.scss";
@import "./assets/style/transition.scss";
a:link,
a:active,
a:visited {
  text-decoration: none;
}
</style>
