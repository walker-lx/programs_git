<template>
  <div class="wx-gesture" v-if='hideMask' @click="hideWxMask">
    <div class="shareArrow"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideMask: true
    };
  },
  methods: {
    hideWxMask() {
      this.hideMask = false;
      this.$emit('closeGesture', 'true');
    }
  }
};
</script>

<style lang='scss' scoped>
.wx-gesture {
  position: fixed;
  z-index: 105;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.68);
  .shareArrow {
    position: absolute;
    top: 0;
    right: 20px;
    width: 62px;
    height: 102px;
    background: url("../assets/img/shareTip.png") no-repeat;
    background-size: 62px 102px;
  }
}
</style>
