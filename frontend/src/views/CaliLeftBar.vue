<template>
    <div>
        <div class='calileft'>
            <h4 class="white--text mx-2 mt-n16">설정할 드론</h4>
            <v-data-table
                v-if="Object.keys(this.$store.state.control_drone).length > 0"
                :headers="drone_header"
                :items="drone_list"
                item-key="name"
                hide-default-header
                hide-default-footer
                class="control_drone_name elevation-1 mx-2 mt-5"
                light>
                <template v-slot:item.icon="{ item }">
                    <v-progress-circular
                        class="control_drone_icon mt-n1"
                        v-if="$store.state.control_drone[item.name].status === 'ready' && $store.state.control_drone[item.name].status !== 'RF'"
                        indeterminate
                        color="primary"
                        :size="25"
                    ></v-progress-circular>
                    <font-awesome-icon
                        :id="`status_${item.name}`"
                        class="control_drone_icon mt-n1 v-avatar--metronome"
                        v-if="$store.state.control_drone[item.name].status !== 'ready' && $store.state.control_drone[item.name].status !== 'RF'"
                        :icon="iconName(item)"
                        :style="{color:iconColor(item), animationDuration: iconDuration(item)}"
                        size="1x"/>
                    <thead v-if="$store.state.control_drone[item.name].status === 'RF'">
                    <tr>
                        <th class="text-left">
                            RF
                        </th>
                    </tr>
                    </thead>
                </template>
            </v-data-table>
            <h4 class="white--text mx-2 mt-4">RC Calibration</h4>
            <v-data-table
                :headers="header"
                :items="calibrated_value"
                item-key="name"
                hide-default-header
                hide-default-footer
                v-model="params_selected"
                class=" elevation-1 mx-2 mt-5"
                light
                :items-per-page="calibrated_value.length"
                style="max-height: 70%;overflow: auto;font-size: 15px"
                @click:row="rowClicked">
                <!--                <template v-slot:item.channel="{ item }">-->
                <!--                    <span style="width: 20px;font-weight: bold">{{ item.channel }}</span>-->
                <!--                </template>-->
                <!--                -->
                <template v-slot:item="{ item }">
                    <tr :class="params_selected.indexOf(item.channel)>-1?'grey darken-1':''" @click="rowClicked(item)">
                        <td>{{ item.channel }}</td>
                        <td>{{ item.value }}</td>
                    </tr>
                </template>
            </v-data-table>
            <h4 class="white--text mx-2 mt-4">Change value</h4>
            <h5
                class="white--text mx-2 mt-4"
                v-if="params_selected.length === 0"
            >위에서 변경할 파라미터를 선택하세요.</h5>
            <v-text-field
                v-if="!(params_selected.length === 0)"
                class="custom-placeholer-color mx-2"
                dense
                ref="drone"
                v-model="ChangeValue" :rules="ChangeValue_rule"
                placeholder=""
                label="Change param value*"
                required
                filled
                height="60"
                style="font-size: 25px;"
                background-color="white"
            ></v-text-field>
            <v-row class="mx-2" align="center" justify="space-around">
                <v-col cols="6" v-if="!(params_selected.length === 0)"
                >
                    <v-btn
                        fab
                        height="45"
                        width="100"
                        class="mt-2 rounded-lg"
                        @click="EditRCParams"
                        elevation="5"
                        style="font-size: 20px;font-weight: bold"
                        color="white"
                    > edit
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn
                        fab
                        height="45"
                        width="100"
                        class="mt-2 rounded-lg"
                        @click="WirteRCParams"
                        elevation="5"
                        style="font-size: 20px;font-weight: bold"
                        color="primary"
                    > Write
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
import mavlink, {MAVLink} from "../mavlibrary/mavlink";

export default {
    name: 'CalieftBar',
    data() {
        return {
            MOBIUS_CONNECTION_CONNECTED: localStorage.getItem('mobius_connected') ? (localStorage.getItem('mobius_connected') === 'true') : false,

            ChangeValue: '',
            ChangeValue_rule: [
                v => !!v || '변경하지 않을 경우 선택을 취소하세요.',
                v => !!/[0-9]/.test(v) || '숫자를 입력하세요.',
                v => !!(v && parseInt(v) > 799) || 'RC 값의 범위는 800에서 2200 사이입니다.',
                v => !!(v && parseInt(v) < 2201) || 'RC 값의 범위는 800에서 2200 사이입니다.',
            ],

            selectedItem: 1,
            header: [
                {
                    text: 'channel',
                    align: 'center',
                    sortable: false,
                    value: 'channel',
                },
                {
                    text: 'value',
                    align: 'center',
                    sortable: false,
                    value: 'value',
                },
                {
                    text: 'empty',
                    align: 'center',
                    sortable: false,
                    value: 'empty',
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
            ],
            params_selected: [],

            set_param: {},

            drone_header: [
                {
                    text: 'name',
                    align: 'center',
                    sortable: true,
                    value: 'name',
                },
                {
                    text: 'icon',
                    align: 'center',
                    sortable: false,
                    value: 'icon',
                }
            ],
            drone_list: []
        }
    },
    methods: {
        cali_val() {
            this.calibrated_value = this.$store.state.MinMaxTrim
        },
        rowClicked(row) {
            if (this.params_selected.includes(row.channel)) {
                this.params_selected = this.params_selected.filter(
                    selectedKeyID => selectedKeyID !== row.channel
                );
            } else {
                this.params_selected.push(row.channel);
            }
        },
        EditRCParams() {
            this.params_selected.forEach((paramName) => {
                this.calibrated_value.forEach((param) => {
                    if (param.channel === paramName) {
                        param.value = this.ChangeValue
                    } else {
                        return
                    }
                })
            })
        },
        UpdateTable(drone) {
            if (this.drone_list.length === 0) {
                this.drone_list.push(drone)
            } else {
                for (let idx in this.drone_list) {
                    if (this.drone_list[idx].name === drone) {
                        this.drone_list[idx].icon = this.$store.state.control_drone[drone].icon
                        this.drone_list[idx].status = this.$store.state.control_drone[drone].status
                        this.drone_list[idx].bpmcolor = this.$store.state.control_drone[drone].bpmcolor
                    }
                }
            }
        },
        iconName(item) {
            if (this.$store.state.control_drone[item.name].status === 'disconnected') {
                this.$store.state.control_drone[item.name].icon = 'unlink'
            } else if (this.$store.state.control_drone[item.name].status === 'ready') {
                this.$store.state.control_drone[item.name].icon = 'spinner'
            } else if (this.$store.state.control_drone[item.name].status === 'connected') {
                this.$store.state.control_drone[item.name].icon = 'link'
            } else if (this.$store.state.control_drone[item.name].status === 'send') {
                if (this.$store.state.control_drone[item.name].bpm < 5) {
                    this.$store.state.control_drone[item.name].icon = 'exclamation-triangle'
                } else if (this.$store.state.control_drone[item.name].bpm < 9) {
                    this.$store.state.control_drone[item.name].icon = 'play'
                } else if (this.$store.state.control_drone[item.name].bpm < 12) {
                    this.$store.state.control_drone[item.name].icon = 'circle'
                }
            } else if (this.$store.state.control_drone[item.name].status === 'disabled') {
                this.$store.state.control_drone[item.name].icon = 'times-circle'
            } else {
                this.$store.state.control_drone[item.name].icon = 'exclamation-circle'
            }
            return this.$store.state.control_drone[item.name].icon
        },
        iconColor(item) {
            if (this.$store.state.control_drone[item.name].status === 'disconnected') {
                this.$store.state.control_drone[item.name].bpmcolor = 'orange'
            } else if (this.$store.state.control_drone[item.name].status === 'connected') {
                this.$store.state.control_drone[item.name].bpmcolor = 'black'
            } else if (this.$store.state.control_drone[item.name].status === 'ready') {
                this.$store.state.control_drone[item.name].bpmcolor = 'blue'
            } else if (this.$store.state.control_drone[item.name].status === 'send') {
                if (this.$store.state.control_drone[item.name].bpm < 5) {
                    this.$store.state.control_drone[item.name].bpmcolor = 'grey'
                } else if (this.$store.state.control_drone[item.name].bpm < 9) {
                    this.$store.state.control_drone[item.name].bpmcolor = 'orange'
                } else if (this.$store.state.control_drone[item.name].bpm < 12) {
                    this.$store.state.control_drone[item.name].bpmcolor = 'lime'
                }
            } else if (this.$store.state.control_drone[item.name].status === 'disabled') {
                this.$store.state.control_drone[item.name].bpmcolor = 'red'
            } else {
                this.$store.state.control_drone[item.name].bpmcolor = 'red'
            }
            this.UpdateTable(item.name)
            return this.$store.state.control_drone[item.name].bpmcolor
        },
        iconDuration(item) {
            return (2 / this.$store.state.control_drone[item.name].bpm).toString() + 's'
        },
        mavlinkGenerateMessage(src_sys_id, src_comp_id, type, params) {
            const mavlinkParser = new MAVLink(null/*logger*/, src_sys_id, src_comp_id, this.$store.state.mavVersion);
            try {
                var mavMsg = null;
                var genMsg = null;

                switch (type) {
                    case mavlink.MAVLINK_MSG_ID_PARAM_SET:
                        mavMsg = new mavlink.messages.param_set(
                            params.target_system,
                            params.target_component,
                            params.param_id,
                            params.param_type,
                            params.param_value
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
        WirteRCParams() {
            if (this.$store.state.client.connected) {
                Object.keys(this.$store.state.control_drone).forEach((dName) => {
                    if (this.$store.state.control_drone[dName].selected) {
                        // if ((this.$store.state.control_drone[dName].status === 'ready') || (this.$store.state.control_drone[dName].status === 'connected') || (this.$store.state.control_drone[dName].status === 'send')) {
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/GCS_Data/' + dName


                        this.calibrated_value.forEach((params) => {
                            this.set_param.target_system = this.$store.state.control_drone[dName].system_id
                            this.set_param.target_component = 1
                            this.set_param.param_id = params.channel
                            this.set_param.param_type = mavlink.MAV_PARAM_TYPE_INT8
                            this.set_param.param_value = params.value

                            try {
                                let rc_param = this.mavlinkGenerateMessage(255, 0xbe, mavlink.MAVLINK_MSG_ID_PARAM_SET, this.set_param);
                                if (rc_param == null) {
                                    console.log("mavlink message is null");
                                } else {
                                    // console.log(dName + '\n' + rc_param.toString('hex'))
                                    this.$store.state.client.publish(topic, rc_param);
                                }
                            } catch (ex) {
                                console.log('[ERROR] ' + ex);
                            }
                        })
                        // }
                    }
                })
            }
        },
    },
    mounted() {
        // TODO: FC의 각 채널별 Min, Max, Trim 파라미터 로드

        setInterval(this.cali_val, 3 * 1000)

        Object.keys(this.$store.state.control_drone).forEach((dName) => {
            console.log(dName, this.$store.state.control_drone[dName].selected)
            if (this.$store.state.control_drone[dName].selected) {
                let drone = {}
                drone.name = dName
                drone.icon = this.$store.state.control_drone[dName].icon
                drone.status = this.$store.state.control_drone[dName].status
                drone.bpmcolor = this.$store.state.control_drone[dName].bpmcolor
                this.drone_list.push(drone)
            }
        })

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
    width: 310px;
    height: 100%;
    background: rgb(39, 39, 40);
    padding: 150px 0;
    overflow: hidden;
}

.v-data-table td {
    font-size: 20px !important;
    width: 1%;
}

.v-data-table text-center {
    width: 1%;
}

.theme--light.v-data-table tbody tr.v-data-table__selected {
    background: rgb(75, 75, 75) !important;
}

.theme--light.v-data-table tbody tr.v-data-table__selected:hover {
    background: rgb(124, 124, 124) !important;
}

</style>

<style scoped>

hr {
    color: white;
    padding-top: 3px;
}

.v-text-field >>> label {
    font-size: 0.8em;
}

</style>
