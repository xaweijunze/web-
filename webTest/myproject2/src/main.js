// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.prototype.$http = axios;
/* eslint-disable no-new */
Vue.prototype.$axios=axios;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
