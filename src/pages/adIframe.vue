<template>
<div>
</div>
</template>
<script>
export default {
    created(){
    },
    mounted(){
         window.location.href = this.$route.query.url
    },
}
</script>

<style scoped>
</style>