<template>
  <div>
    <h1>跃量科技资讯</h1>
    <div v-for="item in listData" :key="item.snowFuck">
        <title>{{item.title}}</title>
        <h2>{{item.title}}</h2>
        <h3>{{item.ipublishDate}}</h3>
        <div v-for="(imgItem,index) in item.imageArray" :key="index">
          <img :src="imgItem.url">
        </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from "@/api/news";
export default {
  data() {
    return {
      listData: []
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getNewsList({
        customerName: 100,
        channelId: 1,
        page: 1,
        pageSize: 20
      }).then(({data}) => {
          this.listData = data.list
      });
    }
  }
};
</script>

<style>
</style>