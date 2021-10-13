## 慕课 TS 高级课程

## 【第三章 第 5 节】

## 【TS 自动重启+TS 自动运行+Parcel 自动打包】

#### 步骤如下：

（1）初始化 npm init --yes 出现 package.json

（2） 安装 typescript

​ 全局安装 cnpm i typescript -g 或

​ 本地安装： cnpm i typescript -D 或

​ yarn 安装 yarn global add typescript

​ 【cnpm i typescript -D 是 cnpm install typescript --save-dev 的缩写】

(3）生成 tsconfig.json 文件

​ tsc --init

（4）修改 tsconfig.json 中的配置
“outDir: "./dist" --outDir 是 ts 编译后生成 js 文件保存的目录
"rootDir": "./src", --rootDir 是自己编写的 ts 源文件所在的目录
注意: dist src package.json 必须是在一个目录下

（5）编译 src 目录以及子目录下的 ts 文件

​ tsc 【在 src 当前目录下：输入 tsc 注意直接写 tsc 命令即可】
【会把 src 目录以及子目录下的 ts 文件全部编译成 js 文件，并全部输出到 dist 目录中】

（6）安装 ts-node

​ ts-node 让 node 能直接运行 ts 代码，无需使用 tsc 将 ts 代码编译成 js 代码。【ts-node 则包装了 node，它可以直接的运行 ts 代码】

​ 全局安装 cnpm i ts-node -g 或

​ 本地安装： cnpm i ts-node -D 或

​ yarn 安装：yarn global add ts-node

（6）安装 nodemon 工具 【自动检测工具】
nodemon 作用：【nodemon 可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于 node.js 的应用程序】

​ 全局安装 cnpm install -g nodemon 或

​ 本地安装： cnpm i nodemon -D 或

​ yarn 安装 yarn add nodemon -D

（7） 在 package.json 中配置自动检测，自动重启应用程序

       "scripts": {
    	 "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/app.ts"
        }

​ nodemon --watch src/ 表示检测目录是 package.json 同级目录 src

​ -e ts 表示 nodemon 命令准备将要监听的是 ts 后缀的文件

​ --exec ts-node ./src/project/app.ts 表示检测到 src 目录下有任何变化 都要重新执行 app.ts 文件

#### 2.Parcel 打包支持浏览器运行 TS 文件(不需要配置 直接 parcel 即可)

​ （1）安装 Parcel 打包工具：npm install parcel-bundler --save-dev

​ （2）在 package.json 中给 npm 添加启动项，支持启动 parcel 工具包

         "scripts": {
            "start": "parcel ./index.html"
          },

​ (3) 启动 parcel 工具包

​ cnpm run start 【cnpm start】或 npm run start 【npm start】或 yarn run start 【yarn start】

#### 慕课 TS 高级课程

#####

####

​

​
