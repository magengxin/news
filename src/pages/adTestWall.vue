<template>
  <div>
      <ulh v-for="(item,index) in ulhList" :key="index" :info="item"></ulh>
    <tengcentAd v-for="(item,index) in infoList" :key="index" :tacType="'ssss'" :info="item"></tengcentAd>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ulhList: [
        {
          placement_id: "9031414551381548"
        },
        {
          placement_id: "9021710591083619"
        },
        {
          placement_id: "9001312531333615"
        },
        {
          placement_id: "1061818531286693"
        },
        {
          placement_id: "6071811571439659"
        },
        {
          placement_id: "8031317554795263"
        },
        {
          placement_id: "7071418531335602"
        }
      ],
      infoList: [
        {
          type: "100231",
          src:
            "https://tbsad.imtt.qq.com/tbs/jssdk/js/formal/TBSJSSDK.js?rand=",
          adkey: "163f404c807093f9d83a719ab45f2129"
        },
        ,
        {
          type: "100329",
          src:
            "https://tbsad.imtt.qq.com/tbs/jssdk/js/formal/TBSJSSDK.js?rand=",
          adkey: "83c0ddd51fa6308dd5e1c862f054b308"
        },
        {
          type: "100239",
          src:
            "https://tbsad.imtt.qq.com/tbs/jssdk/js/formal/TBSJSSDK.js?rand=",
          adkey: "956568e6f52af88f391262efc0a54f25"
        },
        {
          type: "100224",
          src:
            "https://tbsad.imtt.qq.com/tbs/jssdk/js/formal/TBSJSSDK.js?rand=",
          adkey: "7cc5d5845bcbe0d7b32082a3ae6fe6c9"
        },
        {
          type: "100239",
          src:
            "https://tbsad.imtt.qq.com/tbs/jssdk/js/formal/TBSJSSDK.js?rand=",
          adkey: "7afab632021d8c43d8bbbe6eed0bbf8a"
        },
        {
          type: "100335",
          src:
            "https://tbsad.imtt.qq.com/tbs/jssdk/js/formal/TBSJSSDK.js?rand=",
          adkey: "160f3e9d4036753e4873b583e1d97d41"
        },
        ,
        {
          type: "100329",
          src:
            "https://tbsad.imtt.qq.com/tbs/jssdk/js/formal/TBSJSSDK.js?rand=",
          adkey: "83c0ddd51fa6308dd5e1c862f054b308"
        }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      var doc = document,
        h = doc.getElementsByTagName("head")[0],
        s = doc.createElement("script");
      s.async = true;
      s.src = "//qzs.qq.com/qzone/biz/res/i.js";
      h && h.insertBefore(s, h.firstChild);
    }, 500);
  }
};
</script>

<style>
</style>