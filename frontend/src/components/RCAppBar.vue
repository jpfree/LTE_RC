<template>
    <v-card>
        <v-app-bar app dark dense height="60">
            <v-toolbar-title>
                <v-row no-gutters align="center" style="font-size: 35px; font-weight: bold;">
                    KETI LTE RC
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
                        placeholder="gcs.iotocean.org"
                        label="HOST*"
                        style="font-size: 25px;"
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
                        style="font-size: 25px;"
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
                        placeholder="JWS"
                        label="RC*"
                        style="font-size: 25px;"
                        required
                        :disabled="MOBIUS_CONNECTION_CONNECTED"
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-btn
                        class="mx-2"
                        tile @click="GcsAppBarCreated"
                        elevation="5"
                        color="primary"
                        style="font-size: 20px;"
                        height="45"
                        :disabled="MOBIUS_CONNECTION_CONNECTED"
                    > {{ MOBIUS_CONNECTION_TEXT }}
                    </v-btn>
                    <v-btn
                        class="mx-2"
                        tile @click="GcsAppBarReseted"
                        elevation="2"
                        color="primary"
                        style="font-size: 20px;"
                        height="45"
                        :disabled="!MOBIUS_CONNECTION_CONNECTED"
                    > {{ MOBIUS_DISCONNECTION_TEXT }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-menu
                bottom
                right
                offset-y
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="mx-2"
                        elevation="2"
                        color="dark"
                        style="font-size: 20px"
                        height="45"
                        v-bind="attrs"
                        v-on="on"
                    > Menu
                        <font-awesome-icon
                            class="phrase"
                            :icon="'caret-down'"
                            size="1x"/>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                    >
                        <v-list-item-title
                            style="font-size: 25px"
                            v-text="item.title"
                            @click="movePage(item.title)"
                        >
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </v-card>
</template>

<script>
import EventBus from "@/EventBus";

export default {
    name: "RCAppBar",

    data: function () {
        return {
            open: false,
            MOBIUS_DISCONNECTION_TEXT: 'Disconnect',
            MOBIUS_CONNECTION_TEXT: 'Connect',
            // MOBIUS_CONNECTION_CONNECTED: localStorage.getItem('mobius_connected') ? (localStorage.getItem('mobius_connected') === 'true') : false,
            MOBIUS_CONNECTION_CONNECTED: false,
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
            ],

            items: [
                {title: 'Home'},
                {title: 'Calibration'},
                {title: 'DeadZone'}
            ],
        }
    },
    methods: {
        GcsAppBarCreated() {
            let self = this;
            self.$store.state.VUE_APP_MOBIUS_HOST = self.host;
            self.$store.state.VUE_APP_MOBIUS_GCS = self.gcs;
            self.$store.state.VUE_APP_MOBIUS_RC = self.rc;

            localStorage.setItem('mobius_host', self.host);
            localStorage.setItem('mobius_gcs', self.gcs);
            localStorage.setItem('mobius_rc', self.rc);

            self.MOBIUS_CONNECTION_CONNECTED = true;
            self.$store.state.MOBIUS_CONNECTION_CONNECTED = true;

            localStorage.setItem('mobius_connected', self.MOBIUS_CONNECTION_CONNECTED);
            EventBus.$emit('mqttConnection')
        },

        GcsAppBarReseted() {
            this.MOBIUS_CONNECTION_CONNECTED = false;
            this.$store.state.MOBIUS_CONNECTION_CONNECTED = false;

            localStorage.setItem('mobius_connected', this.MOBIUS_CONNECTION_CONNECTED);
            EventBus.$emit('mqttConnection')
        },
        movePage(page) {
            this.$router.push({name: page});
        }
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

.v-text-field >>> label {
    font-size: 0.9em;
}

.baricon {
    color: white;
}
</style>
