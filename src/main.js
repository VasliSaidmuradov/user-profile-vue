import Vue from 'vue'
import App from './App.vue'
import './assets/main.scss'
import VueMask from 'v-mask'

Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
