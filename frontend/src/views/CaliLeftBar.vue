<template>
    <div>
        <div class='calileft'>
            <h4 class="white--text mx-2">RC Calibration</h4>
            <v-row class="" justify="center">
            </v-row>
        </div>
    </div>
</template>
<script>
import EventBus from "../EventBus";

export default {
    name: 'CalieftBar',
    data() {
        return {
            MOBIUS_CONNECTION_CONNECTED: localStorage.getItem('mobius_connected') ? (localStorage.getItem('mobius_connected') === 'true') : false,

            add_drone: "",
            add_drone_rule: [
                v => !!v || 'Drone 이름은 필수 입력사항입니다.',
                v => !/[~!@#$%^&*()+|<>?:{}]/.test(v) || 'Drone 이름에는 특수문자를 사용할 수 없습니다.'
            ],
            selectedItem: 1,
            header: [
                {
                    text: 'channel',
                    align: 'center',
                    sortable: true,
                    value: 'channel',
                },
                {
                    text: 'value',
                    align: 'center',
                    sortable: true,
                    value: 'value',
                }
            ],
            calibrated_value: [
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
        }
    },
    methods: {
        cali_val() {
            this.calibrated_value = this.$store.state.MinMaxTrim
        }
    },
    mounted() {
        EventBus.$on('update-cali-table', () => {
            this.cali_val();
        });
    },
    beforeDestroy() {
        this.add_drone = ""
        if (this.timer_id) {
            clearInterval(this.timer_id);
        }
        for (let idx in this.drone_list) {
            let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx] + '/conn'
            this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
        }
        this.drone_list = []
    }
}
</script>

<style>
a {
    color: black
}

a:hover {
    color: rgb(39, 39, 40);
}

.calileft {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 200px;
    height: 100%;
    background: rgb(39, 39, 40);
    padding: 150px 0;
    overflow: hidden;
}

.theme--light.v-data-table tbody tr.v-data-table__selected {
    background: rgb(75, 75, 75) !important;
}

.theme--light.v-data-table tbody tr.v-data-table__selected:hover {
    background: rgb(124, 124, 124) !important;
}

.aside-line {
    display: block;
    width: calc(100% + 10px);
    margin: 24px -5px 6px -5px;
    border-bottom: 3px solid rgb(127, 130, 139);
}

@keyframes metronome-example {
    from {
        transform: scale(.5);
    }

    to {
        transform: scale(1);
    }
}

.v-avatar--metronome {
    animation-name: metronome-example;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    position: relative;
    opacity: 1; /* for demo purpose  */
}
</style>

<style scoped>
.v-text-field--outlined {
    border-color: rgb(255, 255, 255);
    border-width: 3px;
}

hr {
    color: white;
    padding-top: 3px;
}

</style>
