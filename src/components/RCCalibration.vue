<template>
    <v-container class="rc_cali">
        <v-row>
            <v-col cols="6">
                <v-row justify="center">
                    <v-col cols="10">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch1_value" class="black--text">
                                <span>Roll  <strong>{{ ch1_raw }}</strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                    <v-col cols="2">
                        <input type="checkbox" v-model="reverse_roll" value="false" @click="set_roll_reverse">reverse
                    </v-col>
                </v-row>
                <v-row class="mt-12 pt-9">
                    <v-col cols="3" align="center">
                        reverse<input type="checkbox" v-model="reverse_pitch" value="set_reverse"
                                      @click="set_pitch_reverse">
                    </v-col>
                    <v-col cols="8" align="end" class="pr-8">
                        <input type="checkbox" v-model="reverse_throttle" value="set_reverse"
                               @click="set_throttle_reverse">reverse
                    </v-col>
                </v-row>
                <v-row align="center"
                       style="height: 200px;">
                    <v-col cols="8" align="start" class="mx-n16 px-n16">
                        <b-progress class="progress-vertical" :max="max" height="4rem">
                            <b-progress-bar :value="ch2_value" class="black--text">
                                <span>Pitch <strong>{{ ch2_raw }}</strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                    <v-col cols="8" class="mx-n16 px-n16">
                        <b-progress class="progress-vertical" :max="max" height="4rem">
                            <b-progress-bar :value="ch3_value" class="black--text">
                                <span>Throttle  <strong>{{ ch3_raw }}</strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                </v-row>
                <v-row class="mt-16 pt-16">
                    <v-col cols="10">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch4_value" class="black--text">
                                <span>Yaw  <strong>{{ ch4_raw }}</strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                    <v-col cols="2">
                        <input type="checkbox" v-model="reverse_yaw" value="set_reverse" @click="set_yaw_reverse">reverse
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row class="my-3">
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch5_value" class="black--text">
                                <span>Radio 5 <strong>{{ ch5_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch6_value" class="black--text">
                                <span>Radio 6 <strong>{{ ch6_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch7_value" class="black--text">
                                <span>Radio 7 <strong>{{ ch7_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch8_value" class="black--text">
                                <span>Radio 8 <strong>{{ ch8_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch9_value" class="black--text">
                                <span>Radio 9 <strong>{{ ch9_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch10_value" class="black--text">
                                <span>Radio 10 <strong>{{ ch10_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch11_value" class="black--text">
                                <span>Radio 11 <strong>{{ ch11_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch12_value" class="black--text">
                                <span>Radio 12 <strong>{{ ch12_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                </v-row>
                <v-row class="my-3">
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch13_value" class="black--text">
                                <span>Radio 13 <strong>{{ ch13_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                    <v-col cols="6">
                        <b-progress :max="max" height="3rem">
                            <b-progress-bar :value="ch14_value" class="black--text">
                                <span>Radio 14 <strong>{{ ch14_raw }} </strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </v-col>
                </v-row>
                <v-row class="mt-6" justify="center">
                    <v-col cols="3" align="center">
                        <v-btn color="success" v-on:click="calibrateRadio"> 무선 보정</v-btn>
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
import SerialPort from "serialport";

export default {
    name: 'RCCalibration',

    data() {
        return {
            connection: {
                host: '203.253.128.177',
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
            subscription: {
                topic: '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.$store.state.VUE_APP_MOBIUS_RCID,
                qos: 0,
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

            RC_RATE: 0.64,

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

            trim_count: 0,
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

            ch1_max: 1000,
            ch2_max: 1000,
            ch3_max: 1000,
            ch4_max: 1000,
            ch5_max: 1000,
            ch6_max: 1000,
            ch7_max: 1000,
            ch8_max: 1000,
            ch9_max: 1000,
            ch10_max: 1000,
            ch11_max: 1000,
            ch12_max: 1000,
            ch13_max: 1000,
            ch14_max: 1000,
            ch15_max: 1000,
            ch16_max: 1000,

            ch1_min: 2000,
            ch2_min: 2000,
            ch3_min: 2000,
            ch4_min: 2000,
            ch5_min: 2000,
            ch6_min: 2000,
            ch7_min: 2000,
            ch8_min: 2000,
            ch9_min: 2000,
            ch10_min: 2000,
            ch11_min: 2000,
            ch12_min: 2000,
            ch13_min: 2000,
            ch14_min: 2000,
            ch15_min: 2000,
            ch16_min: 2000,

            reverse_roll: false,
            reverse_pitch: false,
            reverse_throttle: false,
            reverse_yaw: false,

            max: 100,

            radio_cali_flag: false,

            rcPort_info: {
                Path: 'COM4',
                BaudRate: 115200
            },
            rcPort: null,

            RCstrFromeGCS: '',
            RCstrFromeGCSLength: 0
        }
    },
    methods: {
        createConnection() {
            if (this.$store.state.client.connected) {
                console.log('There is already a connected client. Destroyed connection and then reconnect.');
                this.destroyConnection()
            }
            if (!this.$store.state.client.connected) {
                const {host, port, endpoint, ...options} = this.connection
                const connectUrl = `ws://${host}:${port}${endpoint}`

                // Connect serial for rc data
                this.rcPortOpening(this.rcPort_info);

                try {
                    this.$store.state.client = mqtt.connect(connectUrl, options)
                } catch (error) {
                    console.log('mqtt.connect error', error)
                }
                this.$store.state.client.on('connect', () => {
                    console.log('Connection succeeded!')
                    this.doSubscribe()
                })
                this.$store.state.client.on('error', error => {
                    console.log('Connection failed', error)
                })
                this.$store.state.client.on('message', (topic, message) => {
                    // // console.log(`Received message ${message.toString('hex')} from topic ${topic}`)
                    // this.receiveFromRC(message.toString('hex'))
                    let payload = {};
                    payload.topic = topic;
                    payload.message = message;

                    let topic_arr = topic.split('/')
                    if (this.$store.state.VUE_APP_MOBIUS_RC === topic_arr[topic_arr.length - 1]) {
                        console.log(payload)
                        EventBus.$emit('on-message-handler-' + this.$store.state.VUE_APP_MOBIUS_RC, payload)
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
                    console.log('Subscribe to topics res', res)
                })
            }
        },
        doUnSubscribe() {
            if (this.$store.state.client.connected) {
                const {topic} = this.subscription
                this.$store.state.client.unsubscribe(topic, error => {
                    if (error) {
                        console.log('Unsubscribe error', error)
                    }
                })
            }
        },
        doPublish(topic, payload) {
            if (this.$store.state.client.connected) {
                this.$store.state.client.publish(topic, payload, 0, error => {
                    if (error) {
                        console.log('Publish error', error)
                    }
                })
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
                this.rcPort.close()
            }
        },
        rcPortOpening(port) {
            if (this.rcPort == null) {
                this.rcPort = new SerialPort(port.Path, {
                    baudRate: parseInt(port.BaudRate, 10),
                });

                this.rcPort.on('open', this.rcPortOpen);
                this.rcPort.on('close', this.rcPortClose);
                this.rcPort.on('error', this.rcPortError);
                this.rcPort.on('data', this.rcPortData);
            } else {
                if (this.rcPort.isOpen) {
                    console.log('This is an already open RC port.')
                } else {
                    this.rcPort.open();
                }
            }
        },
        rcPortOpen() {
            console.log('rcPort open. ' + this.rcPort_info.Path + ' Data rate: ' + this.rcPort_info.BaudRate);
        },
        rcPortClose() {
            console.log('rcPort closed.');
        },
        rcPortError(error) {
            console.log('[rcPort error]: ' + error.message);

            setTimeout(this.rcPortOpening, 2000);
        },
        rcPortData(data) {
            this.RCstrFromeGCS += data.toString('hex').toLowerCase();

            while (this.RCstrFromeGCS.length >= 68) {
                // console.log(this.RCstrFromeGCS);
                let header1 = this.RCstrFromeGCS.substr(0, 2);
                if (header1 === 'ff') {
                    let RCLength = 34 * 2;

                    this.receiveFromRC(this.RCstrFromeGCS.toString('hex'))

                    if (this.$store.state.client.connected) {
                        this.$store.state.client.publish('/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.$store.state.VUE_APP_MOBIUS_RC, Buffer.from(this.RCstrFromeGCS, 'hex'));
                    }
                    this.RCstrFromeGCS = this.RCstrFromeGCS.substr(RCLength);
                    this.RCstrFromeGCSLength = 0;
                } else {
                    this.RCstrFromeGCS = this.RCstrFromeGCS.substr(2);
                }
            }
        },
        SBUS2RC(x) {
            return Math.round((x * 8 + 1 - 1000) * this.RC_RATE + 1500);
        },
        min_max_scaler(val) {
            return (val - this.SBUS2RC(0)) / (this.SBUS2RC(230) - this.SBUS2RC(0)) * 100;
        },
        receiveFromRC(hex_content_each) {
            // console.log('receiveFromRC - ' + hex_content_each)
            this.ch1_raw = this.SBUS2RC(parseInt(hex_content_each.substr(2, 2), 16))
            this.ch2_raw = this.SBUS2RC(parseInt(hex_content_each.substr(4, 2), 16))
            this.ch3_raw = this.SBUS2RC(parseInt(hex_content_each.substr(6, 2), 16))
            this.ch4_raw = this.SBUS2RC(parseInt(hex_content_each.substr(8, 2), 16))
            this.ch5_raw = this.SBUS2RC(parseInt(hex_content_each.substr(10, 2), 16))
            this.ch6_raw = this.SBUS2RC(parseInt(hex_content_each.substr(12, 2), 16))
            this.ch7_raw = this.SBUS2RC(parseInt(hex_content_each.substr(14, 2), 16))
            this.ch8_raw = this.SBUS2RC(parseInt(hex_content_each.substr(16, 2), 16))
            this.ch9_raw = this.SBUS2RC(parseInt(hex_content_each.substr(18, 2), 16))
            this.ch10_raw = this.SBUS2RC(parseInt(hex_content_each.substr(20, 2), 16))
            this.ch11_raw = this.SBUS2RC(parseInt(hex_content_each.substr(22, 2), 16))
            this.ch12_raw = this.SBUS2RC(parseInt(hex_content_each.substr(24, 2), 16))
            this.ch13_raw = this.SBUS2RC(parseInt(hex_content_each.substr(26, 2), 16))
            this.ch14_raw = this.SBUS2RC(parseInt(hex_content_each.substr(28, 2), 16))
            this.ch15_raw = this.SBUS2RC(parseInt(hex_content_each.substr(30, 2), 16))
            this.ch16_raw = this.SBUS2RC(parseInt(hex_content_each.substr(32, 2), 16))

            this.ch1_value = this.min_max_scaler(this.ch1_raw)
            this.ch2_value = this.min_max_scaler(this.ch2_raw)
            this.ch3_value = this.min_max_scaler(this.ch3_raw)
            this.ch4_value = this.min_max_scaler(this.ch4_raw)
            this.ch5_value = this.min_max_scaler(this.ch5_raw)
            this.ch6_value = this.min_max_scaler(this.ch6_raw)
            this.ch7_value = this.min_max_scaler(this.ch7_raw)
            this.ch8_value = this.min_max_scaler(this.ch8_raw)
            this.ch9_value = this.min_max_scaler(this.ch9_raw)
            this.ch10_value = this.min_max_scaler(this.ch10_raw)
            this.ch11_value = this.min_max_scaler(this.ch11_raw)
            this.ch12_value = this.min_max_scaler(this.ch12_raw)
            this.ch13_value = this.min_max_scaler(this.ch13_raw)
            this.ch14_value = this.min_max_scaler(this.ch14_raw)
            this.ch15_value = this.min_max_scaler(this.ch15_raw)
            this.ch16_value = this.min_max_scaler(this.ch16_raw)
        },
        calibrateRadio() {
            if (this.radio_cali_flag === true) {
                this.radio_cali_flag = false
            } else if (this.radio_cali_flag === false) {
                this.radio_cali_flag = true
            }
            console.log(this.radio_cali_flag)
        },
        set_roll_reverse() {
            if (this.reverse_roll === true) {
                console.log('reverse_roll', this.reverse_roll)
            } else if (this.reverse_roll === false) {
                console.log('roll reverse')
            }
        },
        set_pitch_reverse() {
            if (this.reverse_pitch === true) {
                console.log('reverse_pitch', this.reverse_pitch)
            } else if (this.reverse_pitch === false) {
                console.log('pitch reverse')
            }
        },
        set_throttle_reverse() {
            if (this.reverse_throttle === true) {
                console.log('reverse_throttle', this.reverse_throttle)
            } else if (this.reverse_throttle === false) {
                console.log('throttle reverse')
            }
        },
        set_yaw_reverse() {
            if (this.reverse_yaw === true) {
                console.log('reverse_yaw', this.reverse_yaw)
            } else if (this.reverse_yaw === false) {
                console.log('yaw reverse')
            }
        },
        beforeDestroy() {
            this.GcsAppBarReseted()
        }
    },
    mounted() {
        setInterval(() => {
            this.trim_count = this.trim_count + 500
            if (this.trim_count <= 2000) {
                this.ch1_trim = this.ch1_raw
                this.ch2_trim = this.ch2_raw
                this.ch3_trim = this.ch3_raw
                this.ch4_trim = this.ch4_raw
                // console.log('this.ch1_trim', this.ch1_trim)
                // console.log('this.ch2_trim', this.ch2_trim)
                // console.log('this.ch3_trim', this.ch3_trim)
                // console.log('this.ch4_trim', this.ch4_trim)
            } else {
                clearInterval()
            }
        }, 500)
    },

    created() {
        this.createConnection()
    }
}
</script>

<style>
.rc_cali {
    position: absolute;
    left: 280px;
}

.progress-bar {
    font-size: 16px;
    color: #000000;
}

.progress-vertical {
    font-size: 16px;
    color: #000000;
    transform: rotate(270deg);
}
</style>