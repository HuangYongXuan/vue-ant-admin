const webpack = require('webpack');
const HappyPack = require('happypack');
const Compression = require('compression-webpack-plugin');
const os = require('os');
let happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

// see https://github.com/vuejs/vue-cli/tree/dev/docs/zh/config || https://cli.vuejs.org/zh/config/

const assetsCDN = {
    // main.js里引入了对应的less以使 webpack-theme-color-replacer工作
    // https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.css
    css: [
        'https://cdn.jsdelivr.net/npm/ant-design-vue@1.4.6/dist/antd.min.css'
    ],
    js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
        'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
        'https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
        'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
        'https://cdn.jsdelivr.net/npm/ant-design-vue@1.4.6/dist/antd.min.js'
    ]
};
// 'axios', 'vue-router', 'vuex', 'ant-design-vue'
let libs = ['vue', 'ant-design-vue/dist/antd.min.css'];

module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.externals = {
                'vue': 'Vue',
                'axios': 'axios',
                'vue-router': 'VueRouter',
                'vuex': 'Vuex',
                'ant-design-vue': 'antd',
            };
            if (process.env.PRODUCTION_PACKAGE_GZIP === 'true') {
                config.plugins.push(
                    new Compression({
                        test: /\.(js|css|png|jpg|jpeg)$/, 			// 需要被压缩的文件后缀名
                        filename: '[path].gz[query]', 	// filename
                        threshold: 10240, 				// 大于多少字节开始压缩
                        deleteOriginalAssets: false 	// 是否删除源文件
                    })
                );
            }
        }
        config.plugins.push(new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        }));
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugin('html').tap(args => {
                args[0].cdn = assetsCDN;
                return args;
            });
        }
    },
    devServer: {
        port: 9000,
        open: process.platform === 'darwin',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API_BASE_URL
            }
        }
    },
    publicPath: '/forums',
    runtimeCompiler: true,
    productionSourceMap: false,
    outputDir: 'dist/forums'
    // assetsDir: './static'
};

