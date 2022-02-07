import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RCCalibration from "../views/RCCalibration";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/calibration',
        name: 'calibration',
        component: RCCalibration
    }
]

const router = new VueRouter({
    routes
})

export default router
