import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

import axios from 'axios'

// router setup
import routes from './routes/routes'
import cfg from '../static/cfg'

import helloGoogle from 'hellojs'

helloGoogle.init({
  google: '143850479596-3bni34pjmno4cu6jf1170fa0jutf3si0.apps.googleusercontent.com'
}, {
  redirect_uri: 'admin/overview'
})

if (process.env.NODE_ENV === 'development') cfg.path.api = 'http://172.30.1.70:80/api/'

Vue.prototype.$http = axios
Vue.prototype.$cfg = cfg
Vue.prototype.$helloGoogle = helloGoogle

// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
