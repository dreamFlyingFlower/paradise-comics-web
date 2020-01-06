// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Api from './global/api'
import Funcs from './global/funcs'

Vue.config.productionTip = false;

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
