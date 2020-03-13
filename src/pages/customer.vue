<template>
  <router-view></router-view>
</template>

<script>
import { getChannelList, taccodejs } from "@/api/news";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      customerName: "",
      channelId: 0,
      channelList: []
    };
  },
  created() {
    this.getChannels();

  },

  methods: {
    ...mapActions(["setBid","setCustomerJs"]),

    async getChannels() {
      await getChannelList(this.$route.params.customerName).then(({ data }) => {
        let newList = data.list;
        this.channelId = newList[0].id;
        this.$router.push(
          "/customer/" + this.$route.params.customerName + "/" + this.channelId
        );
      });
    }
  }
};
</script>

<style>
</style>