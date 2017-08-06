# Vue-CN-Node 
## 前言
> 在学习Vue期间，想自己构建一个项目来练习练习，正好发现了[CNode社区](https://cnodejs.org/api)有提供相应的API接口。因此就用Vue把这个项目做了出来
### 相关地址
**源码地址**: [点我查看](https://github.com/spezz07/Vue-CN-Node)

**项目地址**: [点我查看](http://spezz07.info/vue/Vue-CN-Node/)

**问题记录**: [点我查看](http://spezz07.info/2017/08/07/记录下在写vue-cn-node时碰到的问题/)

## 技术栈
```
Vue2.0 //构建项目
Vue-Router //用于出来项目中的路由跳转
Vuex //官方提供的状态管理模式
Axios, Vue-Axios //官方推荐的http请求模块
Muse-ui //UI框架
Monent.js //时间格式化
Sass //Css预编译器
```

##项目结构
```
│  index.html  
│  package.json
│  README.md
│  
├─build
│      build.js
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│      
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│      
├─src                                                          // 项目文件位置
│  │  App.vue                                                 // 组件总入口 
│  │  main.js  // 全局相关依赖js文件入口
│  │  
│  ├─assets  // 静态文件
│  │      background.jpg
│  │      gg.svg
│  │      style.css
│  │      user_defult.png
│  │      
│  ├─components                                               // 项目组件
│  │      collection.vue                                      // 收藏页面
│  │      index.vue                                           // 首页
│  │      loading.vue                                         // loading组件
│  │      login.vue                                           // 登录页面
│  │      newpost.vue                                         // 发新帖页面
│  │      notice.vue                                          // 提示功能（暂时没完成）
│  │      post-content.vue                                    // 帖子内容页
│  │      recent-content.vue                                  // 用户最近回复，主题页面
│  │      slide.vue                                           // 侧边栏
│  │      userdetail.vue                                      // 用户详情页
│  │      
│  ├─router
│  │      index.js                                            // 路由设置
│  │      
│  └─store
│      │  store.js                                            // 状态管理
│      │  
│      └─modules
│              collection-mutation-types.js
│              collection.js                                  // 用户收藏功能
│              index-mutation-types.js 
│              index.js                                       // 首页
│              login-mutation-types.js
│              login.js                                       // 登录页（用户相关的信息存储）
│              newpost.js                                     // 发新帖
│              postcontent-mutation-types.js
│              postcontent.js                                 // 帖子内容页
│              userdetail-mutation-types.js
│              userdetail.js                                  // 用户详情页
│              
└─static
    │  .gitkeep
    │  
    └─iconfont              // Muse-ui使用了Google的相关字体文件,因为国内网络原因- -!,就使用本地部署字体
            codepoints
            material-icons.css
            MaterialIcons-Regular.eot
            MaterialIcons-Regular.ijmap
            MaterialIcons-Regular.svg
            MaterialIcons-Regular.ttf
            MaterialIcons-Regular.woff
            MaterialIcons-Regular.woff2     
```
## 功能实现情况
### 根据所提供的Api 完成了以下功能
 - [x] 首页
 - [x] 无限懒加载文章列表
 - [x] 根据tab切换首页内容
 - [x] 帖子内容页
 - [x] 用户登录，退出
 - [x] 个人主页
 - [x] 我的收藏
 - [x] 在帖子内容页中点击用户头像，可以进入该用户的主页
 - [x] 登陆后，可在帖子内容页点赞和评论
 - [x] 登陆后，可以回复某人评论
 - [x] 登陆后，可以发布新主题
 - [ ] 消息通知，消息设置已读功能
 - [ ] 对自己的文章可以进行编辑更新
 - [ ] 相关操作成功或失败后的消息提醒(现在的话只是用了浏览器的自带的alert,后续会添加提示功能)
 - [ ] 页面切换时的动态效果(有Bug，待修复，因此先取消此项功能)
 
 
 ## 安装
 
 ``` bash
 # install dependencies
 npm install
 
 # serve with hot reload at localhost:8080
 npm run dev
 
 # build for production with minification
 npm run build
 
 # build for production and view the bundle analyzer report
 npm run build 
 ```
### 总结
这是我的第一个自己构思和完成的项目，碰到的bug很多，在解决bug的过程中也有许多收获。希望这个项目也能帮助到大家~
