<template>
  <div class="home">
    <Content />
    <Player :openAd="openAd" />
    <Ad v-if="showAd" :closeAd="closeAd" />
  </div>
</template>

<script>
import Player from '@/components/Player';
import Content from '@/components/Content';
import Ad from '@/components/Ad';

export default {
  name: 'home',
  components: {
    Ad,
    Player,
    Content
  },
  data() {
    return {
      hasShowBefore: false,
      showAd: false
    };
  },
  methods: {
    closeAd() {
      this.showAd = false;
    },
    openAd() {
      if (!this.hasShowBefore) {
        this.showAd = true;
        this.hasShowBefore = true;
      }
    }
  }
};
</script>
