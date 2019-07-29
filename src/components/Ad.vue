<template>
  <div class="ad" @click="closeAd">
    <div class="ad-close"><md-icon class="md-size-3x">close</md-icon></div>
    <img class="ad-img flipInX animated" src="../assets/AD.png" />
  </div>
</template>

<script>
export default {
  name: 'ad',
  props: {
    closeAd: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.ad {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;

  &-close {
    position: absolute;
    right: 40px;
    top: 40px;
    color: rgba(255, 255, 255, 0.7);
  }

  &-img {
    max-width: 1000px;
    width: 100%;
  }
}
</style>
