<template>
    <v-container class="lte_rc" fluid>
        <v-row>
            <v-col cols="6">
                <v-row justify="center">
                    <v-col cols="10">
                        <v-progress-linear
                            class="mt-2"
                            v-model="ch_value.ch1_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Roll <strong>{{ ch_raw.ch1_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                        <v-switch
                            v-model="reverse_roll"
                            inset
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-row justify="center" style="height: 90px;">
                    <v-col cols="2" align-self="end" class="">
                        <v-switch
                            v-model="reverse_pitch"
                            inset
                        ></v-switch>
                    </v-col>
                    <v-col cols="6"></v-col>
                    <v-col cols="3" align-self="end" class="">
                        <v-switch
                            v-model="reverse_throttle"
                            inset
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-row align="center"
                       style="height: 120px;"
                       justify="center">
                    <v-col cols="6" class="ml-n10 mr-n8">
                        <v-progress-linear
                            class="progress-vertical"
                            v-model="ch_value.ch2_value"
                            height="60"
                            rounded
                        >
                            <span style="font-size: 25px">Pitch <strong>{{ ch_raw.ch2_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6" class="mr-16">
                        <v-progress-linear
                            class="progress-vertical"
                            v-model="ch_value.ch3_value"
                            height="60"
                            rounded
                        >
                            <span style="font-size: 25px">Throttle <strong>{{ ch_raw.ch3_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="mt-13 pt-13" align="center">
                    <v-col cols="10">
                        <v-progress-linear
                            v-model="ch_value.ch4_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Yaw <strong>{{ ch_raw.ch4_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                        <v-switch
                            v-model="reverse_yaw"
                            inset
                        ></v-switch>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row justify="center">
                    <v-col cols="10">
                        <v-progress-linear
                            class="mt-2"
                            v-model="ch_value.ch17_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Pan <strong>{{ ch_raw.ch17_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                        <v-switch
                            v-model="reverse_pan"
                            inset
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-row justify="end">
                    <v-col cols="6" align="center">
                        <v-switch
                            v-model="reverse_tilt"
                            inset
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-row align="center"
                       style="height: 120px;">
                    <v-col cols="2"></v-col>
                    <v-col cols="6" align-self="center">
                        <v-progress-linear
                            class="progress-vertical"
                            v-model="ch_value.ch18_value"
                            height="60"
                            rounded
                        >
                            <span style="font-size: 25px">Tilt <strong>{{ ch_raw.ch18_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="mt-13 pt-13" align="center">
                    <v-col cols="10">
                        <v-progress-linear
                            v-model="ch_value.ch19_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Zoom <strong>{{ ch_raw.ch19_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                        <v-switch
                            v-model="reverse_zoom"
                            inset
                        ></v-switch>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-n6">
            <v-col>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch5_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 5 <strong>{{ ch_raw.ch5_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch10_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 10 <strong>{{ ch_raw.ch10_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch6_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 6 <strong>{{ ch_raw.ch6_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch11_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 11 <strong>{{ ch_raw.ch11_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch7_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 7 <strong>{{ ch_raw.ch7_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch12_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 12 <strong>{{ ch_raw.ch12_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch8_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 8 <strong>{{ ch_raw.ch8_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch13_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 13 <strong>{{ ch_raw.ch13_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch9_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 9 <strong>{{ ch_raw.ch9_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch14_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 14 <strong>{{ ch_raw.ch14_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch20_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 20 <strong>{{ ch_raw.ch20_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch25_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 25 <strong>{{ ch_raw.ch25_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch21_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 21 <strong>{{ ch_raw.ch21_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch26_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 26 <strong>{{ ch_raw.ch26_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch22_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 22 <strong>{{ ch_raw.ch22_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch27_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 27 <strong>{{ ch_raw.ch27_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch23_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 23 <strong>{{ ch_raw.ch23_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch28_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 28 <strong>{{ ch_raw.ch28_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch24_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 24 <strong>{{ ch_raw.ch24_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch29_value"
                            height="50"
                            rounded
                        >
                            <span style="font-size: 25px">Radio 29 <strong>{{ ch_raw.ch29_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import {nanoid} from "nanoid";
import mqtt from "mqtt";
import EventBus from "@/EventBus";
import axios from "axios";
import {mixin as VueTimers} from 'vue-timers'
import mavlink, {MAVLink} from '../mavlibrary/mavlink'

export default {
    name: 'RCData',

    components: {},

    data() {
        return {
            snackbar: false,
            connection: {
                host: this.$store.state.VUE_APP_MOBIUS_HOST,
                port: 8883,
                endpoint: '/mqtt',
                clean: true, // Reserved session
                connectTimeout: 4000, // Time out
                reconnectPeriod: 4000, // Reconnection interval
                // Certification Information
                clientId: 'mqttjs_rc_' + nanoid(15),
                username: 'keti_rc_calibration',
                password: 'keti_rc_calibration',
            },

            publish: {
                topic: 'topic/browser',
                qos: 0,
                payload: '{ "msg": "Hello, I am browser." }',
            },
            qosList: [
                {label: 0, value: 0},
                {label: 1, value: 1},
                {label: 2, value: 2},
            ],
            client: {
                connected: false,
            },
            subscribeSuccess: false,

            ErrorLog: {level: '', message: ''},

            RC_RATE: 0.64,
            SBUS_RATE: 1.6,

            mav_ch_raw: {
                target_system: 1,
                target_component: 1,
                chan1_raw: 1500,
                chan2_raw: 1500,
                chan3_raw: 1500,
                chan4_raw: 1500,
                chan5_raw: 1158,
                chan6_raw: 989,
                chan7_raw: 989,
                chan8_raw: 989,
                chan9_raw: 989,
                chan10_raw: 989,
                chan11_raw: 989,
                chan12_raw: 989,
                chan13_raw: 989,
                chan14_raw: 989,
                chan15_raw: 989,
                chan16_raw: 989,
                chan17_raw: 1500,
                chan18_raw: 1500
            },
            ch_raw: {
                ch1_raw: 1500,
                ch2_raw: 1500,
                ch3_raw: 1500,
                ch4_raw: 1500,
                ch5_raw: 1500,
                ch6_raw: 1500,
                ch7_raw: 1500,
                ch8_raw: 1500,
                ch9_raw: 1500,
                ch10_raw: 1500,
                ch11_raw: 1500,
                ch12_raw: 1500,
                ch13_raw: 1500,
                ch14_raw: 1500,
                ch15_raw: 1500,
                ch16_raw: 1500,
                ch17_raw: 1500,
                ch18_raw: 1500,
                ch19_raw: 1500,
                ch20_raw: 1500,
                ch21_raw: 1500,
                ch22_raw: 1500,
                ch23_raw: 1500,
                ch24_raw: 1500,
                ch25_raw: 1500,
                ch26_raw: 1500,
                ch27_raw: 1500,
                ch28_raw: 1500,
                ch29_raw: 1500,
                ch30_raw: 1500,
                ch31_raw: 1500,
                ch32_raw: 1500
            },

            ch_value: {
                ch1_value: 50,
                ch2_value: 50,
                ch3_value: 50,
                ch4_value: 50,
                ch5_value: 50,
                ch6_value: 50,
                ch7_value: 50,
                ch8_value: 50,
                ch9_value: 50,
                ch10_value: 50,
                ch11_value: 50,
                ch12_value: 50,
                ch13_value: 50,
                ch14_value: 50,
                ch15_value: 50,
                ch16_value: 50,
                ch17_value: 50,
                ch18_value: 50,
                ch19_value: 50,
                ch20_value: 50,
                ch21_value: 50,
                ch22_value: 50,
                ch23_value: 50,
                ch24_value: 50,
                ch25_value: 50,
                ch26_value: 50,
                ch27_value: 50,
                ch28_value: 50,
                ch29_value: 50,
                ch30_value: 50,
                ch31_value: 50,
                ch32_value: 50,
            },

            trim_count: 0,
            ch_trim: {
                ch1_trim: 1500,
                ch2_trim: 1500,
                ch3_trim: 1500,
                ch4_trim: 1500,
                ch5_trim: 1500,
                ch6_trim: 1500,
                ch7_trim: 1500,
                ch8_trim: 1500,
                ch9_trim: 1500,
                ch10_trim: 1500,
                ch11_trim: 1500,
                ch12_trim: 1500,
                ch13_trim: 1500,
                ch14_trim: 1500,
                ch15_trim: 1500,
                ch16_trim: 1500,
                ch17_trim: 1500,
                ch18_trim: 1500,
                ch19_trim: 1500,
                ch20_trim: 1500,
                ch21_trim: 1500,
                ch22_trim: 1500,
                ch23_trim: 1500,
                ch24_trim: 1500,
                ch25_trim: 1500,
                ch26_trim: 1500,
                ch27_trim: 1500,
                ch28_trim: 1500,
                ch29_trim: 1500,
                ch30_trim: 1500,
                ch31_trim: 1500,
                ch32_trim: 1500,
            },

            ch_max: {
                ch1_max: 2000,
                ch2_max: 2000,
                ch3_max: 2000,
                ch4_max: 2000,
                ch5_max: 2000,
                ch6_max: 2000,
                ch7_max: 2000,
                ch8_max: 2000,
                ch9_max: 2000,
                ch10_max: 2000,
                ch11_max: 2000,
                ch12_max: 2000,
                ch13_max: 2000,
                ch14_max: 2000,
                ch15_max: 2000,
                ch16_max: 2000,
                ch17_max: 2000,
                ch18_max: 2000,
                ch19_max: 2000,
                ch20_max: 2000,
                ch21_max: 2000,
                ch22_max: 2000,
                ch23_max: 2000,
                ch24_max: 2000,
                ch25_max: 2000,
                ch26_max: 2000,
                ch27_max: 2000,
                ch28_max: 2000,
                ch29_max: 2000,
                ch30_max: 2000,
                ch31_max: 2000,
                ch32_max: 2000
            },

            ch_min: {
                ch1_min: 1000,
                ch2_min: 1000,
                ch3_min: 1000,
                ch4_min: 1000,
                ch5_min: 1000,
                ch6_min: 1000,
                ch7_min: 1000,
                ch8_min: 1000,
                ch9_min: 1000,
                ch10_min: 1000,
                ch11_min: 1000,
                ch12_min: 1000,
                ch13_min: 1000,
                ch14_min: 1000,
                ch15_min: 1000,
                ch16_min: 1000,
                ch17_min: 1000,
                ch18_min: 1000,
                ch19_min: 1000,
                ch20_min: 1000,
                ch21_min: 1000,
                ch22_min: 1000,
                ch23_min: 1000,
                ch24_min: 1000,
                ch25_min: 1000,
                ch26_min: 1000,
                ch27_min: 1000,
                ch28_min: 1000,
                ch29_min: 1000,
                ch30_min: 1000,
                ch31_min: 1000,
                ch32_min: 1000
            },

            reverse_roll: false,
            reverse_pitch: false,
            reverse_throttle: false,
            reverse_yaw: false,

            reverse_pan: false,
            reverse_tilt: false,
            reverse_zoom: false,

            max: 100,

            radio_cali_flag: false,

            rcPort_info: {
                Path: 'COM2',
                BaudRate: 115200
            },
            rcPort: null,

            RCstrFromeGCS: '',
            RCstrFromeGCSLength: 0,

            RCstrToDrone: '',

            logs: []
        }
    },
    mixins: [VueTimers],
    timers: {
        SerialData: {time: 100, repeat: true},
    },
    methods: {
        createConnection() {
            if (this.$store.state.client.connected) {
                console.log('There is already a connected client. Destroyed connection and then reconnect.');
                this.destroyConnection()
            }
            if (!this.$store.state.client.connected) {
                const {port, endpoint, ...options} = this.connection
                const serverip = this.$store.state.VUE_APP_MOBIUS_HOST
                const connectUrl = `ws://${serverip}:${port}${endpoint}`

                try {
                    this.$store.state.client = mqtt.connect(connectUrl, options)
                } catch (error) {
                    console.log('mqtt.connect error', error)
                }
                this.$store.state.client.on('connect', () => {
                    console.log('Connection succeeded!')
                    if (Object.keys(this.$store.state.control_drone).length > 0) {
                        for (let idx in Object.keys(this.$store.state.control_drone)) {
                            let drone = {}
                            drone.name = Object.keys(this.$store.state.control_drone)[idx]
                            drone.icon = 'times-circle'
                            drone.status = 'disabled'
                            drone.bpm = 1
                            drone.bpmcolor = 'red'
                            drone.recv_counter = 1
                            drone.system_id = this.$store.state.control_drone[drone.name].system_id
                            EventBus.$emit('update-table', drone)

                            clearInterval(this.$store.state.control_drone[drone.name].timer_id)
                            this.$store.state.control_drone[drone.name] = {
                                icon: 'times-circle',
                                status: 'disabled',
                                bpm: 1,
                                bpmcolor: 'red',
                                recv_counter: 1,
                                system_id: this.$store.state.control_drone[drone.name].system_id,
                                selected: true,
                                timer_id: setInterval(() => {
                                    this.$store.state.control_drone[drone.name].bpm = this.$store.state.control_drone[drone.name].recv_counter;
                                    this.$store.state.control_drone[drone.name].recv_counter = 1;
                                    if (this.$store.state.control_drone[drone.name].bpm < 5) {
                                        this.$store.state.control_drone[drone.name].icon = 'exclamation-triangle'
                                    } else if (this.$store.state.control_drone[drone.name].bpm < 9) {
                                        this.$store.state.control_drone[drone.name].icon = 'play'
                                    } else if (this.$store.state.control_drone[drone.name].bpm < 12) {
                                        this.$store.state.control_drone[drone.name].icon = 'circle'
                                    }
                                }, 10000)
                            }
                            console.log('control_drone Info -', this.$store.state.control_drone[drone.name])

                            let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + drone.name + '/status'
                            let qos = 0
                            this.$store.state.client.unsubscribe(topic)
                            this.$store.state.client.subscribe(topic, {qos}, (error, res) => {
                                if (error) {
                                    console.log('Subscribe to topics error', error)
                                }
                                this.subscribeSuccess = true
                                console.log('Subscribe to topics res', res)
                            })
                        }
                    }
                    // this.doSubscribe()
                })
                this.$store.state.client.on('error', error => {
                    console.log('Connection failed', error)
                })
                this.$store.state.client.on('message', (topic, message) => {
                    // console.log(`Received message ${message.toString()} from topic ${topic}`)

                    let topic_arr = topic.split('/')

                    let drone = topic_arr[topic_arr.length - 2]
                    let status = topic_arr[topic_arr.length - 1]

                    if (status === 'status') {
                        if (this.ch_raw.ch12_raw <= 1700) {
                            EventBus.$emit('add-counter', drone)
                            let msg = JSON.parse(message.toString())
                            if (msg.status === 'disconnected') {
                                this.$store.state.control_drone[drone].icon = 'unlink'
                                this.$store.state.control_drone[drone].status = msg.status
                                this.$store.state.client.publish('/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + drone + '/conn', Buffer.from('ready'))
                            } else if (msg.status === 'ready') {
                                this.$store.state.control_drone[drone].icon = 'spinner'
                                this.$store.state.control_drone[drone].status = msg.status
                                this.$store.state.control_drone[drone].system_id = msg.system_id
                                localStorage.setItem('control_drone_list', JSON.stringify(this.$store.state.control_drone));
                            } else if (msg.status === 'connected') {
                                this.$store.state.control_drone[drone].icon = 'link'
                                this.$store.state.control_drone[drone].status = msg.status
                            } else if (msg.status === 'send') {
                                if (this.$store.state.control_drone[drone].bpm < 5) {
                                    this.$store.state.control_drone[drone].icon = 'exclamation-triangle'
                                } else if (this.$store.state.control_drone[drone].bpm < 9) {
                                    this.$store.state.control_drone[drone].icon = 'play'
                                } else if (this.$store.state.control_drone[drone].bpm < 12) {
                                    this.$store.state.control_drone[drone].icon = 'circle'
                                }
                                this.$store.state.control_drone[drone].status = msg.status
                            } else if (msg.status === 'disabled') {
                                this.$store.state.control_drone[drone].icon = 'times-circle'
                                this.$store.state.control_drone[drone].status = msg.status
                            } else {
                                this.$store.state.control_drone[drone].icon = 'exclamation-circle'
                                this.$store.state.control_drone[drone].status = 'error'
                            }
                            EventBus.$emit('update-table', drone)
                        }
                    }
                })
            }
        },
        doSubscribe() {
            if (this.$store.state.client.connected) {
                const {topic, qos} = this.subscription
                this.$store.state.client.subscribe(topic, {qos}, (error, res) => {
                    if (error) {
                        console.log('Subscribe to topics error', error)
                        // return
                    }
                    this.subscribeSuccess = true
                    console.log('1Subscribe to topics res', res)
                })
            }
        },
        doUnSubscribe() {
            if (this.$store.state.client.connected) {
                if (this.subscription) {
                    const {topic} = this.subscription
                    this.$store.state.client.unsubscribe(topic, error => {
                        if (error) {
                            console.log('Unsubscribe error', error)
                        }
                    })
                }
            }
        },
        destroyConnection() {
            if (this.$store.state.client.connected) {
                try {
                    this.doUnSubscribe()

                    this.$store.state.client.end()
                    this.$store.state.client = {
                        connected: false,
                    }
                    console.log('Successfully disconnected!')
                } catch (error) {
                    console.log('Disconnect failed', error.toString())
                }
                // this.rcPort.close()
                // this.$timer.stop('SerialData')
            }
        },
        SerialData() {
            axios.get('http://localhost:3000/serialdata')
                .then((response) => {
                        this.receiveFromRC(response.data)
                    }
                ).catch(() => {
                    this.ErrorLog.level = 'error'
                    this.ErrorLog.message = "Cannot receive SBUS data"
                }
            )
        },
        SBUS2RC(x) {
            return Math.round((x * 8 + 1 - 1000) * this.RC_RATE + 1500);
        },
        min_max_scaler(val) {
            return (val - this.SBUS2RC(0)) / (this.SBUS2RC(250) - this.SBUS2RC(0)) * 100;
        },
        mavlinkGenerateMessage(src_sys_id, src_comp_id, type, params) {
            const mavlinkParser = new MAVLink(null/*logger*/, src_sys_id, src_comp_id, this.$store.state.mavVersion);
            try {
                var mavMsg = null;
                var genMsg = null;

                switch (type) {
                    case mavlink.MAVLINK_MSG_ID_RC_CHANNELS_OVERRIDE:
                        mavMsg = new mavlink.messages.rc_channels_override(params.target_system,
                            params.target_component,
                            params.ch1_raw,
                            params.ch2_raw,
                            params.ch3_raw,
                            params.ch4_raw,
                            params.ch5_raw,
                            params.ch6_raw,
                            params.ch7_raw,
                            params.ch8_raw,
                            params.ch9_raw,
                            params.ch10_raw,
                            params.ch11_raw,
                            params.ch12_raw,
                            params.ch13_raw,
                            params.ch14_raw,
                            params.ch15_raw,
                            params.ch16_raw,
                            params.ch17_raw,
                            params.ch18_raw,
                        );
                        break;
                }
            } catch (e) {
                console.log('MAVLINK EX:' + e);
            }

            if (mavMsg) {
                genMsg = Buffer.from(mavMsg.pack(mavlinkParser));
                //console.log('>>>>> MAVLINK OUTGOING MSG: ' + genMsg.toString('hex'));
            }

            return genMsg;
        },
        receiveFromRC(hex_content_each) {
            // console.log('receiveFromRC - ' + hex_content_each)
            // this.RCstrToDrone += 'ff'
            if (this.reverse_roll) {
                this.ch_raw.ch1_raw = 250 - parseInt(hex_content_each.substr(2, 2), 16)
            } else {
                this.ch_raw.ch1_raw = parseInt(hex_content_each.substr(2, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch1_raw.toString(16)
            this.ch_raw.ch1_raw = this.SBUS2RC(this.ch_raw.ch1_raw)
            this.mav_ch_raw.ch1_raw = this.ch_raw.ch1_raw

            if (this.reverse_pitch) {
                this.ch_raw.ch2_raw = 250 - parseInt(hex_content_each.substr(4, 2), 16)
            } else {
                this.ch_raw.ch2_raw = parseInt(hex_content_each.substr(4, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch2_raw.toString(16)
            this.ch_raw.ch2_raw = this.SBUS2RC(this.ch_raw.ch2_raw)
            this.mav_ch_raw.ch2_raw = this.ch_raw.ch2_raw

            if (this.reverse_throttle) {
                this.ch_raw.ch3_raw = 250 - parseInt(hex_content_each.substr(6, 2), 16)
            } else {
                this.ch_raw.ch3_raw = parseInt(hex_content_each.substr(6, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch3_raw.toString(16)
            this.ch_raw.ch3_raw = this.SBUS2RC(this.ch_raw.ch3_raw)
            this.mav_ch_raw.ch3_raw = this.ch_raw.ch3_raw

            if (this.reverse_yaw) {
                this.ch_raw.ch4_raw = 250 - parseInt(hex_content_each.substr(8, 2), 16)
            } else {
                this.ch_raw.ch4_raw = parseInt(hex_content_each.substr(8, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch4_raw.toString(16)
            this.ch_raw.ch4_raw = this.SBUS2RC(this.ch_raw.ch4_raw)
            this.mav_ch_raw.ch4_raw = this.ch_raw.ch4_raw

            this.ch_raw.ch5_raw = parseInt(hex_content_each.substr(10, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch5_raw.toString(16)
            this.ch_raw.ch5_raw = this.SBUS2RC(this.ch_raw.ch5_raw) - 5
            this.mav_ch_raw.ch5_raw = this.ch_raw.ch5_raw

            this.ch_raw.ch6_raw = parseInt(hex_content_each.substr(12, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch6_raw.toString(16)
            this.ch_raw.ch6_raw = this.SBUS2RC(this.ch_raw.ch6_raw)
            this.mav_ch_raw.ch6_raw = this.ch_raw.ch6_raw

            this.ch_raw.ch7_raw = parseInt(hex_content_each.substr(14, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch7_raw.toString(16)
            this.ch_raw.ch7_raw = this.SBUS2RC(this.ch_raw.ch7_raw)
            this.mav_ch_raw.ch7_raw = this.ch_raw.ch7_raw

            this.ch_raw.ch8_raw = parseInt(hex_content_each.substr(16, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch8_raw.toString(16)
            this.ch_raw.ch8_raw = this.SBUS2RC(this.ch_raw.ch8_raw)
            this.mav_ch_raw.ch8_raw = this.ch_raw.ch8_raw

            this.ch_raw.ch9_raw = parseInt(hex_content_each.substr(18, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch9_raw.toString(16)
            this.ch_raw.ch9_raw = this.SBUS2RC(this.ch_raw.ch9_raw)
            this.mav_ch_raw.ch9_raw = this.ch_raw.ch9_raw

            this.ch_raw.ch10_raw = parseInt(hex_content_each.substr(20, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch10_raw.toString(16)
            this.ch_raw.ch10_raw = this.SBUS2RC(this.ch_raw.ch10_raw)
            this.mav_ch_raw.ch10_raw = this.ch_raw.ch10_raw

            this.ch_raw.ch11_raw = parseInt(hex_content_each.substr(22, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch11_raw.toString(16)
            this.ch_raw.ch11_raw = this.SBUS2RC(this.ch_raw.ch11_raw)
            this.mav_ch_raw.ch11_raw = this.ch_raw.ch11_raw

            this.ch_raw.ch12_raw = parseInt(hex_content_each.substr(24, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch12_raw.toString(16)
            this.ch_raw.ch12_raw = this.SBUS2RC(this.ch_raw.ch12_raw)
            this.mav_ch_raw.ch12_raw = this.ch_raw.ch12_raw

            this.ch_raw.ch13_raw = parseInt(hex_content_each.substr(26, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch13_raw.toString(16)
            this.ch_raw.ch13_raw = this.SBUS2RC(this.ch_raw.ch13_raw)
            this.mav_ch_raw.ch13_raw = this.ch_raw.ch13_raw

            this.ch_raw.ch14_raw = parseInt(hex_content_each.substr(28, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch14_raw.toString(16)
            this.ch_raw.ch14_raw = this.SBUS2RC(this.ch_raw.ch14_raw)
            this.mav_ch_raw.ch14_raw = this.ch_raw.ch14_raw

            this.ch_raw.ch15_raw = parseInt(hex_content_each.substr(30, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch15_raw.toString(16)
            this.ch_raw.ch15_raw = this.SBUS2RC(this.ch_raw.ch15_raw)
            this.mav_ch_raw.ch15_raw = this.ch_raw.ch15_raw

            this.ch_raw.ch16_raw = parseInt(hex_content_each.substr(32, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch16_raw.toString(16)
            this.ch_raw.ch16_raw = this.SBUS2RC(this.ch_raw.ch16_raw)
            this.mav_ch_raw.ch16_raw = this.ch_raw.ch16_raw

            if (this.reverse_pan) {
                this.ch_raw.ch17_raw = 250 - parseInt(hex_content_each.substr(34, 2), 16)
            } else {
                this.ch_raw.ch17_raw = parseInt(hex_content_each.substr(34, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch17_raw.toString(16)
            this.ch_raw.ch17_raw = this.SBUS2RC(this.ch_raw.ch17_raw)
            this.mav_ch_raw.ch17_raw = this.ch_raw.ch17_raw

            if (this.reverse_tilt) {
                this.ch_raw.ch18_raw = 250 - parseInt(hex_content_each.substr(36, 2), 16)
            } else {
                this.ch_raw.ch18_raw = parseInt(hex_content_each.substr(36, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch18_raw.toString(16)
            this.ch_raw.ch18_raw = this.SBUS2RC(this.ch_raw.ch18_raw)
            this.mav_ch_raw.ch18_raw = this.ch_raw.ch18_raw

            if (this.reverse_zoom) {
                this.ch_raw.ch19_raw = 250 - parseInt(hex_content_each.substr(38, 2), 16)
            } else {
                this.ch_raw.ch19_raw = parseInt(hex_content_each.substr(38, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch19_raw.toString(16)
            this.ch_raw.ch19_raw = this.SBUS2RC(this.ch_raw.ch19_raw)
            this.ch_raw.ch20_raw = parseInt(hex_content_each.substr(40, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch20_raw.toString(16)
            this.ch_raw.ch20_raw = this.SBUS2RC(this.ch_raw.ch20_raw)
            this.ch_raw.ch21_raw = parseInt(hex_content_each.substr(42, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch21_raw.toString(16)
            this.ch_raw.ch21_raw = this.SBUS2RC(this.ch_raw.ch21_raw)
            this.ch_raw.ch22_raw = parseInt(hex_content_each.substr(44, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch22_raw.toString(16)
            this.ch_raw.ch22_raw = this.SBUS2RC(this.ch_raw.ch22_raw)
            this.ch_raw.ch23_raw = parseInt(hex_content_each.substr(46, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch23_raw.toString(16)
            this.ch_raw.ch23_raw = this.SBUS2RC(this.ch_raw.ch23_raw)
            this.ch_raw.ch24_raw = parseInt(hex_content_each.substr(48, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch24_raw.toString(16)
            this.ch_raw.ch24_raw = this.SBUS2RC(this.ch_raw.ch24_raw)
            this.ch_raw.ch25_raw = parseInt(hex_content_each.substr(50, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch25_raw.toString(16)
            this.ch_raw.ch25_raw = this.SBUS2RC(this.ch_raw.ch25_raw)
            this.ch_raw.ch26_raw = parseInt(hex_content_each.substr(52, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch26_raw.toString(16)
            this.ch_raw.ch26_raw = this.SBUS2RC(this.ch_raw.ch26_raw)
            this.ch_raw.ch27_raw = parseInt(hex_content_each.substr(54, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch27_raw.toString(16)
            this.ch_raw.ch27_raw = this.SBUS2RC(this.ch_raw.ch27_raw)
            this.ch_raw.ch28_raw = parseInt(hex_content_each.substr(56, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch28_raw.toString(16)
            this.ch_raw.ch28_raw = this.SBUS2RC(this.ch_raw.ch28_raw)
            this.ch_raw.ch29_raw = parseInt(hex_content_each.substr(58, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch29_raw.toString(16)
            this.ch_raw.ch29_raw = this.SBUS2RC(this.ch_raw.ch29_raw)
            this.ch_raw.ch30_raw = parseInt(hex_content_each.substr(60, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch30_raw.toString(16)
            this.ch_raw.ch30_raw = this.SBUS2RC(this.ch_raw.ch30_raw)
            this.ch_raw.ch31_raw = parseInt(hex_content_each.substr(62, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch31_raw.toString(16)
            this.ch_raw.ch31_raw = this.SBUS2RC(this.ch_raw.ch31_raw)
            this.ch_raw.ch32_raw = parseInt(hex_content_each.substr(64, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch32_raw.toString(16)
            this.ch_raw.ch32_raw = this.SBUS2RC(this.ch_raw.ch32_raw)

            // For displaying to progressbar
            this.ch_value.ch1_value = this.min_max_scaler(this.ch_raw.ch1_raw)
            this.ch_value.ch2_value = this.min_max_scaler(this.ch_raw.ch2_raw)
            this.ch_value.ch3_value = this.min_max_scaler(this.ch_raw.ch3_raw)
            this.ch_value.ch4_value = this.min_max_scaler(this.ch_raw.ch4_raw)
            this.ch_value.ch5_value = this.min_max_scaler(this.ch_raw.ch5_raw)
            this.ch_value.ch6_value = this.min_max_scaler(this.ch_raw.ch6_raw)
            this.ch_value.ch7_value = this.min_max_scaler(this.ch_raw.ch7_raw)
            this.ch_value.ch8_value = this.min_max_scaler(this.ch_raw.ch8_raw)
            this.ch_value.ch9_value = this.min_max_scaler(this.ch_raw.ch9_raw)
            this.ch_value.ch10_value = this.min_max_scaler(this.ch_raw.ch10_raw)
            this.ch_value.ch11_value = this.min_max_scaler(this.ch_raw.ch11_raw)
            this.ch_value.ch12_value = this.min_max_scaler(this.ch_raw.ch12_raw)
            this.ch_value.ch13_value = this.min_max_scaler(this.ch_raw.ch13_raw)
            this.ch_value.ch14_value = this.min_max_scaler(this.ch_raw.ch14_raw)
            this.ch_value.ch15_value = this.min_max_scaler(this.ch_raw.ch15_raw)
            this.ch_value.ch16_value = this.min_max_scaler(this.ch_raw.ch16_raw)
            this.ch_value.ch17_value = this.min_max_scaler(this.ch_raw.ch17_raw)
            this.ch_value.ch18_value = this.min_max_scaler(this.ch_raw.ch18_raw)
            this.ch_value.ch19_value = this.min_max_scaler(this.ch_raw.ch19_raw)
            this.ch_value.ch20_value = this.min_max_scaler(this.ch_raw.ch20_raw)
            this.ch_value.ch21_value = this.min_max_scaler(this.ch_raw.ch21_raw)
            this.ch_value.ch22_value = this.min_max_scaler(this.ch_raw.ch22_raw)
            this.ch_value.ch23_value = this.min_max_scaler(this.ch_raw.ch23_raw)
            this.ch_value.ch24_value = this.min_max_scaler(this.ch_raw.ch24_raw)
            this.ch_value.ch25_value = this.min_max_scaler(this.ch_raw.ch25_raw)
            this.ch_value.ch26_value = this.min_max_scaler(this.ch_raw.ch26_raw)
            this.ch_value.ch27_value = this.min_max_scaler(this.ch_raw.ch27_raw)
            this.ch_value.ch28_value = this.min_max_scaler(this.ch_raw.ch28_raw)
            this.ch_value.ch29_value = this.min_max_scaler(this.ch_raw.ch29_raw)
            this.ch_value.ch30_value = this.min_max_scaler(this.ch_raw.ch30_raw)
            this.ch_value.ch31_value = this.min_max_scaler(this.ch_raw.ch31_raw)
            this.ch_value.ch32_value = this.min_max_scaler(this.ch_raw.ch32_raw)

            if (this.$store.state.client.connected) {  // LTE
                if (this.ch_raw.ch11_raw > 1700) {  // MAVLink
                    Object.keys(this.$store.state.control_drone).forEach((dName) => {
                        if (this.$store.state.control_drone[dName].selected) {
                            if (this.$store.state.control_drone[dName].status === 'connected' || this.$store.state.control_drone[dName].status === 'send') {
                                let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/GCS_Data/' + dName

                                this.mav_ch_raw.target_system = this.$store.state.control_drone[dName].system_id
                                this.mav_ch_raw.target_component = 1

                                try {
                                    let rc_signal = this.mavlinkGenerateMessage(255, 0xbe, mavlink.MAVLINK_MSG_ID_RC_CHANNELS_OVERRIDE, this.mav_ch_raw);
                                    if (rc_signal == null) {
                                        console.log("mavlink message is null");
                                    } else {
                                        // console.log(rc_signal.toString('hex'))
                                        this.$store.state.client.publish(topic, rc_signal);
                                    }
                                } catch (ex) {
                                    console.log('[ERROR] ' + ex);
                                }
                            }
                        }
                    })
                }
                this.$store.state.client.publish('/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.$store.state.VUE_APP_MOBIUS_RC, Buffer.from(hex_content_each, 'hex'))
                // this.RCstrToDrone = ''
            }

            if (this.ch_raw.ch12_raw > 1700) {  // RF
                Object.keys(this.$store.state.control_drone).forEach((dName) => {
                    this.$store.state.control_drone[dName].status = 'RF'
                })
            }
        },
        beforeDestroy() {
            this.destroyConnection()
            this.$timer.stop('SerialData')
        }
    },
    mounted() {
        this.$timer.start('SerialData')

        EventBus.$on('mqttConnection', () => {
            if (this.$store.state.MOBIUS_CONNECTION_CONNECTED) {
                this.createConnection()
            } else {
                this.destroyConnection()
            }
        });
    }
}
</script>

<style>
.lte_rc {
    position: absolute;
    left: 330px;
    top: -10px;
}

.progress-vertical {
    /*font-size: 16px;*/
    /*color: #000000;*/
    transform: rotate(270deg);
}
</style>
