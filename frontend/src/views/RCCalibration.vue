<template>
    <v-container class="cali">
        <CaliLeftBar></CaliLeftBar>
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
                            <span>Roll <strong>{{ ch_raw.ch1_raw }}</strong></span>
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
                            <span>Pitch <strong>{{ ch_raw.ch2_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6" class="mr-16">
                        <v-progress-linear
                            class="progress-vertical"
                            v-model="ch_value.ch3_value"
                            height="60"
                            rounded
                        >
                            <span>Throttle <strong>{{ ch_raw.ch3_raw }}</strong></span>
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
                            <span>Yaw <strong>{{ ch_raw.ch4_raw }}</strong></span>
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
                            <span>Radio 5 <strong>{{ ch_raw.ch5_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch10_value"
                            height="50"
                            rounded
                        >
                            <span>Radio 10 <strong>{{ ch_raw.ch10_raw }}</strong></span>
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
                            <span>Radio 6 <strong>{{ ch_raw.ch6_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch11_value"
                            height="50"
                            rounded
                        >
                            <span>Radio 11 <strong>{{ ch_raw.ch11_raw }}</strong></span>
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
                            <span>Radio 7 <strong>{{ ch_raw.ch7_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch12_value"
                            height="50"
                            rounded
                        >
                            <span>Radio 12 <strong>{{ ch_raw.ch12_raw }}</strong></span>
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
                            <span>Radio 8 <strong>{{ ch_raw.ch8_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch13_value"
                            height="50"
                            rounded
                        >
                            <span>Radio 13 <strong>{{ ch_raw.ch13_raw }}</strong></span>
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
                            <span>Radio 9 <strong>{{ ch_raw.ch9_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear
                            v-model="ch_value.ch14_value"
                            height="50"
                            rounded
                        >
                            <span>Radio 14 <strong>{{ ch_raw.ch14_raw }}</strong></span>
                        </v-progress-linear>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="Maxline">
            <v-col cols="6">
                <v-row justify="start">
                    <v-col cols="10">
                        <svg class="ch1_max" width="526" height="50">
                            <line :x1="ch_max_val.ch1_max_val" y1="0" :x2=ch_max_val.ch1_max_val y2="49"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="2">
                    </v-col>
                </v-row>
                <v-row align="start" justify="start">
                    <v-col cols="6" class="mt-n2">
                        <svg class="ch2_max ml-16 pl-6" width="83" height="305">
                            <line x1="0" :y1="ch_max_val.ch2_max_val" x2="59" :y2="ch_max_val.ch2_max_val"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="mt-n2">
                        <svg class="ch3_max ml-5" width="83" height="305">
                            <line x1="2" :y1="ch_max_val.ch3_max_val" x2="62" :y2="ch_max_val.ch3_max_val"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col cols="10" class="mt-n1">
                        <svg class="ch4_max" width="526">
                            <line :x1="ch_max_val.ch4_max_val" y1="0" :x2=ch_max_val.ch4_max_val y2="50"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="2">
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="ml-lg-n16">
                <v-row class="ml-n2">
                    <v-col cols="6" class="ml-n1">
                        <svg class="ch5_max ml-n1" width="310" height="53">
                            <line :x1="ch_max_val.ch5_max_val" y1="3" :x2=ch_max_val.ch5_max_val y2="53"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch10_max ml-n1" width="310" height="53">
                            <line :x1="ch_max_val.ch10_max_val" y1="3" :x2=ch_max_val.ch10_max_val y2="53"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row class="my-3 mt-5">
                    <v-col cols="6">
                        <svg class="ch6_max ml-n1" width="310" height="54">
                            <line :x1="ch_max_val.ch6_max_val" y1="4" :x2=ch_max_val.ch6_max_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch11_max ml-n1" width="310" height="54">
                            <line :x1="ch_max_val.ch11_max_val" y1="4" :x2=ch_max_val.ch11_max_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row class="my-3 mt-n1">
                    <v-col cols="6">
                        <svg class="ch7_max ml-n1" width="310" height="54">
                            <line :x1="ch_max_val.ch7_max_val" y1="4" :x2=ch_max_val.ch7_max_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch12_max ml-n1" width="310" height="54">
                            <line :x1="ch_max_val.ch12_max_val" y1="4" :x2=ch_max_val.ch12_max_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row class="my-3 mt-n1">
                    <v-col cols="6">
                        <svg class="ch8_max ml-n1" width="310" height="54">
                            <line :x1="ch_max_val.ch8_max_val" y1="4" :x2=ch_max_val.ch8_max_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch13_max ml-n1" width="310" height="54">
                            <line :x1="ch_max_val.ch13_max_val" y1="4" :x2=ch_max_val.ch13_max_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row class="my-3 mt-n1">
                    <v-col cols="6">
                        <svg class="ch9_max ml-n1" width="310" height="54">
                            <line :x1="ch_max_val.ch9_max_val" y1="4" :x2=ch_max_val.ch9_max_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch14_max ml-n1" width="310" height="54">
                            <line :x1="ch_max_val.ch14_max_val" y1="4" :x2=ch_max_val.ch14_max_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="Minline">
            <v-col cols="6">
                <v-row justify="start">
                    <v-col cols="10">
                        <svg class="ch1_min" width="526px" height="50">
                            <line :x1="ch_min_val.ch1_min_val" y1="0" :x2=ch_min_val.ch1_min_val y2="49"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="2">
                    </v-col>
                </v-row>
                <v-row align="start" justify="start">
                    <v-col cols="6" class="mt-n2">
                        <svg class="ch2_min ml-16 pl-6" width="83" height="305">
                            <line x1="0" :y1="ch_min_val.ch2_min_val" x2="59" :y2="ch_min_val.ch2_min_val"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="mt-n2">
                        <svg class="ch3_min ml-5" width="83" height="305">
                            <line x1="2" :y1="ch_min_val.ch3_min_val" x2="62" :y2="ch_min_val.ch3_min_val"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col cols="10" class="mt-n1">
                        <svg class="ch4_min" width="526px">
                            <line :x1="ch_min_val.ch4_min_val" y1="0" :x2=ch_min_val.ch4_min_val y2="50"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="2">
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="ml-lg-n16">
                <v-row class="ml-n2">
                    <v-col cols="6" class="ml-n1">
                        <svg class="ch5_min ml-n1" width="310" height="53">
                            <line :x1="ch_min_val.ch5_min_val" y1="3" :x2=ch_min_val.ch5_min_val y2="53"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch10_min ml-n1" width="310" height="53">
                            <line :x1="ch_min_val.ch10_min_val" y1="3" :x2=ch_min_val.ch10_min_val y2="53"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row class="my-3 mt-5">
                    <v-col cols="6">
                        <svg class="ch6_min ml-n1" width="310" height="54">
                            <line :x1="ch_min_val.ch6_min_val" y1="4" :x2=ch_min_val.ch6_min_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch11_min ml-n1" width="310" height="54">
                            <line :x1="ch_min_val.ch11_min_val" y1="4" :x2=ch_min_val.ch11_min_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row class="my-3 mt-n1">
                    <v-col cols="6">
                        <svg class="ch7_min ml-n1" width="310" height="54">
                            <line :x1="ch_min_val.ch7_min_val" y1="4" :x2=ch_min_val.ch7_min_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch12_min ml-n1" width="310" height="54">
                            <line :x1="ch_min_val.ch12_min_val" y1="4" :x2=ch_min_val.ch12_min_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row class="my-3 mt-n1">
                    <v-col cols="6">
                        <svg class="ch8_min ml-n1" width="310" height="54">
                            <line :x1="ch_min_val.ch8_min_val" y1="4" :x2=ch_min_val.ch8_min_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch13_min ml-n1" width="310" height="54">
                            <line :x1="ch_min_val.ch13_min_val" y1="4" :x2=ch_min_val.ch13_min_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
                <v-row class="my-3 mt-n1">
                    <v-col cols="6">
                        <svg class="ch9_min ml-n1" width="310" height="54">
                            <line :x1="ch_min_val.ch9_min_val" y1="4" :x2=ch_min_val.ch9_min_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                    <v-col cols="6" class="ml-lg-n16">
                        <svg class="ch14_min ml-n1" width="310" height="54">
                            <line :x1="ch_min_val.ch14_min_val" y1="4" :x2=ch_min_val.ch14_min_val y2="54"
                                  stroke-width="3" stroke="red"/>
                        </svg>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center">
            <v-btn
                depressed
                color="success"
                width="100"
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
                ch1_max_val: 262,
                ch2_max_val: 152,
                ch3_max_val: 152,
                ch4_max_val: 262,
                ch5_max_val: 70,
                ch6_max_val: 29,
                ch7_max_val: 29,
                ch8_max_val: 29,
                ch9_max_val: 29,
                ch10_max_val: 29,
                ch11_max_val: 29,
                ch12_max_val: 29,
                ch13_max_val: 29,
                ch14_max_val: 29,
                ch15_max_val: 29,
                ch16_max_val: 29
            },
            ch_min_val: {
                ch1_min_val: 263,
                ch2_min_val: 153,
                ch3_min_val: 153,
                ch4_min_val: 263,
                ch5_min_val: 71,
                ch6_min_val: 32,
                ch7_min_val: 32,
                ch8_min_val: 32,
                ch9_min_val: 32,
                ch10_min_val: 32,
                ch11_min_val: 32,
                ch12_min_val: 32,
                ch13_min_val: 32,
                ch14_min_val: 32,
                ch15_min_val: 32,
                ch16_min_val: 32
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
                    console.log(response.data)
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
            // console.log('receiveFromRC - ' + hex_content_each)
            // this.RCstrToDrone += 'ff'
            if (this.reverse_roll) {
                this.ch_raw.ch1_raw = 250 - parseInt(hex_content_each.substr(2, 2), 16)
            } else {
                this.ch_raw.ch1_raw = parseInt(hex_content_each.substr(2, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch1_raw.toString(16)
            this.ch_raw.ch1_raw = this.SBUS2RC(this.ch_raw.ch1_raw)

            if (this.reverse_pitch) {
                this.ch_raw.ch2_raw = 250 - parseInt(hex_content_each.substr(4, 2), 16)
            } else {
                this.ch_raw.ch2_raw = parseInt(hex_content_each.substr(4, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch2_raw.toString(16)
            this.ch_raw.ch2_raw = this.SBUS2RC(this.ch_raw.ch2_raw)

            if (this.reverse_throttle) {
                this.ch_raw.ch3_raw = 250 - parseInt(hex_content_each.substr(6, 2), 16)
            } else {
                this.ch_raw.ch3_raw = parseInt(hex_content_each.substr(6, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch3_raw.toString(16)
            this.ch_raw.ch3_raw = this.SBUS2RC(this.ch_raw.ch3_raw)

            if (this.reverse_yaw) {
                this.ch_raw.ch4_raw = 250 - parseInt(hex_content_each.substr(8, 2), 16)
            } else {
                this.ch_raw.ch4_raw = parseInt(hex_content_each.substr(8, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch4_raw.toString(16)
            this.ch_raw.ch4_raw = this.SBUS2RC(this.ch_raw.ch4_raw)

            this.ch_raw.ch5_raw = parseInt(hex_content_each.substr(10, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch5_raw.toString(16)
            this.ch_raw.ch5_raw = this.SBUS2RC(this.ch_raw.ch5_raw)
            this.ch_raw.ch6_raw = parseInt(hex_content_each.substr(12, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch6_raw.toString(16)
            this.ch_raw.ch6_raw = this.SBUS2RC(this.ch_raw.ch6_raw)
            this.ch_raw.ch7_raw = parseInt(hex_content_each.substr(14, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch7_raw.toString(16)
            this.ch_raw.ch7_raw = this.SBUS2RC(this.ch_raw.ch7_raw)
            this.ch_raw.ch8_raw = parseInt(hex_content_each.substr(16, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch8_raw.toString(16)
            this.ch_raw.ch8_raw = this.SBUS2RC(this.ch_raw.ch8_raw)
            this.ch_raw.ch9_raw = parseInt(hex_content_each.substr(18, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch9_raw.toString(16)
            this.ch_raw.ch9_raw = this.SBUS2RC(this.ch_raw.ch9_raw)
            this.ch_raw.ch10_raw = parseInt(hex_content_each.substr(20, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch10_raw.toString(16)
            this.ch_raw.ch10_raw = this.SBUS2RC(this.ch_raw.ch10_raw)
            this.ch_raw.ch11_raw = parseInt(hex_content_each.substr(22, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch11_raw.toString(16)
            this.ch_raw.ch11_raw = this.SBUS2RC(this.ch_raw.ch11_raw)
            this.ch_raw.ch12_raw = parseInt(hex_content_each.substr(24, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch12_raw.toString(16)
            this.ch_raw.ch12_raw = this.SBUS2RC(this.ch_raw.ch12_raw)
            this.ch_raw.ch13_raw = parseInt(hex_content_each.substr(26, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch13_raw.toString(16)
            this.ch_raw.ch13_raw = this.SBUS2RC(this.ch_raw.ch13_raw)
            this.ch_raw.ch14_raw = parseInt(hex_content_each.substr(28, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch14_raw.toString(16)
            this.ch_raw.ch14_raw = this.SBUS2RC(this.ch_raw.ch14_raw)
            this.ch_raw.ch15_raw = parseInt(hex_content_each.substr(30, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch15_raw.toString(16)
            this.ch_raw.ch15_raw = this.SBUS2RC(this.ch_raw.ch15_raw)
            this.ch_raw.ch16_raw = parseInt(hex_content_each.substr(32, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch16_raw.toString(16)
            this.ch_raw.ch16_raw = this.SBUS2RC(this.ch_raw.ch16_raw)

            if (this.reverse_pan) {
                this.ch_raw.ch17_raw = 250 - parseInt(hex_content_each.substr(34, 2), 16)
            } else {
                this.ch_raw.ch17_raw = parseInt(hex_content_each.substr(34, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch17_raw.toString(16)
            this.ch_raw.ch17_raw = this.SBUS2RC(this.ch_raw.ch17_raw)
            if (this.reverse_tilt) {
                this.ch_raw.ch18_raw = 250 - parseInt(hex_content_each.substr(36, 2), 16)
            } else {
                this.ch_raw.ch18_raw = parseInt(hex_content_each.substr(36, 2), 16)
            }
            // this.RCstrToDrone += this.ch_raw.ch18_raw.toString(16)
            this.ch_raw.ch18_raw = this.SBUS2RC(this.ch_raw.ch18_raw)
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
            this.ch_raw.ch30_raw = parseInt(hex_content_each.substr(62, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch30_raw.toString(16)
            this.ch_raw.ch30_raw = this.SBUS2RC(this.ch_raw.ch30_raw)
            this.ch_raw.ch31_raw = parseInt(hex_content_each.substr(64, 2), 16)
            // this.RCstrToDrone += this.ch_raw.ch31_raw.toString(16)
            this.ch_raw.ch31_raw = this.SBUS2RC(this.ch_raw.ch31_raw)
            this.ch_raw.ch32_raw = parseInt(hex_content_each.substr(66, 2), 16)
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

            this.ch_max.ch1_max = this.ch1_min_max_scaler(this.ch_raw.ch1_raw)
            this.ch_max.ch2_max = this.ch2_min_max_scaler(this.ch_raw.ch2_raw)
            this.ch_max.ch3_max = this.ch2_min_max_scaler(this.ch_raw.ch3_raw)
            this.ch_max.ch4_max = this.ch1_min_max_scaler(this.ch_raw.ch4_raw)
            this.ch_max.ch5_max = this.ch5_min_max_scaler(this.ch_raw.ch5_raw)
            this.ch_max.ch6_max = this.ch5_min_max_scaler(this.ch_raw.ch6_raw)
            this.ch_max.ch7_max = this.ch5_min_max_scaler(this.ch_raw.ch7_raw)
            this.ch_max.ch8_max = this.ch5_min_max_scaler(this.ch_raw.ch8_raw)
            this.ch_max.ch9_max = this.ch5_min_max_scaler(this.ch_raw.ch9_raw)
            this.ch_max.ch10_max = this.ch5_min_max_scaler(this.ch_raw.ch10_raw)
            this.ch_max.ch11_max = this.ch5_min_max_scaler(this.ch_raw.ch11_raw)
            this.ch_max.ch12_max = this.ch5_min_max_scaler(this.ch_raw.ch12_raw)
            this.ch_max.ch13_max = this.ch5_min_max_scaler(this.ch_raw.ch13_raw)
            this.ch_max.ch14_max = this.ch5_min_max_scaler(this.ch_raw.ch14_raw)
            this.ch_max.ch15_max = this.ch5_min_max_scaler(this.ch_raw.ch15_raw)
            this.ch_max.ch16_max = this.ch5_min_max_scaler(this.ch_raw.ch16_raw)

            this.ch_min.ch1_min = this.ch1_min_max_scaler(this.ch_raw.ch1_raw)
            this.ch_min.ch2_min = this.ch2_min_max_scaler(this.ch_raw.ch2_raw)
            this.ch_min.ch3_min = this.ch2_min_max_scaler(this.ch_raw.ch3_raw)
            this.ch_min.ch4_min = this.ch1_min_max_scaler(this.ch_raw.ch4_raw)
            this.ch_min.ch5_min = this.ch5_min_max_scaler(this.ch_raw.ch5_raw)
            this.ch_min.ch6_min = this.ch5_min_max_scaler(this.ch_raw.ch6_raw)
            this.ch_min.ch7_min = this.ch5_min_max_scaler(this.ch_raw.ch7_raw)
            this.ch_min.ch8_min = this.ch5_min_max_scaler(this.ch_raw.ch8_raw)
            this.ch_min.ch9_min = this.ch5_min_max_scaler(this.ch_raw.ch9_raw)
            this.ch_min.ch10_min = this.ch5_min_max_scaler(this.ch_raw.ch10_raw)
            this.ch_min.ch11_min = this.ch5_min_max_scaler(this.ch_raw.ch11_raw)
            this.ch_min.ch12_min = this.ch5_min_max_scaler(this.ch_raw.ch12_raw)
            this.ch_min.ch13_min = this.ch5_min_max_scaler(this.ch_raw.ch13_raw)
            this.ch_min.ch14_min = this.ch5_min_max_scaler(this.ch_raw.ch14_raw)
            this.ch_min.ch15_min = this.ch5_min_max_scaler(this.ch_raw.ch15_raw)
            this.ch_min.ch16_min = this.ch5_min_max_scaler(this.ch_raw.ch16_raw)

            // this.ch_trim.ch1_trim = this.cal_min_max_scaler(this.ch_raw.ch1_raw)
            // this.ch_trim.ch2_trim = this.cal_min_max_scaler(this.ch_raw.ch2_raw)
            // this.ch_trim.ch3_trim = this.cal_min_max_scaler(this.ch_raw.ch3_raw)
            // this.ch_trim.ch4_trim = this.cal_min_max_scaler(this.ch_raw.ch4_raw)
            // this.ch_trim.ch5_trim = this.cal_min_max_scaler(this.ch_raw.ch5_raw)
            // this.ch_trim.ch6_trim = this.cal_min_max_scaler(this.ch_raw.ch6_raw)
            // this.ch_trim.ch7_trim = this.cal_min_max_scaler(this.ch_raw.ch7_raw)
            // this.ch_trim.ch8_trim = this.cal_min_max_scaler(this.ch_raw.ch8_raw)
            // this.ch_trim.ch9_trim = this.cal_min_max_scaler(this.ch_raw.ch9_raw)
            // this.ch_trim.ch10_trim = this.cal_min_max_scaler(this.ch_raw.ch10_raw)
            // this.ch_trim.ch11_trim = this.cal_min_max_scaler(this.ch_raw.ch11_raw)
            // this.ch_trim.ch12_trim = this.cal_min_max_scaler(this.ch_raw.ch12_raw)
            // this.ch_trim.ch13_trim = this.cal_min_max_scaler(this.ch_raw.ch13_raw)
            // this.ch_trim.ch14_trim = this.cal_min_max_scaler(this.ch_raw.ch14_raw)
            // this.ch_trim.ch15_trim = this.cal_min_max_scaler(this.ch_raw.ch15_raw)
            // this.ch_trim.ch16_trim = this.cal_min_max_scaler(this.ch_raw.ch16_raw)
        },
        calibrateRadio() {
            if (this.ch_max_val.ch1_max_val <= this.ch_max.ch1_max) {
                this.ch_max_val.ch1_max_val = this.ch_max.ch1_max
            }
            if (this.ch_max_val.ch2_max_val >= this.ch_max.ch2_max) {
                this.ch_max_val.ch2_max_val = this.ch_max.ch2_max
            }
            if (this.ch_max_val.ch3_max_val >= this.ch_max.ch3_max) {
                this.ch_max_val.ch3_max_val = this.ch_max.ch3_max
            }
            if (this.ch_max_val.ch4_max_val <= this.ch_max.ch4_max) {
                this.ch_max_val.ch4_max_val = this.ch_max.ch4_max
            }
            if (this.ch_max_val.ch5_max_val <= this.ch_max.ch5_max) {
                this.ch_max_val.ch5_max_val = this.ch_max.ch5_max
            }
            if (this.ch_max_val.ch6_max_val <= this.ch_max.ch6_max) {
                this.ch_max_val.ch6_max_val = this.ch_max.ch6_max
            }
            if (this.ch_max_val.ch7_max_val <= this.ch_max.ch7_max) {
                this.ch_max_val.ch7_max_val = this.ch_max.ch7_max
            }
            if (this.ch_max_val.ch8_max_val <= this.ch_max.ch8_max) {
                this.ch_max_val.ch8_max_val = this.ch_max.ch8_max
            }
            if (this.ch_max_val.ch9_max_val <= this.ch_max.ch9_max) {
                this.ch_max_val.ch9_max_val = this.ch_max.ch9_max
            }
            if (this.ch_max_val.ch10_max_val <= this.ch_max.ch10_max) {
                this.ch_max_val.ch10_max_val = this.ch_max.ch10_max
            }
            if (this.ch_max_val.ch11_max_val <= this.ch_max.ch11_max) {
                this.ch_max_val.ch11_max_val = this.ch_max.ch11_max
            }
            if (this.ch_max_val.ch12_max_val <= this.ch_max.ch12_max) {
                this.ch_max_val.ch12_max_val = this.ch_max.ch12_max
            }
            if (this.ch_max_val.ch13_max_val <= this.ch_max.ch13_max) {
                this.ch_max_val.ch13_max_val = this.ch_max.ch13_max
            }
            if (this.ch_max_val.ch14_max_val <= this.ch_max.ch14_max) {
                this.ch_max_val.ch14_max_val = this.ch_max.ch14_max
            }
            if (this.ch_max_val.ch15_max_val <= this.ch_max.ch15_max) {
                this.ch_max_val.ch15_max_val = this.ch_max.ch15_max
            }
            if (this.ch_max_val.ch16_max_val <= this.ch_max.ch16_max) {
                this.ch_max_val.ch16_max_val = this.ch_max.ch16_max
            }
            if (this.ch_min_val.ch1_min_val >= this.ch_min.ch1_min) {
                this.ch_min_val.ch1_min_val = this.ch_min.ch1_min
            }
            if (this.ch_min_val.ch2_min_val <= this.ch_min.ch2_min) {
                this.ch_min_val.ch2_min_val = this.ch_min.ch2_min
            }
            if (this.ch_min_val.ch3_min_val <= this.ch_min.ch3_min) {
                this.ch_min_val.ch3_min_val = this.ch_min.ch3_min
            }
            if (this.ch_min_val.ch4_min_val >= this.ch_min.ch4_min) {
                this.ch_min_val.ch4_min_val = this.ch_min.ch4_min
            }
            if (this.ch_min_val.ch5_min_val >= this.ch_min.ch5_min) {
                this.ch_min_val.ch5_min_val = this.ch_min.ch5_min
            }
            if (this.ch_min_val.ch6_min_val >= this.ch_min.ch6_min) {
                this.ch_min_val.ch6_min_val = this.ch_min.ch6_min
            }
            if (this.ch_min_val.ch7_min_val >= this.ch_min.ch7_min) {
                this.ch_min_val.ch7_min_val = this.ch_min.ch7_min
            }
            if (this.ch_min_val.ch8_min_val >= this.ch_min.ch8_min) {
                this.ch_min_val.ch8_min_val = this.ch_min.ch8_min
            }
            if (this.ch_min_val.ch9_min_val >= this.ch_min.ch9_min) {
                this.ch_min_val.ch9_min_val = this.ch_min.ch9_min
            }
            if (this.ch_min_val.ch10_min_val >= this.ch_min.ch10_min) {
                this.ch_min_val.ch10_min_val = this.ch_min.ch10_min
            }
            if (this.ch_min_val.ch11_min_val >= this.ch_min.ch11_min) {
                this.ch_min_val.ch11_min_val = this.ch_min.ch11_min
            }
            if (this.ch_min_val.ch12_min_val >= this.ch_min.ch12_min) {
                this.ch_min_val.ch12_min_val = this.ch_min.ch12_min
            }
            if (this.ch_min_val.ch13_min_val >= this.ch_min.ch13_min) {
                this.ch_min_val.ch13_min_val = this.ch_min.ch13_min
            }
            if (this.ch_min_val.ch14_min_val >= this.ch_min.ch14_min) {
                this.ch_min_val.ch14_min_val = this.ch_min.ch14_min
            }
            if (this.ch_min_val.ch15_min_val >= this.ch_min.ch15_min) {
                this.ch_min_val.ch15_min_val = this.ch_min.ch15_min
            }
            if (this.ch_min_val.ch16_min_val >= this.ch_min.ch16_min) {
                this.ch_min_val.ch16_min_val = this.ch_min.ch16_min
            }
        },
        finish_cali() {
            this.$store.state.MinMaxTrim[0].value = this.ch_max_val.ch1_max_val
            this.$store.state.MinMaxTrim[1].value = this.ch_max_val.ch2_max_val
            this.$store.state.MinMaxTrim[2].value = this.ch_max_val.ch3_max_val
            this.$store.state.MinMaxTrim[3].value = this.ch_max_val.ch4_max_val
            this.$store.state.MinMaxTrim[4].value = this.ch_max_val.ch5_max_val
            this.$store.state.MinMaxTrim[5].value = this.ch_max_val.ch6_max_val
            this.$store.state.MinMaxTrim[6].value = this.ch_max_val.ch7_max_val
            this.$store.state.MinMaxTrim[7].value = this.ch_max_val.ch8_max_val
            this.$store.state.MinMaxTrim[8].value = this.ch_max_val.ch9_max_val
            this.$store.state.MinMaxTrim[9].value = this.ch_max_val.ch10_max_val
            this.$store.state.MinMaxTrim[10].value = this.ch_max_val.ch11_max_val
            this.$store.state.MinMaxTrim[11].value = this.ch_max_val.ch12_max_val
            this.$store.state.MinMaxTrim[12].value = this.ch_max_val.ch13_max_val
            this.$store.state.MinMaxTrim[13].value = this.ch_max_val.ch14_max_val
            this.$store.state.MinMaxTrim[14].value = this.ch_max_val.ch15_max_val
            this.$store.state.MinMaxTrim[15].value = this.ch_max_val.ch16_max_val

            // FC로 Min, Max, Trim 파라미터 전달
            // UI 재설정
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
    left: 230px;
    top: -9px;
}

.Maxline {
    position: fixed;
    left: 242px;
    top: 48px;
    width: 90.5%;
}

.Minline {
    position: fixed;
    left: 242px;
    top: 48px;
    width: 90.5%;
}

</style>
