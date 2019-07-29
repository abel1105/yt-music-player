<template>
  <div class="home">
    <Content />
    <Player />
  </div>
</template>

<script>
import Player from '@/components/Player';
import Content from '@/components/Content';

export default {
  name: 'home',
  components: {
    Player,
    Content
  }
};
</script>
