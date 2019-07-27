module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/yt-music-player/' : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.scss";`
      }
    }
  }
};
