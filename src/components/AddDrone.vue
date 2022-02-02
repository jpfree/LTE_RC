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
                item-key="value1"
                hide-default-header
                hide-default-footer
                class="elevation-1 mx-2 mt-5"
                light
                @click:row="rowClicked"
            ></v-data-table>
            <v-row align="center" justify="space-around">
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="40"
                    class="mt-2 rounded-lg"
                    @click="prepare_link"
                    elevation="5"
                    color="primary"
                    :disabled="!MOBIUS_CONNECTION_CONNECTED"
                > Link
                </v-btn>
                <v-btn
                    v-if="drone_selected.length > 0"
                    fab
                    height="40"
                    class="mt-2 rounded-lg"
                    @click="DroneDELTE"
                    elevation="5"
                    color="error"
                    :disabled="!MOBIUS_CONNECTION_CONNECTED"
                > Delte
                </v-btn>
            </v-row>
        </div>
    </div>
</template>
<script>
import EventBus from "@/EventBus";

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
                    text: 'Column1',
                    align: 'center',
                    sortable: true,
                    value: 'value1',
                }
            ],
            drone_list: [],
            drone_selected: []
        }
    },
    methods: {
        DroneADD() {
            let drone = {}
            drone.value1 = this.add_drone
            this.drone_list.push(drone)
        },
        DroneDELTE() {
            for (let select = this.drone_selected.length; select > 0; select--) {
                for (let idx = this.drone_list.length; idx > 0; idx--) {
                    if (this.drone_list[idx - 1].value1 === this.drone_selected[select - 1]) {
                        let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/Cert/' + this.drone_list[idx - 1].value1
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
                    selectedKeyID => selectedKeyID === row.item.value1)
            } else {
                this.drone_selected.push(row.item.value1)
            }
        },
        prepare_link() {
            if (this.$store.state.client.connected) {
                let topic = '/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/Cert/' + this.$store.state.VUE_APP_MOBIUS_RC
                let qos = 0
                this.$store.state.client.subscribe(topic, {qos}, (error, res) => {
                    if (error) {
                        console.log('Subscribe to topics error', error)
                        // return
                    }
                    this.subscribeSuccess = true
                    console.log('Subscribe to topics res', res)
                })
                EventBus.$on('on-message-handler-' + this.$store.state.VUE_APP_MOBIUS_RC, (payload) => {
                    this.onMessageHandler(payload.topic, payload.message);
                });
            }
        },
        onMessageHandler(topic, message) {
            if (this.$store.state.VUE_APP_MOBIUS_RC === message.toString().replace(/"/gi, "")) {
                for (let idx in this.drone_list) {
                    this.$store.state.client.publish('/Mobius/' + this.$store.state.VUE_APP_MOBIUS_GCS + '/RC_Data/Cert/' + this.drone_list[idx].value1, Buffer.from(this.drone_list[idx].value1))
                }
            }
        },
    },
    created() {

    },
    beforeDestroy() {
        this.drone_list = []
        this.add_drone = ""
        for (let idx in this.drone_list) {
            EventBus.$off('on-message-handler-' + this.drone_list[idx].value1)
        }
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