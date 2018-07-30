<template>
  <div class="iphoneX" v-if="isIphoneX"></div>
</template>

<script>
import { fixIphoneX } from '../utils/util';
export default {
  data() {
    return {
      isIphoneX: false
    };
  },
  mounted() {
    fixIphoneX(() => {
      this.isIphoneX = true;
    });
  }
};
</script>

<style>
.iphoneX {
  height: 34px;
}
</style>
