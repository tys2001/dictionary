import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store.js'


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.prototype.$store = store
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
