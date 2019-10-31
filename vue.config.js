const HappyPack = require('happypack');
const os = require('os');
let happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

// see https://github.com/vuejs/vue-cli/tree/dev/docs/zh/config || https://cli.vuejs.org/zh/config/

module.exports = {
    configureWebpack: config => {
        config.plugins.push(new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        }));
    },
    devServer: {
        port: 9000,
        open: process.platform === 'darwin',
        https: false,
        hotOnly: false,
        proxy: {
            "/api": {
                target: process.env.VUE_APP_API_BASE_URL
            }
        }
    },
    publicPath: '/forums',
    runtimeCompiler: true
};
