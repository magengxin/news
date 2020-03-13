<template>
<div></div>
</template>
<script>
export default {
    data(){
        return {
            src:""
        }
    },
    created(){
       window.location.href =  this.$route.query.url;
    },
    mounted(){
            window.location.href =  this.$route.query.url;
    },
    activated(){
               window.location.href =  this.$route.query.url;
    }
}
</script>

<style scoped>
</style>