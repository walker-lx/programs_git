<template>
  <div>
    <transition :name='transitionName'>
      <router-view class='child-view'></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'slide-left'
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log('back');
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = 'slide-right';
    } else {
      this.transitionName = 'slide-left';
    }
    this.$router.isBack = false;
    next();
  }
};
</script>

<style scoped>
.child-view {
  transition: opacity 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  /* opacity: 0; */
  /* transform: translate(10px, 0); */
  background-color: #3b0053;
}
.slide-left-leave-active,
.slide-right-enter {
  /* opacity: 0; */
  /* transform: translate(-10px, 0); */
  background-color: #3b0053;
}
</style>
