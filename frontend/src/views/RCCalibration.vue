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
    </v-container>
</template>

<script>
import CaliLeftBar from "../views/CaliLeftBar";

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
            reverse_roll: false,
            reverse_pitch: false,
            reverse_throttle: false,
            reverse_yaw: false,
        }
    },

    methods: {},
    mounted() {

    }
}
</script>

<style>
.cali {
    position: absolute;
    left: 230px;
}
</style>
