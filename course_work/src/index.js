import Vue from 'vue'
import router from './router'
import App from './App'
import BootstrapVue from 'bootstrap-vue'

import 'assets/css/app.styl'

import Vuetify from 'vuetify'
import { MdCard, MdIcon, MdField, MdTable, MdContent } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue2-animate/dist/vue2-animate.min.css'

Vue.use(BootstrapVue)

Vue.use(MdCard)
Vue.use(MdIcon)
Vue.use(MdField)
Vue.use(Vuetify)
Vue.use(MdTable)
Vue.use(MdContent)

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
