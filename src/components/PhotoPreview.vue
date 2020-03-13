<template>
<div v-show="show"></div>
  

</template>

<script>
export default {
    data(){
        return{
            show:false,

        }
    },
    props:{
        imgList:Array,
    },
    methods:{
        open(index){

        }
    }

}
</script>


<style>

</style>