<template>
    <v-app>
        <RCAppBar/>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>

import RCAppBar from "./components/RCAppBar";

export default {
    name: 'App',

    components: {
        RCAppBar,
    },

    data: () => ({
        //
    }),
};
</script>
