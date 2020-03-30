import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './src/assets/css/reset.css';
import './src/assets/css/index.scss'
// import 'babel-polyfill'
import app from './src/app.vue'
import router from './src/router'
import 'swiper/css/swiper.css';

// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(vueSwiper)
Vue.use(ElementUI)
import FastClick from 'fastclick'
FastClick.attach(document.body)
import $HTTP from './src/common/businessUtils/HTTP.js';
Vue.prototype.$http = $HTTP;
new Vue({
    el:'#app',
    router,
    render:(h)=>h(app)
})
