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
                    <!--                            <v-text-field hide-details ref="host" v-model="host" :rules="host_rule" placeholder="203.253.128.177" label="Host*" required></v-text-field>-->
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
                        v-model="rc" :rules="rc_rule"
                        placeholder="KETI_RC"
                        label="RC*"
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
// import EventBus from "@/EventBus";

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
            //MOBIUS_CONNECTION_CONNECTED: this.$cookies.isKey('mobius_connected')?(this.$cookies.get('mobius_connected') === 'true'):false,
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
            rc: localStorage.getItem('mobius_rc') ? (localStorage.getItem('mobius_rc')) : (this.$store.state.VUE_APP_MOBIUS_RC),
            rc_rule: [
                v => !!v || 'RC 이름은 필수 입력사항입니다.',
                v => !/[~!@#$%^&*()+|<>?:{}]/.test(v) || 'RC 이름에는 특수문자를 사용할 수 없습니다.'
            ]
        }
    },

    methods: {
        GcsAppBarCreated() {
            this.$store.state.VUE_APP_MOBIUS_HOST = this.host;
            this.$store.state.VUE_APP_MOBIUS_GCS = this.gcs;
            this.$store.state.VUE_APP_MOBIUS_RC = this.rc;

            //this.$cookies.set('mobius_host', this.host);
            //this.$cookies.set('mobius_gcs', this.gcs);

            //console.log('localStorage-mobius_gcs', localStorage.getItem("mobius_gcs"));

            localStorage.setItem('mobius_host', this.host);
            localStorage.setItem('mobius_gcs', this.gcs);
            localStorage.setItem('mobius_RC', this.rc);

            let self = this;

            self.MOBIUS_CONNECTION_CONNECTED = true;
            self.$store.state.MOBIUS_CONNECTION_CONNECTED = true;

            localStorage.setItem('mobius_connected', self.MOBIUS_CONNECTION_CONNECTED);
        },

        GcsAppBarReseted() {
            this.MOBIUS_CONNECTION_CONNECTED = false;
            this.$store.state.MOBIUS_CONNECTION_CONNECTED = false;


            localStorage.setItem('mobius_connected', this.MOBIUS_CONNECTION_CONNECTED);
        }
    },
    mounted() {
        if (this.MOBIUS_CONNECTION_CONNECTED) {
            this.GcsAppBarCreated();
        }
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
