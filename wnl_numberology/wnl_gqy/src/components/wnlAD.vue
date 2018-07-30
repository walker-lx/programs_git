<template>
    <div class="stage clearfix">
        <div class="stage-point" v-for="(v,index) in 3" :class="{active:stage == index}">{{v}}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
    }
}

</script>
<style scoped>

</style>
