import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

import axios from 'axios'

// router setup
import routes from './routes/routes'
import cfg from '../static/cfg'

const HelloJs = require('hellojs/dist/hello.all.min.js')
const VueHello = require('vue-hellojs')

HelloJs.init({
  google: '143850479596-3bni34pjmno4cu6jf1170fa0jutf3si0.apps.googleusercontent.com'
}, {
  redirect_uri: 'auth/callbackGoogle'
})

Vue.use(VueHello, HelloJs)

if (process.env.NODE_ENV === 'development') cfg.path.api = 'http://localhost:3000/api/'

Vue.prototype.$http = axios
Vue.prototype.$cfg = cfg

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
