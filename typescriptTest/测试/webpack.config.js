const path = require('path')
const htmlWebPlugin = require('html-webpack-plugin')

module.exports = {
    //指定入口文件
    entry: "./src/index.ts",
    //指定打包文件目录,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    //打包时使用的模块
    module: {
        rules: [
            {
                //test指定生效的文件；这里是.ts结尾的文件
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    //配置webpack插件
    plugins: []
}