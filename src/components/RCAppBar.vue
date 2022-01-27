<template>
    <div>
        <v-app-bar app color="dark" dark dense>
            <v-toolbar-title>
                <v-row no-gutters align="center">
                    <v-icon left>mdi-monitor-dashboard</v-icon>
                    KETI Radio Calibration
                </v-row>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-row no-gutters>
                <v-col cols="2">
                    <v-text-field
                        class="mx-2 mt-1"
                        dense hide-details outlined
                        ref="host"
                        v-model="host" :rules="host_rule"
                        placeholder="203.253.128.177"
                        label="HOST*"
                        required
                        :disabled="MOBIUS_CONNECTION_CONNECTED"
                    ></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field
                        class="mx-2 mt-1"
                        dense hide-details outlined
                        ref="gcs"
                        v-model="gcs" :rules="gcs_rule"
                        placeholder="KETI_MUV"
                        label="GCS*"
                        required
                        :disabled="MOBIUS_CONNECTION_CONNECTED"
                    ></v-text-field>
                </v-col>
                <v-col cols="2">
                    <!--                            <v-text-field hide-details ref="host" v-model="host" :rules="host_rule" placeholder="203.253.128.177" label="Host*" required></v-text-field>-->
                    <v-text-field
                        class="mx-2 mt-1"
                        dense hide-details outlined
                        ref="rc"
                        v-model="rc_id" :rules="rcID_rule"
                        placeholder="RC1"
                        label="RC ID*"
                        required
                        :disabled="MOBIUS_CONNECTION_CONNECTED"
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-btn
                        class="mx-2 mt-1"
                        tile @click="GcsAppBarCreated"
                        elevation="5"
                        color="primary"
                        :disabled="MOBIUS_CONNECTION_CONNECTED"
                    > {{ MOBIUS_CONNECTION_TEXT }}
                    </v-btn>
                    <v-btn
                        class="mx-2 mt-1"
                        tile @click="GcsAppBarReseted"
                        elevation="2"
                        color="primary"
                        :disabled="!MOBIUS_CONNECTION_CONNECTED"
                    > {{ MOBIUS_DISCONNECTION_TEXT }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "RCAppBar",

    components: {
        // WebrtcCard,
        // WindowPortal
    },
    data: function () {
        return {
            open: false,
            MOBIUS_DISCONNECTION_TEXT: 'Disconnect',
            MOBIUS_CONNECTION_TEXT: 'Connect',
            MOBIUS_CONNECTION_CONNECTED: localStorage.getItem('mobius_connected') ? (localStorage.getItem('mobius_connected') === 'true') : false,
            MOBIUS_CONNECTION_DISABLED: false,
            update_idx: 0,
            formHasErrors: false,
            errorMessages: [],
            host: localStorage.getItem('mobius_host') ? (localStorage.getItem('mobius_host')) : (this.$store.state.VUE_APP_MOBIUS_HOST),
            host_rule: [
                v => !!v || '호스트 주소는 필수 입력사항입니다.',
                v => /^[.0-9]*$/.test(v) || '호스트 주소는 숫자만 입력 가능합니다.'
            ],
            //gcs: this.$cookies.isKey('mobius_gcs')?(this.$cookies.get('mobius_gcs')):(this.$store.state.VUE_APP_MOBIUS_GCS),
            gcs: localStorage.getItem('mobius_gcs') ? (localStorage.getItem('mobius_gcs')) : (this.$store.state.VUE_APP_MOBIUS_GCS),
            gcs_rule: [
                v => !!v || 'GCS 이름은 필수 입력사항입니다.',
                v => !/[~!@#$%^&*()+|<>?:{}]/.test(v) || 'GCS 이름에는 특수문자를 사용할 수 없습니다.'
            ],
            rc_id: localStorage.getItem('mobius_rc') ? (localStorage.getItem('mobius_rc')) : (this.$store.state.VUE_APP_MOBIUS_RCID),
            rcID_rule: [
                v => !!v || 'RC 이름은 필수 입력사항입니다.',
                v => !/[~!@#$%^&*()+|<>?:{}]/.test(v) || 'RC 이름에는 특수문자를 사용할 수 없습니다.'
            ],
            rc:''
        }
    },

    methods: {
        GcsAppBarCreated() {
            let self = this;
            self.$store.state.VUE_APP_MOBIUS_HOST = self.host;
            self.$store.state.VUE_APP_MOBIUS_GCS = self.gcs;
            self.$store.state.VUE_APP_MOBIUS_RCID = self.rc_id;

            // Retrieve rc_approval
            axios({
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                },
                method: 'get',
                url: 'http://' + self.$store.state.VUE_APP_MOBIUS_HOST + ':7579/Mobius/MUV/rc_approval/' + self.$store.state.VUE_APP_MOBIUS_RCID + '/la',
                headers: {
                    'X-M2M-RI': String(parseInt(Math.random() * 10000)),
                    'X-M2M-Origin': 'SVue',
                    'Content-Type': 'application/json;ty=4'
                }
            }).then(
                function (res) {
                    self.$store.state.VUE_APP_MOBIUS_RC = res.data['m2m:cin'].con.rc
                }
            ).catch(
                function (err) {
                    console.log(err.message)
                }
            )

            localStorage.setItem('mobius_host', self.host);
            localStorage.setItem('mobius_gcs', self.gcs);
            localStorage.setItem('mobius_RC', self.rc_id);

            self.MOBIUS_CONNECTION_CONNECTED = true;
            self.$store.state.MOBIUS_CONNECTION_CONNECTED = true;

            localStorage.setItem('mobius_connected', self.MOBIUS_CONNECTION_CONNECTED);
        },

        GcsAppBarReseted() {
            this.MOBIUS_CONNECTION_CONNECTED = false;
            this.$store.state.MOBIUS_CONNECTION_CONNECTED = false;

            localStorage.setItem('mobius_connected', this.MOBIUS_CONNECTION_CONNECTED);
        },
    },
    mounted() {
        if (this.MOBIUS_CONNECTION_CONNECTED) {
            this.GcsAppBarCreated();
        }
    },
    beforeDestroy() {
        this.GcsAppBarReseted()
    }
}
</script>

<style scoped>
#create .v-speed-dial {
    position: absolute;
}

#create .v-btn--floating {
    position: relative;
}
</style>
