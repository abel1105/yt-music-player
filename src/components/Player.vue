<template>
  <div class="player">
    <div class="player-info"></div>
    <div class="player-status"></div>
    <div class="player-volume"></div>
  </div>
</template>

<script>
export default {
  name: 'player',
  computed: {
    current() {
      return this.$store.getters.current;
    }
  }
};
</script>

<style lang="scss" scoped>
.player {
  width: 100vw;
  height: 135px;
  display: grid;
  background: $grey;
}
</style>
