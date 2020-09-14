module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/_variables.scss";
                `
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  productionSourceMap: process.env.NODE_ENV !== 'production'
};
