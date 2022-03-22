import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        MOBIUS_CONNECTION_CONNECTED: false,
        VUE_APP_MOBIUS_HOST: 'gcs.iotocean.org',
        VUE_APP_MOBIUS_GCS: 'KETI_MUV',
        VUE_APP_MOBIUS_RC: 'KETI_RC',

        mavVersion: (localStorage.getItem('mavVersion') === 'v1') ? localStorage.getItem('mavVersion') : 'v2',

        UDP_connection: {},
        udp_selected: [],

        client: {
            connected: false,
            loading: false
        },
        droneList: [],
        control_drone: JSON.parse(localStorage.getItem('control_drone_list')) ? JSON.parse(localStorage.getItem('control_drone_list')) : {},
        MinMaxTrim: [
            {
                channel: 'ch1_max',
                value: 1500
            },
            {
                channel: 'ch1_trim',
                value: 1500
            },
            {
                channel: 'ch1_min',
                value: 1500
            },
            {
                channel: 'ch2_max',
                value: 1500
            },
            {
                channel: 'ch2_trim',
                value: 1500
            },
            {
                channel: 'ch2_min',
                value: 1500
            },
            {
                channel: 'ch3_max',
                value: 1500
            },
            {
                channel: 'ch3_trim',
                value: 1500
            },
            {
                channel: 'ch3_min',
                value: 1500
            },
            {
                channel: 'ch4_max',
                value: 1500
            },
            {
                channel: 'ch4_trim',
                value: 1500
            },
            {
                channel: 'ch4_min',
                value: 1500
            },
            {
                channel: 'ch5_max',
                value: 1500
            },
            {
                channel: 'ch5_trim',
                value: 1500
            },
            {
                channel: 'ch5_min',
                value: 1500
            },
            {
                channel: 'ch6_max',
                value: 1500
            },
            {
                channel: 'ch6_trim',
                value: 1500
            },
            {
                channel: 'ch6_min',
                value: 1500
            },
            {
                channel: 'ch7_max',
                value: 1500
            },
            {
                channel: 'ch7_trim',
                value: 1500
            },
            {
                channel: 'ch7_min',
                value: 1500
            },
            {
                channel: 'ch8_max',
                value: 1500
            },
            {
                channel: 'ch8_trim',
                value: 1500
            },
            {
                channel: 'ch8_min',
                value: 1500
            },
            {
                channel: 'ch9_max',
                value: 1500
            },
            {
                channel: 'ch9_trim',
                value: 1500
            },
            {
                channel: 'ch9_min',
                value: 1500
            },
            {
                channel: 'ch10_max',
                value: 1500
            },
            {
                channel: 'ch10_trim',
                value: 1500
            },
            {
                channel: 'ch10_min',
                value: 1500
            },
            {
                channel: 'ch11_max',
                value: 1500
            },
            {
                channel: 'ch11_trim',
                value: 1500
            },
            {
                channel: 'ch11_min',
                value: 1500
            },
            {
                channel: 'ch12_max',
                value: 1500
            },
            {
                channel: 'ch12_trim',
                value: 1500
            },
            {
                channel: 'ch12_min',
                value: 1500
            },
            {
                channel: 'ch13_max',
                value: 1500
            },
            {
                channel: 'ch13_trim',
                value: 1500
            },
            {
                channel: 'ch13_min',
                value: 1500
            },
            {
                channel: 'ch14_max',
                value: 1500
            },
            {
                channel: 'ch14_trim',
                value: 1500
            },
            {
                channel: 'ch14_min',
                value: 1500
            },
            {
                channel: 'ch15_max',
                value: 1500
            },
            {
                channel: 'ch15_trim',
                value: 1500
            },
            {
                channel: 'ch15_min',
                value: 1500
            },
            {
                channel: 'ch16_max',
                value: 1500
            },
            {
                channel: 'ch16_trim',
                value: 1500
            },
            {
                channel: 'ch16_min',
                value: 1500
            }
        ]
    },
})
