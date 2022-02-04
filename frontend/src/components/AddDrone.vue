<template>
    <div>
        <div class='left'>
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
                    <font-awesome-icon
                        v-if="rc_hub_status.includes($store.state.control_drone[item.name].status) && $store.state.control_drone[item.name].status!=='ready'"
                        :icon="iconName(item)"
                        size="lg"
                        :style="iconColor(item)"/>
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
            rc_hub_status: ['disconnected', 'ready', 'connected', 'send', 'disabled']
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
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/Cert/' + this.drone_list[idx - 1].name
                        this.$store.state.client.unsubscribe(topic, error => {
                            if (error) {
                                console.log('Unsubscribe error', error)
                            }
                            console.log('Unsubscribe to topics (', topic, ')');
                        })
                        this.drone_list.splice(idx - 1, 1)
                        this.drone_selected.splice(select - 1, 1)
                    }
                }
            }
        },
        rowClicked: function (item, row) {
            let selectState = (row.isSelected) ? false : true
            row.select(selectState)
            if (selectState === false) {
                this.drone_selected = this.drone_selected.filter(
                    selectedKeyID => selectedKeyID === row.item.name)
            } else {
                this.drone_selected.push(row.item.name)
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
                        style.color = 'green'
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
    mounted() {
        EventBus.$on('update-table', (drone) => {
            this.UpdateTable(drone);
        });
    },
    beforeDestroy() {
        this.drone_list = []
        this.add_drone = ""
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