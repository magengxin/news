import { tac_img } from "@/api/news";
import { mapState, mapActions, mapGetters } from "vuex";

const dialogMixins = {
  data() {
    return {
      imInfo: {}
    };
  },
  computed: {
    ...mapState(['adNumber']),
    ...mapGetters(['imageStore'])
  },
  methods: {
    getImage(comment) {
      setTimeout(() => {
        let aa = this.imageStore.filter(v => {
          if (comment === v.name) {
            return v;
          }
        });
        this.exportData(comment, aa[0]);
      }, 800);
    },
    exportData(comment, v) {
      let aa = this.imageStore.filter(v => {
        if (comment === v.name) {
          return v;
        }
      });

      let rundomNumber = 0;
      let im = {};
      let data = aa[0].data;

      rundomNumber = comment === 'coin' ? 0 : Math.floor(Math.random() * data.length);
      im = data[rundomNumber];
      im = JSON.parse(JSON.stringify(im));

      im.width = im.width / 64 + "rem";
      im.url = process.env.CDN+"/" + im.url;
      this.imInfo = JSON.parse(JSON.stringify(im));
    }
  }
};

export default dialogMixins;
