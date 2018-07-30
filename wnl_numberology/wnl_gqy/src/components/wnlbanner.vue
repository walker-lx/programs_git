<template>
    <div class="wnlBanner"
         v-if="!isWnl">
        <a class="closeBanner"
           href="javascript:void(0)"
           @click="closeBanner"></a>
        <div class="wnllogo"></div>
        <div class="ad-title">
            <div class="ad-t1">万年历</div>
            <div class="ad-t2">神准塔罗，把握财运先机</div>
        </div>
        <a class="downloadBtn"
           href="javascript:void(0)"
           @click="openApp">打开APP</a>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isWnl: true
        }
    },
    methods: {
        closeBanner() {
            this.isWnl = true;
        },
        openApp() {

        }
    }
}

</script>
<style scoped>

</style>
