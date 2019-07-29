<template>
  <div class="rightPanel">
    <h2>
      <md-icon class="md-size-2x icon">person_outline</md-icon>
      My name
    </h2>
    <h3>Your music library</h3>
    <h2>My Love</h2>
    <h2>Chinese Music</h2>
    <h2>Western Music</h2>
    <h2>Peaceful Guitar</h2>
    <h2>KTV</h2>
    <h2>Jazzy Dinner</h2>
    <h2>Peaceful Piano</h2>
  </div>
</template>

<script>
export default {
  name: 'RightPanel'
};
</script>

<style lang="scss" scoped>
.rightPanel {
  border-left: 1px solid $border;
  height: calc(100vh - 135px);
  padding: 0 30px;

  h2 {
    font-weight: normal;
    padding: 6px 0;
    margin: 10px 0;

    .icon {
      color: $primary;
      border-radius: 50%;
      border: 1px solid $border;
      margin-right: 10px;
      width: 36px;
      height: 36px;
      min-width: 36px;
      font-size: 36px !important;
    }

    i {
      margin-right: 12px;
    }
  }

  h3 {
    margin: 0;
    color: $secondary_text;
    font-weight: normal;
  }
}
</style>
