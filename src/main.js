import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './common/public/axios'

//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/css/video/cartoon.css'
import './assets/css/video/common.css'
import './assets/css/video/style.css'
import './assets/css/video/play.css'
import './assets/icons/iconfont.css'


Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// eslint-disable-next-line
var _hmt = _hmt || [];
// eslint-disable-next-line
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d9386e6b503a53e829efc72b804bcf21";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

//每一路由都跳转到百度
router.beforeEach((to, from, next) => {
  // eslint-disable-next-line
  if (_hmt) {
    if (to.path) {
      // eslint-disable-next-line
      _hmt.push(['_trackPageview', to.fullPath]);
    }
  }
  next();
});
