const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    // publicPath: '/nbaapp/',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/nbaapp/' // note the trailing slash
        : '/',
    transpileDependencies: true,
});
