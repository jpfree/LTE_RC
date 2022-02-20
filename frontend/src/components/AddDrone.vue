<template>
    <div>
        <div class='left'>
            <v-row class="mb-6" justify="center">
                <router-link to="/calibration" align="center">
                    <v-btn
                        fab
                        height="40"
                        width="60%"
                        class="rounded-lg"
                        elevation="5"
                        color="cyan"
                        dark
                    > Calibration
                    </v-btn>
                </router-link>
            </v-row>
            <v-text-field
                class="custom-placeholer-color mx-2 mt-10"
                dense hide-details outlined
                ref="drone"
                v-model="add_drone" :rules="add_drone_rule"
                placeholder=""
                label="Drone*"
                required
                style="v-text-field--outlined: white"
                background-color="white"
            ></v-text-field>
            <v-row align="center" justify="space-around">
                <v-btn
                    fab
                    height="40"
                    class="mt-2 rounded-lg"
                    @click="DroneADD"
                    elevation="5"
                    color="success"
                > ADD
                </v-btn>
            </v-row>
            <div class="aside-line"></div>
            <v-row v-if="drone_list.length > 0" class="mx-2 white--text font-weight-bold">
                Drone List
            </v-row>
            <v-data-table
                v-if="drone_list.length > 0"
                :headers="header"
                :items="drone_list"
                item-key="name"
                hide-default-header
                hide-default-footer
                class="elevation-1 mx-2 mt-5"
                light
                @click:row="rowClicked">
                <template v-slot:item.icon="{ item }">
                    <v-progress-circular
                        class="mt-n1"
                        v-if="$store.state.control_drone[item.name].status === 'ready'"
                        indeterminate
                        color="primary"
                        :size="25"
                    ></v-progress-circular>
                    <font-awesome-icon
                        :id="`status_${item.name}`"
                        class="mt-n1 v-avatar--metronome"
                        v-if="$store.state.control_drone[item.name].status !== 'ready'"
                        :icon="iconName(item)"
                        :style="{color:iconColor(item), animationDuration: iconDuration(item)}"
                        size="1x"/>
                </template>
            </v-data-table>
            <v-row align="center" justify="space-around">
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="40"
                    class="mt-2 rounded-lg"
                    @click="DroneDELTE"
                    elevation="5"
                    color="error"
                    :disabled="!MOBIUS_CONNECTION_CONNECTED"
                > Delete
                </v-btn>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="40"
                    class="mt-2 rounded-lg"
                    @click="link"
                    elevation="5"
                    color="primary"
                    :disabled="!MOBIUS_CONNECTION_CONNECTED"
                > Link
                </v-btn>
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="40"
                    width="60"
                    class="mt-2 rounded-lg"
                    @click="unlink"
                    elevation="5"
                    :disabled="!MOBIUS_CONNECTION_CONNECTED"
                > Unlink
                </v-btn>
            </v-row>
        </div>
    </div>
</template>
<script>
import EventBus from "../EventBus";

export default {
    name: 'AddDrone',
    data() {
        return {
            MOBIUS_CONNECTION_CONNECTED: localStorage.getItem('mobius_connected') ? (localStorage.getItem('mobius_connected') === 'true') : false,

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
            drone_list: [],
            drone_selected: [],
            rc_hub_status: ['disconnected', 'ready', 'connected', 'send', 'disabled'],

        }
    },
    methods: {
        DroneADD() {
            let drone = {}
            drone.name = this.add_drone
            drone.icon = 'times-circle'
            drone.status = 'disabled'
            drone.bpm = 1
            drone.bpmcolor = 'red'
            drone.recv_counter = 1
            this.drone_list.push(drone)

            this.$store.state.control_drone[drone.name] = {
                icon: 'times-circle',
                status: 'disabled',
                bpm: 1,
                bpmcolor: 'red',
                recv_counter: 1,
                timer_id: setInterval(() => {
                    this.$store.state.control_drone[drone.name].bpm = this.$store.state.control_drone[drone.name].recv_counter;
                    this.$store.state.control_drone[drone.name].recv_counter = 1;
                    if (this.$store.state.control_drone[drone.name].bpm === 1) {
                        this.$store.state.control_drone[drone.name].icon = 'unlink'
                        this.$store.state.control_drone[drone.name].status = 'disconnected'
                        this.UpdateTable(drone.name)
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + drone.name + '/conn'
                        this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))
                    } else if (this.$store.state.control_drone[drone.name].bpm < 5) {
                        this.$store.state.control_drone[drone.name].icon = 'exclamation-triangle'
                    } else if (this.$store.state.control_drone[drone.name].bpm < 9) {
                        this.$store.state.control_drone[drone.name].icon = 'play'
                    } else if (this.$store.state.control_drone[drone.name].bpm < 12) {
                        this.$store.state.control_drone[drone.name].icon = 'circle'
                    }
                }, 10000)
            }

            let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + drone.name + '/status'
            let qos = 0
            this.$store.state.client.subscribe(topic, {qos}, (error, res) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                }
                this.subscribeSuccess = true
                console.log('Subscribe to topics res', res)
            })
        },
        DroneDELTE() {
            for (let select = this.drone_selected.length; select > 0; select--) {
                for (let idx = this.drone_list.length; idx > 0; idx--) {
                    if (this.drone_list[idx - 1].name === this.drone_selected[select - 1]) {
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx - 1].name + '/status'
                        this.$store.state.client.unsubscribe(topic)
                        topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/' + this.drone_list[idx - 1].name + '/conn'
                        this.$store.state.client.publish(topic, Buffer.from('unsubscribe'))

                        this.drone_list.splice(idx - 1, 1)
                        this.drone_selected.splice(select - 1, 1)
                    }
                }
            }
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
                this.$store.state.control_drone[item.name].bpmcolor =  'orange'
            } else if (this.$store.state.control_drone[item.name].status === 'connected') {
                this.$store.state.control_drone[item.name].bpmcolor =  'black'
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
    },
    mounted() {
        EventBus.$on('update-table', (drone) => {
            this.UpdateTable(drone);
        });

        EventBus.$on('add-counter', (drone) => {
            this.$store.state.control_drone[drone].recv_counter++;
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

.left {
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

.control_drone td {
    font-size: 20px !important;
    font-weight: bold;
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

</style>
