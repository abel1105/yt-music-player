<template>
  <div class="middlePanel">
    <div class="middlePanel-cover">
      <md-icon class="md-size-2x">keyboard_arrow_left</md-icon>
      <md-icon class="md-size-2x">keyboard_arrow_right</md-icon>
      <div class="middlePanel-search">
        <input class="middlePanel-input" placeholder="search" />
      </div>
      <h1 class="middlePanel-artist">Taylor Swift</h1>
      <div class="middlePanel-follow">
        <h4 class="middlePanel-follow-title">Follower 38,896,322</h4>
        <button class="middlePanel-follow-btn">Follow</button>
      </div>
    </div>
    <div class="middlePanel-content">
      <div>
        <h2 class="middlePanel-title">
          Top Song
          <md-icon>play_circle_outline</md-icon>
        </h2>
        <div class="middlePanel-list">
          <div
            :key="index"
            class="middlePanel-list-item"
            :class="{ 'middlePanel-list-item--active': index === currentIndex }"
            v-for="(item, index) in list"
            @click="changeSong(index)"
          >
            <img class="middlePanel-list-img" :src="image(item)" />
            <h3 class="middlePanel-list-number">{{ index + 1 }}</h3>
            <div @click.stop="toggleLove(index)">
              <md-icon>
                {{ item.isLove ? 'favorite' : 'favorite_border' }}
              </md-icon>
            </div>
            <h3 class="middlePanel-list-title">
              {{ item.title }}
              <md-icon
                v-if="index === currentIndex"
                class="middlePanel-list-play"
              >
                play_circle_outline
              </md-icon>
            </h3>
            <md-icon>more_horiz</md-icon>
            <h3 class="middlePanel-list-time">{{ item.time }}</h3>
          </div>
        </div>
      </div>
      <div>
        <h2 class="middlePanel-title">New Album</h2>
        <div class="middlePanel-album">
          <img class="middlePanel-album-img" src="../assets/lover.png" />
          <div class="middlePanel-album-content">
            <h3>Lover</h3>
            <h4>2019</h4>
          </div>
        </div>
        <div class="middlePanel-album">
          <img class="middlePanel-album-img" src="../assets/reputation.png" />
          <div class="middlePanel-album-content">
            <h3>Reputation</h3>
            <h4>2017</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiddlePanel',
  computed: {
    currentIndex() {
      return this.$store.state.index;
    },
    list() {
      return this.$store.state.list;
    }
  },
  methods: {
    image(current) {
      return require(`../assets/${current.album}`);
    },
    toggleLove(index) {
      this.$store.commit('toggleLove', index);
    },
    changeSong(index) {
      this.$store.commit('changeSong', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.middlePanel {
  &-cover {
    width: 100%;
    height: 200px;
    background: url('../assets/taylor_swift.png');
    background-size: cover;
    position: relative;
    color: $white;
    padding: 10px;
  }

  &-artist {
    margin: 0;
    color: $white;
    position: absolute;
    bottom: 0;
    left: 20px;
    font-size: 70px;
    line-height: 1.3;
  }

  &-search {
    position: absolute;
    top: 20px;
    right: 20px;

    &::after {
      content: 'search';
      font-family: 'Material Icons';
      width: 28px;
      height: 28px;
      font-size: 28px;
      position: absolute;
      top: 4px;
      right: 10px;
      color: $secondary_text;
    }
  }

  &-input {
    position: relative;
    right: 0;
    margin: 0;
    padding: 0 10px;
    border-radius: 15px;
    border: none;
    height: 28px;
    width: 200px;

    &:focus {
      outline: none;
    }
  }

  &-follow {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    &-title {
      margin: 10px 0;
    }

    &-btn {
      width: 140px;
      border-radius: 14px;
      background: none;
      color: $white;
      height: 28px;
      font-weight: bold;
      transition: all 0.4s ease-in-out;

      &:hover {
        background: $white;
        color: $primary;
      }

      &:active {
        border-style: solid;
      }
    }
  }

  &-content {
    display: grid;
    width: 100%;
    height: calc(100vh - 200px - 135px);
    padding: 25px;
    grid-template-columns: auto 200px;
    overflow: auto;
    grid-column-gap: 20px;
  }

  &-title {
    margin: 0;
  }

  &-list {
    display: grid;
    margin-top: 10px;

    &-item {
      border-bottom: 1px solid $border;
      display: grid;
      grid-template-columns: 60px 40px 40px auto 60px 60px;
      align-items: center;

      &:first-child {
        border-top: 1px solid $border;
      }

      &--active {
        color: $primary;
      }

      &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      }

      h3 {
        margin: 0;
        font-weight: normal;
      }
    }

    &-img {
      width: 60px;
      height: 60px;
    }

    &-number {
      text-align: center;
      margin-left: 10px;
    }

    &-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-play {
      margin: 0;
    }

    &-time {
      text-align: center;
    }
  }

  &-album {
    display: grid;
    grid-template-columns: 100px auto;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin-top: 10px;

    &-img {
      width: 100px;
      height: 100px;
    }

    &-content {
      display: flex;
      flex-direction: column;

      h3,
      h4 {
        font-weight: normal;
        margin: 8px 0;
      }
    }
  }
}
</style>
