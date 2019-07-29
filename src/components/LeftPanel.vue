<template>
  <div class="leftPanel">
    <div class="leftPanel-wrapper">
      <div class="leftPanel-box">
        <h1>
          <img src="../assets/logo.svg" />
          Music Box
        </h1>
        <h2>
          <md-icon>home</md-icon>
          Home
        </h2>
        <h2>
          <md-icon>library_music</md-icon>
          Music
        </h2>
        <h2>
          <md-icon>radio</md-icon>
          Radio
        </h2>
      </div>
      <div class="leftPanel-box">
        <h3>Your music library</h3>
        <h2>Recently played</h2>
        <h2>Liked music</h2>
        <h2 class="active">Albums</h2>
        <h2>Singer</h2>
      </div>
    </div>
    <img class="leftPanel-album" v-if="current" :src="image" />
  </div>
</template>

<script>
export default {
  name: 'LeftPanel',
  computed: {
    current() {
      return this.$store.getters.current;
    },
    image() {
      return require(`../assets/${this.current.album}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.leftPanel {
  border-right: 1px solid $border;

  &-wrapper {
    height: calc(100vh - 280px - 135px);
    overflow: auto;
  }

  &-box {
    padding: 30px 28px 18px;
    border-bottom: 1px solid $border;
  }

  &-album {
    width: 280px;
    height: 280px;
  }

  h1 {
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
    font-weight: normal;
    margin: 0;

    img {
      width: 60px;
      height: 60px;
    }
  }

  h2 {
    font-weight: normal;
    padding: 6px 0;
    margin: 10px 0;

    i {
      margin-right: 12px;
    }

    &.active {
      margin-left: -28px;
      padding-left: 24px;
      border-left: 4px solid $primary;
    }
  }

  h3 {
    margin: 0;
    color: $secondary_text;
    font-weight: normal;
  }
}
</style>
