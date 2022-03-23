<template>
    <v-container class="cali">
        <CaliLeftBar></CaliLeftBar>
        <v-row>
            <v-col cols="6">
                <v-row justify="center">
                    <v-col cols="10">
                        <v-progress-linear
                            id="ch1"
                            class="mt-2"
                            v-model="ch_value.ch1_value"
                            height="50"
                            rounded
                        >
                            <div class="v-line" :style="{left:ch_max_val.ch1_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch1_min_val+'%'}">
                            </div>
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
                            <div class="v-line" :style="{left:ch_max_val.ch2_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch2_min_val+'%'}">
                            </div>
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
                            <div class="v-line" :style="{left:ch_max_val.ch3_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch3_min_val+'%'}">
                            </div>
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
                            <div class="v-line" :style="{left:ch_max_val.ch4_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch4_min_val+'%'}">
                            </div>
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
            <v-col>
                <v-row class="my-3">
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch5_value"
                            height="50"
                            rounded
                        >
                            <div class="v-line" :style="{left:ch_max_val.ch5_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch5_min_val+'%'}">
                            </div>
                            <span style="font-size: 25px">Radio 5 <strong>{{ ch_raw.ch5_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch10_value"
                            height="50"
                            rounded
                        >
                            <div class="v-line" :style="{left:ch_max_val.ch10_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch10_min_val+'%'}">
                            </div>
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
                            <div class="v-line" :style="{left:ch_max_val.ch6_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch6_min_val+'%'}">
                            </div>
                             <span style="font-size: 25px">Radio 6 <strong>{{ ch_raw.ch6_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch11_value"
                            height="50"
                            rounded
                        >
                            <div class="v-line" :style="{left:ch_max_val.ch11_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch11_min_val+'%'}">
                            </div>
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
                            <div class="v-line" :style="{left:ch_max_val.ch7_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch7_min_val+'%'}">
                            </div>
                             <span style="font-size: 25px">Radio 7 <strong>{{ ch_raw.ch7_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch12_value"
                            height="50"
                            rounded
                        >
                            <div class="v-line" :style="{left:ch_max_val.ch12_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch12_min_val+'%'}">
                            </div>
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
                            <div class="v-line" :style="{left:ch_max_val.ch8_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch8_min_val+'%'}">
                            </div>
                             <span style="font-size: 25px">Radio 8 <strong>{{ ch_raw.ch8_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch13_value"
                            height="50"
                            rounded
                        >
                            <div class="v-line" :style="{left:ch_max_val.ch13_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch13_min_val+'%'}">
                            </div>
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
                            <div class="v-line" :style="{left:ch_max_val.ch9_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch9_min_val+'%'}">
                            </div>
                             <span style="font-size: 25px">Radio 9 <strong>{{ ch_raw.ch9_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch14_value"
                            height="50"
                            rounded
                        >
                            <div class="v-line" :style="{left:ch_max_val.ch14_max_val+'%'}">
                            </div>
                            <div class="v-line" :style="{left:ch_min_val.ch14_min_val+'%'}">
                            </div>
                             <span style="font-size: 25px">Radio 14 <strong>{{ ch_raw.ch14_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center">
            <v-btn
                depressed
                color="success"
                width="110"
                height="40"
                style="font-size: 20px"
                @click="finish_cali"
            >
                Finish
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import CaliLeftBar from "../views/CaliLeftBar";
import axios from "axios";
import {mixin as VueTimers} from "vue-timers";
import EventBus from "../EventBus";

export default {
    name: 'RCCalibration',

    components: {
        CaliLeftBar
    },

    data() {
        return {
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
                ch1_max: 262,
                ch2_max: 152,
                ch3_max: 152,
                ch4_max: 262,
                ch5_max: 70,
                ch6_max: 29,
                ch7_max: 29,
                ch8_max: 29,
                ch9_max: 29,
                ch10_max: 29,
                ch11_max: 29,
                ch12_max: 29,
                ch13_max: 29,
                ch14_max: 29,
                ch15_max: 29,
                ch16_max: 29,
                ch17_max: 29,
                ch18_max: 29,
                ch19_max: 29,
                ch20_max: 29,
                ch21_max: 29,
                ch22_max: 29,
                ch23_max: 29,
                ch24_max: 29,
                ch25_max: 29,
                ch26_max: 29,
                ch27_max: 29,
                ch28_max: 29,
                ch29_max: 29,
                ch30_max: 29,
                ch31_max: 29,
                ch32_max: 29
            },
            ch_min: {
                ch1_min: 263,
                ch2_min: 153,
                ch3_min: 153,
                ch4_min: 263,
                ch5_min: 71,
                ch6_min: 32,
                ch7_min: 32,
                ch8_min: 32,
                ch9_min: 32,
                ch10_min: 32,
                ch11_min: 32,
                ch12_min: 32,
                ch13_min: 32,
                ch14_min: 32,
                ch15_min: 32,
                ch16_min: 32,
                ch17_min: 32,
                ch18_min: 32,
                ch19_min: 32,
                ch20_min: 32,
                ch21_min: 32,
                ch22_min: 32,
                ch23_min: 32,
                ch24_min: 32,
                ch25_min: 32,
                ch26_min: 32,
                ch27_min: 32,
                ch28_min: 32,
                ch29_min: 32,
                ch30_min: 32,
                ch31_min: 32,
                ch32_min: 32
            },
            ch_max_val: {
                ch1_max_val: 50,
                ch2_max_val: 50,
                ch3_max_val: 50,
                ch4_max_val: 50,
                ch5_max_val: 50,
                ch6_max_val: 50,
                ch7_max_val: 50,
                ch8_max_val: 50,
                ch9_max_val: 50,
                ch10_max_val: 50,
                ch11_max_val: 50,
                ch12_max_val: 50,
                ch13_max_val: 50,
                ch14_max_val: 50,
                ch15_max_val: 50,
                ch16_max_val: 50
            },
            ch_min_val: {
                ch1_min_val: 50,
                ch2_min_val: 50,
                ch3_min_val: 50,
                ch4_min_val: 50,
                ch5_min_val: 50,
                ch6_min_val: 50,
                ch7_min_val: 50,
                ch8_min_val: 50,
                ch9_min_val: 50,
                ch10_min_val: 50,
                ch11_min_val: 50,
                ch12_min_val: 50,
                ch13_min_val: 50,
                ch14_min_val: 50,
                ch15_min_val: 50,
                ch16_min_val: 50
            },
            reverse_roll: false,
            reverse_pitch: false,
            reverse_throttle: false,
            reverse_yaw: false,

            RC_RATE: 0.64,

        }
    },
    mixins: [VueTimers],
    timers: {
        SerialData: {time: 100, repeat: true},
        calibrateRadio: {time: 100, repeat: true}
    },
    methods: {
        SerialData() {
            axios.get('http://localhost:3000/serialdata')
                .then((response) => {
                    // console.log(response.data)
                    this.receiveFromRC(response.data)
                })
        },
        SBUS2RC(x) {
            return Math.round((x * 8 + 1 - 1000) * this.RC_RATE + 1500);
        },
        min_max_scaler(val) {
            return (val - this.SBUS2RC(0)) / (this.SBUS2RC(250) - this.SBUS2RC(0)) * 100;
        },
        ch1_min_max_scaler(val) {
            return (val - this.SBUS2RC(0)) / (this.SBUS2RC(250) - this.SBUS2RC(0)) * 525;
        },
        ch2_min_max_scaler(val) {
            return 305 - ((val - this.SBUS2RC(0)) / (this.SBUS2RC(250) - this.SBUS2RC(0)) * 305);
        },
        ch5_min_max_scaler(val) {
            return ((val - this.SBUS2RC(0)) / (this.SBUS2RC(250) - this.SBUS2RC(0)) * 310);
        },
        receiveFromRC(hex_content_each) {
            if (this.reverse_roll) {
                this.ch_raw.ch1_raw = 250 - parseInt(hex_content_each.substr(2, 2), 16)
            } else {
                this.ch_raw.ch1_raw = parseInt(hex_content_each.substr(2, 2), 16)
            }
            this.ch_raw.ch1_raw = this.SBUS2RC(this.ch_raw.ch1_raw)

            if (this.reverse_pitch) {
                this.ch_raw.ch2_raw = 250 - parseInt(hex_content_each.substr(4, 2), 16)
            } else {
                this.ch_raw.ch2_raw = parseInt(hex_content_each.substr(4, 2), 16)
            }
            this.ch_raw.ch2_raw = this.SBUS2RC(this.ch_raw.ch2_raw)

            if (this.reverse_throttle) {
                this.ch_raw.ch3_raw = 250 - parseInt(hex_content_each.substr(6, 2), 16)
            } else {
                this.ch_raw.ch3_raw = parseInt(hex_content_each.substr(6, 2), 16)
            }
            this.ch_raw.ch3_raw = this.SBUS2RC(this.ch_raw.ch3_raw)

            if (this.reverse_yaw) {
                this.ch_raw.ch4_raw = 250 - parseInt(hex_content_each.substr(8, 2), 16)
            } else {
                this.ch_raw.ch4_raw = parseInt(hex_content_each.substr(8, 2), 16)
            }
            this.ch_raw.ch4_raw = this.SBUS2RC(this.ch_raw.ch4_raw)

            this.ch_raw.ch5_raw = parseInt(hex_content_each.substr(10, 2), 16)
            this.ch_raw.ch5_raw = this.SBUS2RC(this.ch_raw.ch5_raw)
            this.ch_raw.ch6_raw = parseInt(hex_content_each.substr(12, 2), 16)
            this.ch_raw.ch6_raw = this.SBUS2RC(this.ch_raw.ch6_raw)
            this.ch_raw.ch7_raw = parseInt(hex_content_each.substr(14, 2), 16)
            this.ch_raw.ch7_raw = this.SBUS2RC(this.ch_raw.ch7_raw)
            this.ch_raw.ch8_raw = parseInt(hex_content_each.substr(16, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch8_raw.toString(16)
            this.ch_raw.ch8_raw = this.SBUS2RC(this.ch_raw.ch8_raw)
            this.ch_raw.ch9_raw = parseInt(hex_content_each.substr(18, 2), 16)
            this.ch_raw.ch9_raw = this.SBUS2RC(this.ch_raw.ch9_raw)
            this.ch_raw.ch10_raw = parseInt(hex_content_each.substr(20, 2), 16)
            this.ch_raw.ch10_raw = this.SBUS2RC(this.ch_raw.ch10_raw)
            this.ch_raw.ch11_raw = parseInt(hex_content_each.substr(22, 2), 16)
            this.ch_raw.ch11_raw = this.SBUS2RC(this.ch_raw.ch11_raw)
            this.ch_raw.ch12_raw = parseInt(hex_content_each.substr(24, 2), 16)
            this.ch_raw.ch12_raw = this.SBUS2RC(this.ch_raw.ch12_raw)
            this.ch_raw.ch13_raw = parseInt(hex_content_each.substr(26, 2), 16)
            this.ch_raw.ch13_raw = this.SBUS2RC(this.ch_raw.ch13_raw)
            this.ch_raw.ch14_raw = parseInt(hex_content_each.substr(28, 2), 16)
            this.ch_raw.ch14_raw = this.SBUS2RC(this.ch_raw.ch14_raw)
            this.ch_raw.ch15_raw = parseInt(hex_content_each.substr(30, 2), 16)
            this.ch_raw.ch15_raw = this.SBUS2RC(this.ch_raw.ch15_raw)
            this.ch_raw.ch16_raw = parseInt(hex_content_each.substr(32, 2), 16)
            this.ch_raw.ch16_raw = this.SBUS2RC(this.ch_raw.ch16_raw)

            if (this.reverse_pan) {
                this.ch_raw.ch17_raw = 250 - parseInt(hex_content_each.substr(34, 2), 16)
            } else {
                this.ch_raw.ch17_raw = parseInt(hex_content_each.substr(34, 2), 16)
            }
            this.ch_raw.ch17_raw = this.SBUS2RC(this.ch_raw.ch17_raw)
            if (this.reverse_tilt) {
                this.ch_raw.ch18_raw = 250 - parseInt(hex_content_each.substr(36, 2), 16)
            } else {
                this.ch_raw.ch18_raw = parseInt(hex_content_each.substr(36, 2), 16)
            }
            this.ch_raw.ch18_raw = this.SBUS2RC(this.ch_raw.ch18_raw)
            if (this.reverse_zoom) {
                this.ch_raw.ch19_raw = 250 - parseInt(hex_content_each.substr(38, 2), 16)
            } else {
                this.ch_raw.ch19_raw = parseInt(hex_content_each.substr(38, 2), 16)
            }
            this.ch_raw.ch19_raw = this.SBUS2RC(this.ch_raw.ch19_raw)
            this.ch_raw.ch20_raw = parseInt(hex_content_each.substr(40, 2), 16)
            this.ch_raw.ch20_raw = this.SBUS2RC(this.ch_raw.ch20_raw)
            this.ch_raw.ch21_raw = parseInt(hex_content_each.substr(42, 2), 16)
            this.ch_raw.ch21_raw = this.SBUS2RC(this.ch_raw.ch21_raw)
            this.ch_raw.ch22_raw = parseInt(hex_content_each.substr(44, 2), 16)
            this.ch_raw.ch22_raw = this.SBUS2RC(this.ch_raw.ch22_raw)
            this.ch_raw.ch23_raw = parseInt(hex_content_each.substr(46, 2), 16)
            this.ch_raw.ch23_raw = this.SBUS2RC(this.ch_raw.ch23_raw)
            this.ch_raw.ch24_raw = parseInt(hex_content_each.substr(48, 2), 16)
            this.ch_raw.ch24_raw = this.SBUS2RC(this.ch_raw.ch24_raw)
            this.ch_raw.ch25_raw = parseInt(hex_content_each.substr(50, 2), 16)
            this.ch_raw.ch25_raw = this.SBUS2RC(this.ch_raw.ch25_raw)
            this.ch_raw.ch26_raw = parseInt(hex_content_each.substr(52, 2), 16)
            this.ch_raw.ch26_raw = this.SBUS2RC(this.ch_raw.ch26_raw)
            this.ch_raw.ch27_raw = parseInt(hex_content_each.substr(54, 2), 16)
            this.ch_raw.ch27_raw = this.SBUS2RC(this.ch_raw.ch27_raw)
            this.ch_raw.ch28_raw = parseInt(hex_content_each.substr(56, 2), 16)
            this.ch_raw.ch28_raw = this.SBUS2RC(this.ch_raw.ch28_raw)
            this.ch_raw.ch29_raw = parseInt(hex_content_each.substr(58, 2), 16)
            this.ch_raw.ch29_raw = this.SBUS2RC(this.ch_raw.ch29_raw)
            this.ch_raw.ch30_raw = parseInt(hex_content_each.substr(62, 2), 16)
            this.ch_raw.ch30_raw = this.SBUS2RC(this.ch_raw.ch30_raw)
            this.ch_raw.ch31_raw = parseInt(hex_content_each.substr(64, 2), 16)
            this.ch_raw.ch31_raw = this.SBUS2RC(this.ch_raw.ch31_raw)
            this.ch_raw.ch32_raw = parseInt(hex_content_each.substr(66, 2), 16)
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
        },
        calibrateRadio() {
            if (this.ch_max_val.ch1_max_val <= this.ch_value.ch1_value) {
                this.ch_max_val.ch1_max_val = this.ch_value.ch1_value
                this.ch_max.ch1_max = this.ch_raw.ch1_raw
            }
            if (this.ch_max_val.ch2_max_val >= this.ch_value.ch2_value) {
                this.ch_max_val.ch2_max_val = this.ch_value.ch2_value
                this.ch_max.ch2_max = this.ch_raw.ch2_raw
            }
            if (this.ch_max_val.ch3_max_val >= this.ch_value.ch3_value) {
                this.ch_max_val.ch3_max_val = this.ch_value.ch3_value
                this.ch_max.ch3_max = this.ch_raw.ch3_raw
            }
            if (this.ch_max_val.ch4_max_val <= this.ch_value.ch4_value) {
                this.ch_max_val.ch4_max_val = this.ch_value.ch4_value
                this.ch_max.ch4_max = this.ch_raw.ch4_raw
            }
            if (this.ch_max_val.ch5_max_val <= this.ch_value.ch5_value) {
                this.ch_max_val.ch5_max_val = this.ch_value.ch5_value
                this.ch_max.ch5_max = this.ch_raw.ch5_raw
            }
            if (this.ch_max_val.ch6_max_val <= this.ch_value.ch6_value) {
                this.ch_max_val.ch6_max_val = this.ch_value.ch6_value
                this.ch_max.ch6_max = this.ch_raw.ch6_raw
            }
            if (this.ch_max_val.ch7_max_val <= this.ch_value.ch7_value) {
                this.ch_max_val.ch7_max_val = this.ch_value.ch7_value
                this.ch_max.ch7_max = this.ch_raw.ch7_raw
            }
            if (this.ch_max_val.ch8_max_val <= this.ch_value.ch8_value) {
                this.ch_max_val.ch8_max_val = this.ch_value.ch8_value
                this.ch_max.ch8_max = this.ch_raw.ch8_raw
            }
            if (this.ch_max_val.ch9_max_val <= this.ch_value.ch9_value) {
                this.ch_max_val.ch9_max_val = this.ch_value.ch9_value
                this.ch_max.ch9_max = this.ch_raw.ch9_raw
            }
            if (this.ch_max_val.ch10_max_val <= this.ch_value.ch10_value) {
                this.ch_max_val.ch10_max_val = this.ch_value.ch10_value
                this.ch_max.ch10_max = this.ch_raw.ch10_raw
            }
            if (this.ch_max_val.ch11_max_val <= this.ch_value.ch11_value) {
                this.ch_max_val.ch11_max_val = this.ch_value.ch11_value
                this.ch_max.ch11_max = this.ch_raw.ch11_raw
            }
            if (this.ch_max_val.ch12_max_val <= this.ch_value.ch12_value) {
                this.ch_max_val.ch12_max_val = this.ch_value.ch12_value
                this.ch_max.ch12_max = this.ch_raw.ch12_raw
            }
            if (this.ch_max_val.ch13_max_val <= this.ch_value.ch13_value) {
                this.ch_max_val.ch13_max_val = this.ch_value.ch13_value
                this.ch_max.ch13_max = this.ch_raw.ch13_raw
            }
            if (this.ch_max_val.ch14_max_val <= this.ch_value.ch14_value) {
                this.ch_max_val.ch14_max_val = this.ch_value.ch14_value
                this.ch_max.ch14_max = this.ch_raw.ch14_raw
            }
            if (this.ch_max_val.ch15_max_val <= this.ch_value.ch15_value) {
                this.ch_max_val.ch15_max_val = this.ch_value.ch15_value
                this.ch_max.ch15_max = this.ch_raw.ch15_raw
            }
            if (this.ch_max_val.ch16_max_val <= this.ch_value.ch16_value) {
                this.ch_max_val.ch16_max_val = this.ch_value.ch16_value
                this.ch_max.ch16_max = this.ch_raw.ch16_raw
            }

            if (this.ch_min_val.ch1_min_val >= this.ch_value.ch1_value) {
                this.ch_min_val.ch1_min_val = this.ch_value.ch1_value
                this.ch_min.ch1_min = this.ch_raw.ch1_raw
            }
            if (this.ch_min_val.ch2_min_val <= this.ch_value.ch2_value) {
                this.ch_min_val.ch2_min_val = this.ch_value.ch2_value
                this.ch_min.ch2_min = this.ch_raw.ch2_raw
            }
            if (this.ch_min_val.ch3_min_val <= this.ch_value.ch3_value) {
                this.ch_min_val.ch3_min_val = this.ch_value.ch3_value
                this.ch_min.ch3_min = this.ch_raw.ch3_raw
            }
            if (this.ch_min_val.ch4_min_val >= this.ch_value.ch4_value) {
                this.ch_min_val.ch4_min_val = this.ch_value.ch4_value
                this.ch_min.ch4_min = this.ch_raw.ch4_raw
            }
            if (this.ch_min_val.ch5_min_val >= this.ch_value.ch5_value) {
                this.ch_min_val.ch5_min_val = this.ch_value.ch5_value
                this.ch_min.ch5_min = this.ch_raw.ch5_raw
            }
            if (this.ch_min_val.ch6_min_val >= this.ch_value.ch6_value) {
                this.ch_min_val.ch6_min_val = this.ch_value.ch6_value
                this.ch_min.ch6_min = this.ch_raw.ch6_raw
            }
            if (this.ch_min_val.ch7_min_val >= this.ch_value.ch7_value) {
                this.ch_min_val.ch7_min_val = this.ch_value.ch7_value
                this.ch_min.ch7_min = this.ch_raw.ch7_raw
            }
            if (this.ch_min_val.ch8_min_val >= this.ch_value.ch8_value) {
                this.ch_min_val.ch8_min_val = this.ch_value.ch8_value
                this.ch_min.ch8_min = this.ch_raw.ch8_raw
            }
            if (this.ch_min_val.ch9_min_val >= this.ch_value.ch9_value) {
                this.ch_min_val.ch9_min_val = this.ch_value.ch9_value
                this.ch_min.ch9_min = this.ch_raw.ch9_raw
            }
            if (this.ch_min_val.ch10_min_val >= this.ch_value.ch10_value) {
                this.ch_min_val.ch10_min_val = this.ch_value.ch10_value
                this.ch_min.ch10_min = this.ch_raw.ch10_raw
            }
            if (this.ch_min_val.ch11_min_val >= this.ch_value.ch11_value) {
                this.ch_min_val.ch11_min_val = this.ch_value.ch11_value
                this.ch_min.ch11_min = this.ch_raw.ch11_raw
            }
            if (this.ch_min_val.ch12_min_val >= this.ch_value.ch12_value) {
                this.ch_min_val.ch12_min_val = this.ch_value.ch12_value
                this.ch_min.ch12_min = this.ch_raw.ch12_raw
            }
            if (this.ch_min_val.ch13_min_val >= this.ch_value.ch13_value) {
                this.ch_min_val.ch13_min_val = this.ch_value.ch13_value
                this.ch_min.ch13_min = this.ch_raw.ch13_raw
            }
            if (this.ch_min_val.ch14_min_val >= this.ch_value.ch14_value) {
                this.ch_min_val.ch14_min_val = this.ch_value.ch14_value
                this.ch_min.ch14_min = this.ch_raw.ch14_raw
            }
            if (this.ch_min_val.ch15_min_val >= this.ch_value.ch15_value) {
                this.ch_min_val.ch15_min_val = this.ch_value.ch15_value
                this.ch_min.ch15_min = this.ch_raw.ch15_raw
            }
            if (this.ch_min_val.ch16_min_val >= this.ch_value.ch16_value) {
                this.ch_min_val.ch16_min_val = this.ch_value.ch16_value
                this.ch_min.ch16_min = this.ch_raw.ch16_raw
            }
        },
        finish_cali() {
            this.ch_trim.ch1_trim = Math.round((this.ch_max.ch1_max + this.ch_min.ch1_min) / 2)
            this.ch_trim.ch2_trim = Math.round((this.ch_max.ch2_max + this.ch_min.ch2_min) / 2)
            this.ch_trim.ch3_trim = Math.round((this.ch_max.ch3_max + this.ch_min.ch3_min) / 2)
            this.ch_trim.ch4_trim = Math.round((this.ch_max.ch4_max + this.ch_min.ch4_min) / 2)
            this.ch_trim.ch5_trim = Math.round((this.ch_max.ch5_max + this.ch_min.ch5_min) / 2)
            this.ch_trim.ch6_trim = Math.round((this.ch_max.ch6_max + this.ch_min.ch6_min) / 2)
            this.ch_trim.ch7_trim = Math.round((this.ch_max.ch7_max + this.ch_min.ch7_min) / 2)
            this.ch_trim.ch8_trim = Math.round((this.ch_max.ch8_max + this.ch_min.ch8_min) / 2)
            this.ch_trim.ch9_trim = Math.round((this.ch_max.ch9_max + this.ch_min.ch9_min) / 2)
            this.ch_trim.ch10_trim = Math.round((this.ch_max.ch10_max + this.ch_min.ch10_min) / 2)
            this.ch_trim.ch11_trim = Math.round((this.ch_max.ch11_max + this.ch_min.ch11_min) / 2)
            this.ch_trim.ch12_trim = Math.round((this.ch_max.ch12_max + this.ch_min.ch12_min) / 2)
            this.ch_trim.ch13_trim = Math.round((this.ch_max.ch13_max + this.ch_min.ch13_min) / 2)
            this.ch_trim.ch14_trim = Math.round((this.ch_max.ch14_max + this.ch_min.ch14_min) / 2)
            this.ch_trim.ch15_trim = Math.round((this.ch_max.ch15_max + this.ch_min.ch15_min) / 2)
            this.ch_trim.ch16_trim = Math.round((this.ch_max.ch16_max + this.ch_min.ch16_min) / 2)

            this.$store.state.MinMaxTrim[0].value = this.ch_max.ch1_max
            this.$store.state.MinMaxTrim[1].value = this.ch_trim.ch1_trim
            this.$store.state.MinMaxTrim[2].value = this.ch_min.ch1_min
            this.$store.state.MinMaxTrim[3].value = this.ch_max.ch2_max
            this.$store.state.MinMaxTrim[4].value = this.ch_trim.ch2_trim
            this.$store.state.MinMaxTrim[5].value = this.ch_min.ch2_min
            this.$store.state.MinMaxTrim[6].value = this.ch_max.ch3_max
            this.$store.state.MinMaxTrim[7].value = this.ch_trim.ch3_trim
            this.$store.state.MinMaxTrim[8].value = this.ch_min.ch3_min
            this.$store.state.MinMaxTrim[9].value = this.ch_max.ch4_max
            this.$store.state.MinMaxTrim[10].value = this.ch_trim.ch4_trim
            this.$store.state.MinMaxTrim[11].value = this.ch_min.ch4_min
            this.$store.state.MinMaxTrim[12].value = this.ch_max.ch5_max
            this.$store.state.MinMaxTrim[13].value = this.ch_trim.ch5_trim
            this.$store.state.MinMaxTrim[14].value = this.ch_min.ch5_min
            this.$store.state.MinMaxTrim[15].value = this.ch_max.ch6_max
            this.$store.state.MinMaxTrim[16].value = this.ch_trim.ch6_trim
            this.$store.state.MinMaxTrim[17].value = this.ch_min.ch6_min
            this.$store.state.MinMaxTrim[18].value = this.ch_max.ch7_max
            this.$store.state.MinMaxTrim[19].value = this.ch_trim.ch7_trim
            this.$store.state.MinMaxTrim[20].value = this.ch_min.ch7_min
            this.$store.state.MinMaxTrim[21].value = this.ch_max.ch8_max
            this.$store.state.MinMaxTrim[22].value = this.ch_trim.ch8_trim
            this.$store.state.MinMaxTrim[23].value = this.ch_min.ch8_min
            this.$store.state.MinMaxTrim[24].value = this.ch_max.ch9_max
            this.$store.state.MinMaxTrim[25].value = this.ch_trim.ch9_trim
            this.$store.state.MinMaxTrim[26].value = this.ch_min.ch9_min
            this.$store.state.MinMaxTrim[27].value = this.ch_max.ch10_max
            this.$store.state.MinMaxTrim[28].value = this.ch_trim.ch10_trim
            this.$store.state.MinMaxTrim[29].value = this.ch_min.ch10_min
            this.$store.state.MinMaxTrim[30].value = this.ch_max.ch11_max
            this.$store.state.MinMaxTrim[31].value = this.ch_trim.ch11_trim
            this.$store.state.MinMaxTrim[32].value = this.ch_min.ch11_min
            this.$store.state.MinMaxTrim[33].value = this.ch_max.ch12_max
            this.$store.state.MinMaxTrim[34].value = this.ch_trim.ch12_trim
            this.$store.state.MinMaxTrim[35].value = this.ch_min.ch12_min
            this.$store.state.MinMaxTrim[36].value = this.ch_max.ch13_max
            this.$store.state.MinMaxTrim[37].value = this.ch_trim.ch13_trim
            this.$store.state.MinMaxTrim[38].value = this.ch_min.ch13_min
            this.$store.state.MinMaxTrim[39].value = this.ch_max.ch14_max
            this.$store.state.MinMaxTrim[40].value = this.ch_trim.ch14_trim
            this.$store.state.MinMaxTrim[41].value = this.ch_min.ch14_min
            this.$store.state.MinMaxTrim[42].value = this.ch_max.ch15_max
            this.$store.state.MinMaxTrim[43].value = this.ch_trim.ch15_trim
            this.$store.state.MinMaxTrim[44].value = this.ch_min.ch15_min
            this.$store.state.MinMaxTrim[45].value = this.ch_max.ch16_max
            this.$store.state.MinMaxTrim[46].value = this.ch_trim.ch16_trim
            this.$store.state.MinMaxTrim[47].value = this.ch_min.ch16_min
            // FC로 Min, Max, Trim 파라미터 전달
            // UI 재설정
            EventBus.$emit('update-cali-table')
        }
    },
    mounted() {
        this.$timer.start('SerialData')
        this.$timer.start('calibrateRadio')
    },
    beforeDestroy() {
        this.$timer.stop('SerialData')
        this.$timer.stop('calibrateRadio')
    }
}
</script>

<style>
.cali {
    position: absolute;
    left: 330px;
    top: -9px;
}

.v-line {
    border-right: thick solid #ff0000;
    height: 100%;
    position: absolute;
}

</style>
