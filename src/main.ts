import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from '@/eventBus'
import ELEMENT from 'element-ui'
Vue.config.productionTip = false
Vue.use(ELEMENT)
Vue.use(eventBus)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
