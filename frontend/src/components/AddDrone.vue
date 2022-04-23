<template>
    <div>
        <div class='left'>
            <v-row class="ml-2 white--text font-weight-bold" style="font-size: 25px">
                TYPE
            </v-row>
            <v-row align="center" justify="center" class="mt-n5 white--text font-weight-bold" style="font-size: 20px;">
                <v-col cols="5" align="end">
                    LTE
                </v-col>
                <v-col cols="2" align="start">
                    <v-switch
                        v-model="COM_PROTOCOL_TYPE"
                        inset
                        color="success"
                    ></v-switch>
                </v-col>
                <v-col cols="5" align="start">
                    RF
                </v-col>
            </v-row>
            <v-row
                v-if="!COM_PROTOCOL_TYPE"
                class="ml-2 white--text font-weight-bold" style="font-size: 25px">
                MAVLink Version
            </v-row>
            <v-row
                v-if="!COM_PROTOCOL_TYPE"
                class="mx-1 mb-2">
                <v-col>
                    <v-select
                        class="text-h5"
                        v-model="mavVersion"
                        :items="mavVersions"
                        @change="selectedMavVersion($event)"
                        dark outlined flat hide-details
                    ></v-select>
                </v-col>
            </v-row>
            <div
                v-if="!COM_PROTOCOL_TYPE"
                class="my-4 aside-line"></div>
            <v-row
                v-if="!COM_PROTOCOL_TYPE"
                class="ml-2 white--text font-weight-bold" style="font-size: 22px">
                Drone Name
            </v-row>
            <v-text-field
                v-if="!COM_PROTOCOL_TYPE"
                class="custom-placeholer-color mx-2 mt-5"
                dense
                ref="drone"
                v-model="add_drone" :rules="add_drone_rule"
                placeholder=""
                label="Drone Name*"
                required
                filled
                height="60"
                style="font-size: 25px;"
                background-color="white"
            ></v-text-field>
            <v-row
                v-if="!COM_PROTOCOL_TYPE"
                class="mt-n2" align="center" justify="space-around">
                <v-btn
                    fab
                    height="45"
                    width="100"
                    class="mt-2 rounded-lg"
                    @click="DroneADD"
                    elevation="5"
                    style="font-size: 20px;font-weight: bold"
                    color="success"
                > ADD
                </v-btn>
            </v-row>
            <div
                v-if="!COM_PROTOCOL_TYPE"
                class="mt-8 aside-line"></div>
            <v-row
                v-if="!COM_PROTOCOL_TYPE"
                class="mt-4 ml-2 white--text font-weight-bold" style="font-size: 22px">
                Drone List
            </v-row>
            <v-data-table
                v-if="!COM_PROTOCOL_TYPE && drone_list.length > 0"
                :headers="header"
                :items="drone_list"
                item-key="name"
                hide-default-header
                hide-default-footer
                class="control_drone_name elevation-1 mx-2 mt-5"
                light
                @click:row="rowClicked">
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
            <v-row
                v-if="!COM_PROTOCOL_TYPE"
                class="mt-1" align="center" justify="space-around">
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="45"
                    width="100"
                    class="mt-2 rounded-lg"
                    @click="DroneDELETE"
                    elevation="5"
                    color="error"
                    style="font-size: 20px;font-weight: bold"
                    :disabled="!MOBIUS_CONNECTION_CONNECTED"
                > Delete
                </v-btn>
            </v-row>
            <v-row
                v-if="!COM_PROTOCOL_TYPE"
                align="center" justify="space-around">
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="45"
                    width="100"
                    class="mt-2 rounded-lg"
                    @click="link"
                    elevation="5"
                    color="primary"
                    style="font-size: 20px;font-weight: bold"
                    :disabled="!MOBIUS_CONNECTION_CONNECTED"
                > Link
                </v-btn>
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="45"
                    width="100"
                    class="mt-2 rounded-lg"
                    @click="unlink"
                    elevation="5"
                    style="font-size: 20px;font-weight: bold"
                    :disabled="!MOBIUS_CONNECTION_CONNECTED"
                > Unlink
                </v-btn>
            </v-row>
            <v-row
                v-if="COM_PROTOCOL_TYPE"
                class="ml-2 mb-3 white--text font-weight-bold" style="font-size: 22px">
                RF Protocol
            </v-row>
            <v-row
                v-if="COM_PROTOCOL_TYPE"
                align="center" justify="center" class="mt-n5 white--text font-weight-bold" style="font-size: 20px;">
                <v-col cols="5" align="end">
                    UDP
                </v-col>
                <v-col cols="2" align="start">
                    <v-switch
                        v-model="rfType"
                        inset
                        color="red"
                    ></v-switch>
                </v-col>
                <v-col cols="5" align="start">
                    Serial
                </v-col>
            </v-row>
            <div v-if="COM_PROTOCOL_TYPE" class="mt-2 aside-line"></div>
            <v-row
                v-if="COM_PROTOCOL_TYPE && !rfType"
                class="mt-2 mx-2" justify="center">
                <v-row
                    class="mx-2 white--text font-weight-bold" style="font-size: 22px">
                    UDP Address
                </v-row>
                <v-text-field
                    class="custom-placeholer-color mx-2 mt-4"
                    dense
                    ref="drone"
                    v-model="UDPServerIP" :rules="UDPServerIP_rule"
                    placeholder=""
                    label="UDP server address*"
                    required
                    filled
                    height="60"
                    style="font-size: 25px;"
                    background-color="white"
                ></v-text-field>
                <v-data-table
                    v-if="COM_PROTOCOL_TYPE && !rfType && udp_list.length > 0"
                    :headers="udp_header"
                    :items="udp_list"
                    item-key="name"
                    hide-default-header
                    hide-default-footer
                    class="control_drone_name elevation-1 mx-2 mt-n2"
                    @click:row="UDProwClicked">
                    <template v-slot:item.delete="{ item }">
                        <v-btn
                            fab
                            height="40"
                            width="50"
                            class="rounded-lg"
                            @click="setUDPServer(item, true)"
                            elevation="5"
                            style="font-size: 20px;font-weight: bold"
                            color="error"
                        >
                            <font-awesome-icon
                                class="control_drone_icon mt-n1 v-avatar--metronome"
                                icon="trash"
                                style="color: white"
                                size="2x"/>
                        </v-btn>
                    </template>
                </v-data-table>
                <v-row v-if="COM_PROTOCOL_TYPE && !rfType" align="center" justify="space-around">
                    <v-btn
                        fab
                        height="45"
                        width="170"
                        class="mt-2 rounded-lg"
                        @click="setUDPServer(UDPServerIP)"
                        elevation="5"
                        style="font-size: 20px;font-weight: bold"
                        color="success"
                    > ADD Server
                    </v-btn>
                </v-row>
                <v-row
                    v-if="COM_PROTOCOL_TYPE"
                    align="center" justify="space-around">
                    <v-btn
                        v-if="!rfType"
                        fab
                        height="45"
                        width="100"
                        class="mt-2 rounded-lg"
                        @click="RFlink"
                        elevation="5"
                        color="primary"
                        style="font-size: 20px;font-weight: bold"
                    > Link
                    </v-btn>
                    <v-btn
                        v-if="!rfType"
                        fab
                        height="45"
                        width="100"
                        class="mt-2 rounded-lg"
                        @click="RFunlink"
                        elevation="5"
                        style="font-size: 20px;font-weight: bold"
                    > Unlink
                    </v-btn>
                </v-row>
            </v-row>
            <v-row
                v-if="COM_PROTOCOL_TYPE && rfType"
                class="mt-2 mx-2" justify="center">
                <!--                <v-menu-->
                <!--                    bottom offset-y>-->
                <!--                    <template v-slot:activator="{ on, attrs }">-->
                <!--                        <v-btn-->
                <!--                            v-if="$store.state.UDP_connection !== 'connect'"-->
                <!--                            class="mb-16"-->
                <!--                            style="font-size: 20px; font-weight: bold"-->
                <!--                            width="60%"-->
                <!--                            height="50"-->
                <!--                            color="primary"-->
                <!--                            dark-->
                <!--                            v-bind="attrs"-->
                <!--                            v-on="on"-->
                <!--                        >-->
                <!--                            Select Serial-->
                <!--                        </v-btn>-->
                <!--                    </template>-->
                <!--                    <v-list>-->
                <!--                        <v-list-item-->
                <!--                            v-for="(item, index) in SerialPortsList"-->
                <!--                            :key="index"-->
                <!--                            @click="RFSerialPort(SerialPortsList[index].title)"-->
                <!--                        >-->
                <!--                            <v-list-item-title-->
                <!--                                style="font-size: 18px"-->
                <!--                            >{{ item.title }} {{ item.status }}-->
                <!--                            </v-list-item-title>-->
                <!--                        </v-list-item>-->
                <!--                    </v-list>-->
                <!--                </v-menu>-->
                <v-row
                    class="mx-2 white--text font-weight-bold" style="font-size: 22px">
                    Serial Port
                </v-row>
                <v-text-field
                    v-if="rfType"
                    class="custom-placeholer-color mt-4 mx-2"
                    dense
                    ref="drone"
                    v-model="SerialPort" :rules="SerialPort_rule"
                    placeholder=""
                    label="Serial Port*"
                    required
                    filled
                    height="60"
                    style="font-size: 25px;"
                    background-color="white"
                ></v-text-field>
                <v-row
                    class="mt-n4 mx-2 white--text font-weight-bold" style="font-size: 22px">
                    Baud Rate
                </v-row>
                <v-text-field
                    v-if="rfType"
                    class="custom-placeholer-color mt-4 mx-2"
                    dense
                    ref="drone"
                    v-model="SerialBaudRate" :rules="SerialBaudRate_rule"
                    placeholder=""
                    label="Serial Baud Rate*"
                    required
                    filled
                    height="60"
                    style="font-size: 25px;"
                    background-color="white"
                ></v-text-field>
            </v-row>
            <v-row
                v-if="COM_PROTOCOL_TYPE"
                align="center" justify="space-around">
                <v-btn
                    v-if="rfType"
                    fab
                    height="45"
                    width="110"
                    class="mt-2 rounded-lg"
                    @click="SerialConnect(true)"
                    elevation="5"
                    color="primary"
                    style="font-size: 18px;font-weight: bold"
                > Connect
                </v-btn>
                <v-btn
                    v-if="rfType"
                    fab
                    height="45"
                    width="140"
                    class="mt-2 rounded-lg"
                    @click="SerialConnect(false)"
                    elevation="5"
                    style="font-size: 18px;font-weight: bold"
                > Disconnect
                </v-btn>
            </v-row>
            <div class="mt-8 mb-4 aside-line"></div>
        </div>
    </div>
</template>
<script>
import EventBus from "../EventBus";
import axios from "axios";
// import {mixin as VueTimers} from "vue-timers";

export default {
    name: 'AddDrone',
    data() {
        return {
            MOBIUS_CONNECTION_CONNECTED: (localStorage.getItem('mobius_connected') === 'true') ? localStorage.getItem('mobius_connected') : false,

            COM_PROTOCOL_TYPE: this.$store.state.TYPE,

            add_drone: "",
            add_drone_rule: [
                v => !!v || 'Drone 이름은 필수 입력사항입니다.',
                v => !/[~!@#$%^&*()+|<>?:{}]/.test(v) || 'Drone 이름에는 특수문자를 사용할 수 없습니다.'
            ],
            header: [
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
            drone_list: JSON.parse(localStorage.getItem('control_dronelist')) ? JSON.parse(localStorage.getItem('control_dronelist')) : [],
            drone_selected: [],
            rc_hub_status: ['disconnected', 'ready', 'connected', 'send', 'disabled'],

            mavVersion: 'v1',
            mavVersions: ['v1', 'v2'],

            rfType: false,

            UDPServerIP: '',
            UDPServerIP_rule: [
                v => !!v || '서버 주소는 필수 입력사항입니다.',
                v => !/[~!@#$%^&*()+|<>?{}]/.test(v) || '서버 주소에는 특수문자를 사용할 수 없습니다.',
                v => !!/[:]/.test(v) || '올바른 서버 주소가 아닙니다.',
                v => !!(v && (v.split('.')).length === 4 || v.includes('localhost')) || '올바른 서버 주소가 아닙니다.',
            ],
            udp_header: [
                {
                    text: 'name',
                    align: 'center',
                    sortable: true,
                    value: 'name',
                },
                {
                    text: 'delete',
                    align: 'center',
                    sortable: true,
                    value: 'delete',
                }
            ],
            udp_list: JSON.parse(localStorage.getItem('RF_udp_list')) ? JSON.parse(localStorage.getItem('RF_udp_list')) : [],

            SerialPortsList: [],
            SerialPort: '',
            SerialPort_rule: [
                v => !!v || '포트 설정은 필수입니다.',
                v => !/[~!@#$%^&*()+|<>?{}]/.test(v) || '포트 이름에는 특수문자를 사용할 수 없습니다.',
                v => !!/[COM]/.test(v) || '올바른 포트가 아닙니다.'
            ],
            SerialBaudRate: 115200,
            SerialBaudRate_rule: [
                v => !!v || 'Baud Rate는 필수 입력사항입니다.',
                v => /^[0-9]*$/.test(v) || 'Baud Rate에는 숫자만 입력할 수 있습니다.'
            ],
        }
    },
    // mixins: [VueTimers],
    // timers: {
    //     SerialPorts: {time: 2000, repeat: true},
    // },
    methods: {
        selectedMavVersion: function (event) {
            // console.log("selectedMavVersion", event)
            this.mavVersion = event;
            this.$store.state.mavVersion = event;

            localStorage.setItem('mavVersion', this.mavVersion);
        },
        DroneADD() {
            let drone = {}
            drone.name = this.add_drone
            drone.icon = 'times-circle'
            drone.status = 'disabled'
            drone.bpm = 1
            drone.bpmcolor = 'red'
            drone.recv_counter = 1
            drone.system_id = 1
            this.drone_list.push(drone)

            localStorage.setItem('control_dronelist', JSON.stringify(this.drone_list));

            this.$store.state.control_drone[drone.name] = {
                icon: 'times-circle',
                status: 'disabled',
                bpm: 1,
                bpmcolor: 'red',
                recv_counter: 1,
                system_id: 1,
                timer_id: setInterval(() => {
                    this.$store.state.control_drone[drone.name].bpm = this.$store.state.control_drone[drone.name].recv_counter;
                    this.$store.state.control_drone[drone.name].recv_counter = 1;
                    if (this.$store.state.control_drone[drone.name].bpm === 1) {
                        this.$store.state.control_drone[drone.name].icon = 'unlink'
                        this.$store.state.control_drone[drone.name].status = 'disconnected'
                        this.UpdateTable(drone.name)
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + drone.name + '/conn'
                        if (this.$store.state.client.connected) {
                            this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
                        } else {
                            console.log('disconnected with Mobius')
                        }
                    } else if (this.$store.state.control_drone[drone.name].bpm < 5) {
                        this.$store.state.control_drone[drone.name].icon = 'exclamation-triangle'
                    } else if (this.$store.state.control_drone[drone.name].bpm < 9) {
                        this.$store.state.control_drone[drone.name].icon = 'play'
                    } else if (this.$store.state.control_drone[drone.name].bpm < 12) {
                        this.$store.state.control_drone[drone.name].icon = 'circle'
                    }
                }, 10000)
            }

            localStorage.setItem('control_drone_list', JSON.stringify(this.$store.state.control_drone));

            let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + drone.name + '/status'
            let qos = 0
            if (this.$store.state.client.connected) {
                this.$store.state.client.unsubscribe(topic)
                this.$store.state.client.subscribe(topic, {qos}, (error, res) => {
                    if (error) {
                        console.log('Subscribe to topics error', error)
                    }
                    this.subscribeSuccess = true
                    console.log('Subscribe to topics res', res)
                })
            } else {
                console.log('disconnected with Mobius')
            }
        },
        DroneDELETE() {
            for (let select = this.drone_selected.length; select > 0; select--) {
                for (let idx = this.drone_list.length; idx > 0; idx--) {
                    if (this.drone_list[idx - 1].name === this.drone_selected[select - 1]) {
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx - 1].name + '/status'
                        try {
                            this.$store.state.client.unsubscribe(topic)
                            topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx - 1].name + '/conn'
                            this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
                        } catch (e) {
                            console.log('Disconnected with server')
                        }

                        clearInterval(this.$store.state.control_drone[this.drone_list[idx - 1].name].timer_id)

                        delete this.$store.state.control_drone[this.drone_list[idx - 1].name]
                        this.drone_list.splice(idx - 1, 1)
                        this.drone_selected.splice(select - 1, 1)
                    }
                }
            }
            localStorage.setItem('control_dronelist', JSON.stringify(this.drone_list));
            localStorage.setItem('control_drone_list', JSON.stringify(this.$store.state.control_drone));
        },
        rowClicked: function (item, row) {
            let selectState = (row.isSelected) ? false : true
            row.select(selectState)
            if (!selectState) {
                this.drone_selected = this.drone_selected.filter(
                    selectedKeyID => selectedKeyID !== row.item.name)
                this.$store.state.control_drone[row.item.name].selected = false
            } else {
                this.drone_selected.push(row.item.name)
                this.$store.state.control_drone[row.item.name].selected = true
            }
        },
        link() {
            if (this.$store.state.client.connected) {
                for (let idx in this.drone_selected) {
                    if (this.$store.state.control_drone[this.drone_selected[idx]].status === 'ready') {
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_selected[idx] + '/conn'
                        this.$store.state.client.publish(topic, Buffer.from(this.$store.state.VUE_APP_MOBIUS_RC))
                    }
                }
            }
        },
        unlink() {
            if (this.$store.state.client.connected) {
                for (let idx in this.drone_selected) {
                    let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_selected[idx] + '/conn'
                    this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
                }
            }
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
        RFlink() {
            let res_flag = false
            if (this.$store.state.udp_selected.length > 0) {
                this.$store.state.udp_selected.forEach((udpHostPort) => {
                    udpHostPort = udpHostPort.replace('\t', '')
                    let serverip = udpHostPort.split(':')
                    axios.post('http://localhost:3000/rfflag', {
                        "connection": 'connect',
                        "host": serverip[0],
                        "port": serverip[1]
                    })
                        .then((response) => {
                                if (!res_flag) {
                                    EventBus.$emit('log_update', response.data)
                                    this.$store.state.UDP_connection[udpHostPort] = 'connect'
                                    res_flag = true
                                } else {
                                    res_flag = false
                                }
                            }
                        ).catch((e) => {
                            console.log("Could not send UDP 'connect' message")
                            EventBus.$emit('log_update', "UDP 연결이 불가능합니다.")
                            console.log(e)
                        }
                    )
                })
                this.$store.state.udp_selected.forEach((udpHostPort) => {
                    let connected_list = []
                    if (this.$store.state.UDP_connection[udpHostPort] === 'connect') {
                        connected_list.push(udpHostPort)
                        EventBus.$emit('log_update', '연결된 드론\n' + connected_list)
                    }
                })
            } else {
                EventBus.$emit('log_update', '연결할 UDP를 입력하세요.')
            }
        },
        RFunlink() {
            let res_flag = false
            if (this.$store.state.udp_selected.length > 0) {
                this.$store.state.udp_selected.forEach((udpHostPort) => {
                    udpHostPort = udpHostPort.replace('\t', '')
                    let serverip = udpHostPort.split(':')
                    axios.post('http://localhost:3000/rfflag', {
                        "connection": 'disconnect',
                        "host": serverip[0],
                        "port": serverip[1]
                    })
                        .then((response) => {
                                if (!res_flag) {
                                    EventBus.$emit('log_update', response.data)
                                    this.$store.state.UDP_connection[udpHostPort] = 'disconnect'
                                    res_flag = true
                                } else {
                                    res_flag = false
                                }
                            }
                        ).catch((e) => {
                            console.log("Could not send UDP 'disconnect' message")
                            EventBus.$emit('log_update', "UDP 연결 해제가 불가능합니다.")
                            console.log(e)
                        }
                    )
                })
            } else {
                EventBus.$emit('log_update', '연결할 UDP를 입력하세요.')
            }
        },
        setUDPServer(serverIP, del = false) {
            let flag = 0
            if (del) {
                if (serverIP.name.includes('localhost')) {
                    let serverIP_arr = serverIP.name.split(':')

                    this.$store.state.UDP_connection['127.0.0.1:' + serverIP_arr[1]] = 'disconnect'
                    axios.post('http://localhost:3000/rfflag', {
                        "connection": this.$store.state.UDP_connection['127.0.0.1:' + serverIP_arr[1]],
                        "host": '127.0.0.1',
                        "port": serverIP_arr[1]
                    })
                        .then((response) => {
                                EventBus.$emit('log_update', response.data)
                                // console.log(response.data)
                                this.udp_list = this.udp_list.filter(ip => ip.name !== '127.0.0.1:' + serverIP_arr[1])
                                this.$store.state.udp_selected = this.$store.state.udp_selected.filter(ip => ip !== '127.0.0.1:' + serverIP_arr[1])
                                delete this.$store.state.UDP_connection['127.0.0.1:' + serverIP_arr[1]]
                                localStorage.setItem('RF_udp_list', JSON.stringify(this.udp_list))
                            }
                        ).catch((e) => {
                            console.log("Could not send UDP disconnect message")
                            EventBus.$emit('log_update', "UDP 연결 해제가 불가능합니다.")
                            console.log(e)
                        }
                    )
                } else {
                    let serverIP_arr = serverIP.name.split(':')

                    this.$store.state.UDP_connection[serverIP.name] = 'disconnect'
                    axios.post('http://localhost:3000/rfflag', {
                        "connection": this.$store.state.UDP_connection[serverIP.name],
                        "host": serverIP_arr[0],
                        "port": serverIP_arr[1]
                    })
                        .then((response) => {
                                EventBus.$emit('log_update', response.data)
                                // console.log(response.data)
                                this.udp_list = this.udp_list.filter(ip => ip.name !== serverIP.name)
                                this.$store.state.udp_selected = this.$store.state.udp_selected.filter(ip => ip !== serverIP.name)
                                delete this.$store.state.UDP_connection[serverIP.name]
                                localStorage.setItem('RF_udp_list', JSON.stringify(this.udp_list))
                            }
                        ).catch((e) => {
                            console.log("Could not send UDP disconnect message")
                            EventBus.$emit('log_update', "UDP 연결 해제가 불가능합니다.")
                            console.log(e)
                        }
                    )
                }
            } else {
                this.udp_list.forEach((item) => {
                    if (serverIP.includes('localhost')) {
                        let serverIP_arr = serverIP.split(':')
                        if (item.name.includes('127.0.0.1:' + serverIP_arr[1])) {
                            flag = 1
                        }
                    } else {
                        if (item.name.includes(serverIP)) {
                            flag = 1
                        }
                    }
                })
                if (flag === 0) {
                    if (serverIP.includes('localhost')) {
                        let serverIP_arr = serverIP.split(':')
                        this.udp_list.push({"name": '127.0.0.1:' + serverIP_arr[1]})
                        this.$store.state.UDP_connection['127.0.0.1:' + serverIP_arr[1]] = 'disconnect'
                    } else {
                        this.udp_list.push({"name": serverIP})
                        this.$store.state.UDP_connection[serverIP] = 'disconnect'
                    }
                }
                localStorage.setItem('RF_udp_list', JSON.stringify(this.udp_list))
            }
        },
        UDProwClicked: function (item, row) {
            this.udp_list.forEach((item) => {
                if (item.name.includes(row.item.name)) {
                    let selectState = (row.isSelected) ? false : true
                    row.select(selectState)
                    if (!selectState) {
                        this.$store.state.udp_selected = this.$store.state.udp_selected.filter(
                            selectedKeyID => selectedKeyID !== row.item.name)
                    } else {
                        this.$store.state.udp_selected.push(row.item.name)
                    }
                }
            })
        },
        // SerialPorts() {
        //     axios.get('http://localhost:3000/serialports')
        //         .then((response) => {
        //                 this.SerialPortsList = response.data
        //             }
        //         ).catch(() => {
        //             console.log("Can't find serial port")
        //         }
        //     )
        // },
        SerialConnect(flag) {
            axios.post('http://localhost:3000/rfport', {
                "port": this.SerialPort,
                "baudrate": this.SerialBaudRate,
                "connect": flag
            })
                .then((response) => {
                        console.log(response.data)
                    }
                ).catch(() => {
                    console.log("Couldn't send serial port for RF")
                }
            )
        }
    },
    watch: {
        COM_PROTOCOL_TYPE(flag) {
            this.$store.state.TYPE = flag
            if (flag) {  // RF
                // LTE 연결 해제
                if (this.$store.state.client.connected) {
                    Object.keys(this.$store.state.control_drone).forEach((dName) => {
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + dName + '/conn'
                        this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
                        console.log('send unsubscribe to', topic)
                    })
                }
            } else {  // LTE
                // 연결되어 있던 RF 초기화
                this.SerialConnect(false)
                let res_flag = false

                if (this.udp_list.length > 0) {
                    this.udp_list.forEach((udpHostPort) => {
                        udpHostPort = udpHostPort.name.replace('\t', '')
                        let serverip = udpHostPort.split(':')
                        axios.post('http://localhost:3000/rfflag', {
                            "connection": 'disconnect',
                            "host": serverip[0],
                            "port": serverip[1]
                        })
                            .then((response) => {
                                    if (!res_flag) {
                                        EventBus.$emit('log_update', response.data)
                                        this.$store.state.UDP_connection[udpHostPort] = 'disconnect'
                                        res_flag = true
                                    } else {
                                        res_flag = false
                                    }
                                }
                            ).catch((e) => {
                                console.log("Could not send UDP 'disconnect' message")
                                EventBus.$emit('log_update', "UDP 연결 해제가 불가능합니다.")
                                console.log(e)
                            }
                        )
                    })
                }
                // 드론 인증 준비
                if (this.$store.state.client.connected) {
                    Object.keys(this.$store.state.control_drone).forEach((dName) => {
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + dName + '/conn'
                        this.$store.state.client.publish(topic, Buffer.from('ready'))
                    })
                }
            }
        },
        rfType(flag) {
            if (!flag) {  // UDP
                this.SerialConnect(false)  // 연결되어 있는 Serial 연결 초기화

                EventBus.$emit('log_update', 'UDP 연결')
            } else {
                EventBus.$emit('log_update', 'Serial 연결')

                let res_flag = false

                if (this.udp_list.length > 0) {
                    this.udp_list.forEach((udpHostPort) => {
                        udpHostPort = udpHostPort.name.replace('\t', '')
                        let serverip = udpHostPort.split(':')
                        axios.post('http://localhost:3000/rfflag', {
                            "connection": 'disconnect',
                            "host": serverip[0],
                            "port": serverip[1]
                        })
                            .then((response) => {
                                    if (!res_flag) {
                                        EventBus.$emit('log_update', response.data)
                                        this.$store.state.UDP_connection[udpHostPort] = 'disconnect'
                                        res_flag = true
                                    } else {
                                        res_flag = false
                                    }
                                }
                            ).catch((e) => {
                                console.log("Could not send UDP 'disconnect' message")
                                EventBus.$emit('log_update', "UDP 연결 해제가 불가능합니다.")
                                console.log(e)
                            }
                        )
                    })
                }
            }
        }
    },
    mounted() {
        // this.$timer.start('SerialPorts')

        EventBus.$on('update-table', (drone) => {
            this.UpdateTable(drone);
        });

        EventBus.$on('add-counter', (drone) => {
            this.$store.state.control_drone[drone].recv_counter++;
        });
    },
    beforeDestroy() {
        this.add_drone = ""

        if (this.$store.state.client.connected) {
            for (let idx in this.drone_list) {
                let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx].name + '/conn'
                this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
            }
        }
        this.drone_list = []

        // this.$timer.stop('SerialPorts')
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

.left {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 310px;
    height: 100%;
    background: rgb(39, 39, 40);
    padding: 90px 0;
    overflow: hidden;
}

.theme--light.v-data-table tbody tr.v-data-table__selected {
    background: rgb(75, 75, 75) !important;
}

.theme--light.v-data-table tbody tr.v-data-table__selected:hover {
    background: rgb(124, 124, 124) !important;
}

.control_drone_name td {
    font-size: 23px !important;
    font-weight: bold;
}

.control_drone_icon {
    font-size: 17px !important;
    vertical-align: middle;
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
        transform: scale(1.5);
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

.v-text-field >>> label {
    font-size: 0.8em;
}
</style>
