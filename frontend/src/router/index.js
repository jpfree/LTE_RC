import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RCCalibration from "../views/Calibration/RCCalibration";
import RCDeadZone from "../views/DeadZone/RCDeadZone";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Calibration',
        name: 'Calibration',
        component: RCCalibration
    },
    {
        path: '/DeadZone',
        name: 'DeadZone',
        component: RCDeadZone
    }
]

const router = new VueRouter({
    routes
})

export default router
