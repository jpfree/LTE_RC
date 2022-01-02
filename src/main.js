import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ProgressBar from 'vuejs-progress-bar'
import VueCookies from "vue-cookies";

//쿠키를 사용한다.
Vue.use(VueCookies);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ProgressBar)

//쿠키의 만료일은 7일이다. (글로벌 세팅)
Vue.$cookies.config("7d");

Vue.config.productionTip = false

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
