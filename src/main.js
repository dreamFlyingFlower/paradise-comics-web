// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Api from './global/api'
import Funcs from './global/funcs'
import VideoPlayer from 'vue-video-player'
import 'videojs-contrib-hls'
// import 'bootstrap'
import $ from 'jquery'

import 'element-ui/lib/theme-chalk/index.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


// 取消vue的所有日志和警告,true取消,false不取消
Vue.config.silent = false;
Vue.config.productionTip = false;
// 避免用控制台操作vue,在正式环境会自动编译为false
Vue.config.devtools = process.env.NODE_ENV === "development";

// 注入elementui
Vue.use(ElementUI);
// 注入video-player
Vue.use(VideoPlayer);
// 注入全局通用API
Vue.use(Api);
// 注入全局通用函数
Vue.use(Funcs);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
