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
                @click:row="rowClicked"
            >
                <template v-slot:item.icon="{ item }">
                    <v-progress-circular
                        v-if="$store.state.control_drone[item.name].status==='ready'"
                        indeterminate
                        color="primary"
                        :size="25"
                    ></v-progress-circular>
                    <v-avatar
                        v-if="rc_hub_status.includes($store.state.control_drone[item.name].status) && $store.state.control_drone[item.name].status !== 'ready'"
                        :style="{animationDuration: animationDuration}"
                        class="v-avatar--metronome"
                        size="24"
                    >
                        <font-awesome-icon
                            :icon="iconName(item)"
                            :style="iconColor(item)"/>
                    </v-avatar>
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

            recv_counter: 1,
            timer_id: null,
            bpm: 40
        }
    },
    methods: {

        DroneADD() {
            let drone = {}
            drone.name = this.add_drone
            drone.icon = 'times-circle'
            drone.status = 'disabled'
            this.drone_list.push(drone)

            this.$store.state.control_drone[drone.name] = {
                icon: 'times-circle',
                status: 'disabled'
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
            for (let idx in this.drone_list) {
                if (this.drone_list[idx].name === drone) {
                    this.drone_list[idx].icon = this.$store.state.control_drone[drone].icon
                    this.drone_list[idx].status = this.$store.state.control_drone[drone].status
                }
            }
            console.log(this.drone_list)
        },
        iconName(item) {
            let icon = ''
            for (let idx in this.drone_list) {
                if (this.drone_list[idx].name === item.name) {
                    if (this.drone_list[idx].status === 'disconnected') {
                        this.drone_list[idx].icon = 'unlink'
                    } else if (this.drone_list[idx].status === 'connected') {
                        this.drone_list[idx].icon = 'link'
                    } else if (this.drone_list[idx].status === 'ready') {
                        this.drone_list[idx].icon = 'spinner'
                    } else if (this.drone_list[idx].status === 'send') {
                        this.drone_list[idx].icon = 'circle'
                    } else if (this.drone_list[idx].status === 'disabled') {
                        this.drone_list[idx].icon = 'times-circle'
                    } else {
                        this.drone_list[idx].icon = 'exclamation-circle'
                    }
                }
                icon = this.drone_list[idx].icon
            }
            return icon
        },
        iconColor(item) {
            let style = {}
            for (let idx in this.drone_list) {
                if (this.drone_list[idx].name === item.name) {
                    if (this.drone_list[idx].status === 'disconnected') {
                        style.color = 'orange'
                    } else if (this.drone_list[idx].status === 'connected') {
                        style.color = 'black'
                    } else if (this.drone_list[idx].status === 'ready') {
                        style.color = 'blue'
                    } else if (this.drone_list[idx].status === 'send') {
                        style.color = this.bpm_color
                    } else if (this.drone_list[idx].status === 'disabled') {
                        style.color = 'red'
                    } else {
                        style.color = 'red'
                    }
                }
            }
            return style
        }
    },
    computed: {
        animationDuration() {
            return `${5 / this.bpm}s`
        },
        bpm_color() {
            if (this.bpm < 3) return 'grey'
            if (this.bpm < 6) return 'indigo'
            if (this.bpm < 9) return 'green'
            if (this.bpm < 12) return 'lime'
            return 'red'
        },
    },
    created() {
        this.timer_id = setInterval(() => {
            this.bpm = this.recv_counter;
            this.recv_counter = 1;
        }, 10000);
    },
    mounted() {
        EventBus.$on('update-table', (drone) => {
            this.UpdateTable(drone);
        });
        EventBus.$on('add-counter', () => {
            this.recv_counter++;
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
