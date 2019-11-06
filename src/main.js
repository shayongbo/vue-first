// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'
// Vue.prototype.$http=axios;
Vue.config.productionTip = false;//阻止生产指令生成
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',//index.html
  router,
  store,
  components: { App },
  template: '<App/>'
})
