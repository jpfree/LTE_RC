<template>
    <v-app>
        <RCAppBar/>
        <v-main>
            <router-view></router-view>
        </v-main>
        <v-row class="Mode">
            [Mode] {{$store.state.Mode}}
        </v-row>
        <v-row v-if="$store.state.Mode==='RF'" class="Log">
            {{UDPLog}}
        </v-row>
    </v-app>
</template>

<script>
import RCAppBar from "./components/RCAppBar";
import EventBus from "@/EventBus";

export default {
    name: 'App',

    components: {
        RCAppBar,
    },

    data() {
        return {
            UDPLog: '',
        }
    },
    mounted() {
        EventBus.$on('mode_update', (mode) => {
            this.$store.state.Mode = mode
        })
        EventBus.$on('log_update', (log) => {
            this.UDPLog = log
        })
    }
};
</script>

<style>

.Log {
    position: absolute;
    bottom: 4.5%;
    left: 350px;
    font-size: 25px;
    font-weight: bold;
}

.Mode {
    position: absolute;
    bottom: 4%;
    right: 5%;
    font-size: 30px;
    font-weight: bold;
}

</style>
