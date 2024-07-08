import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from '../src/config/index'
import store from './store'
import * as echarts from 'echarts'
import dataV from '@jiaminghi/data-view'
import 'lib-flexible/flexible'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/style.less'
Vue.use(ElementUI);
Vue.use(dataV)
Vue.prototype.$echarts=echarts
/**
 * @description 生产环境关掉提示
 */
 Vue.config.productionTip = false
 /**
  * @description 全局注册应用配置
  */
 Vue.prototype.$config = config
 /**
  * @description 页面标签名根据路由配置
  */

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
 
