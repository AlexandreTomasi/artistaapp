import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'
import store from './config/store'
import router from './config/router'

import 'v-slim-dialog/dist/v-slim-dialog.css'
import SlimDialog from 'v-slim-dialog'
Vue.config.productionTip = false
Vue.use(SlimDialog)


new Vue({
  store,
  router,
  SlimDialog,
  render: h => h(App),
}).$mount('#app')
