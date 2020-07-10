<template>
  <div id="app" v-if="isReloadAlive" v-cloak>
    <router-view></router-view>
  </div>
</template>
<script>
// import CFooter from './components/Footer.vue'
import { buyr_point, tac_img } from "@/api/news";
import { getIp } from "@/api/outUrl";
import Clipboard from "clipboard";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  metaInfo: {
    title: "月亮资讯", // set a title
    meta: [
      {
        // set meta
        name: "keyWords",
        content: "月亮资讯"
      },
      {
        // set meta
        name: "referrer",
        content: "no-referrer"
      }
    ]
  },

  mounted() {
    // window.addEventListener("unload", this.saveState);
  },
  name: "app",
  async created() {
    let keyName = "userLogin";
    console.info("this.$cookies.get(keyName)", this.$cookies.get(keyName));
    if ($cookies.isKey(keyName)) {
    } else {
      $cookies.set(keyName,this.genUid());
    }

    await this.getImgsList();

    let fuel_time = [];
    localStorage.setItem("fuel_time", JSON.stringify(fuel_time));
  },

  provide() {
    return {
      reload: this.reload
    };
  },

  data() {
    return {
      page: "",
      isReloadAlive: true
    };
  },
  computed: {
    ...mapGetters(["imageStore"])
  },
  methods: {
    genUid() {
      var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
    },
    getImgsList() {
      this.imageStore.forEach(v => {
        this.getTacImg(v.name, v.version);
      });
    },
    getTacImg(comment, v) {
      tac_img({ comment: comment, version: v })
        .then(v => {
          if (!v.data.data.length) {
            this.getTacImg(comment, 0);
          } else {
            this.saveCommentLocalStorage(comment, v);
          }
        })
        .catch(error => {});
    },
    saveCommentLocalStorage(comment, v) {
      let obj = {
        comment: comment,
        data: v.data.data,
        version: v.data.version
      };
      this.$store.dispatch("home/changeImgsData", obj);
    },
    getUserIP(onNewIP) {
      let MyPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      let pc = new MyPeerConnection({
        iceServers: []
      });
      let noop = () => {};
      let localIPs = {};
      let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
      let iterateIP = ip => {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      };
      pc.createDataChannel("");
      pc.createOffer()
        .then(sdp => {
          sdp.sdp.split("\n").forEach(function(line) {
            if (line.indexOf("candidate") < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });
          pc.setLocalDescription(sdp, noop, noop);
        })
        .catch(reason => {});
      pc.onicecandidate = ice => {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    },
    saveStateSync() {
      // //在页面加载时读取localStorage里的状态信息
      // if (sessionStorage.getItem("stateMsg")) {
      //   this.$store.replaceState(JSON.parse(sessionStorage.getItem("stateMsg")));
      // }
      // //在页面刷新时将vuex里的信息保存到localStorage里
      // window.addEventListener("beforeunload", () => {
      //   sessionStorage.setItem("stateMsg", JSON.stringify(this.$store.state));
      // });
    },
    saveState() {
      // sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    },

    reload() {
      this.isReloadAlive = false;
      this.$nextTick(function() {
        this.isReloadAlive = true;
      });
    },
    copyLink(data) {
      let clipboard = new Clipboard(".tag", {
        text: function() {
          return data;
        }
      });
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        clipboard.destroy();
      });
    }
  },
  components: {},
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
[v-cloak] {
  display: none !important;
}

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
