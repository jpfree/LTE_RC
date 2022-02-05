<template>
    <v-container class="rc_cali">
        <v-row>
            <v-col cols="5">
                <v-row justify="center">
<!--                    <div class="offset-6 border-left pl-4">First</div>-->
                    <svg class="ch1_max">
                        <line x1="50" y1="0" x2="50" y2="48" stroke-width="3" stroke="#FF0000FF"/>
                    </svg>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'RCCalibration',

    props: ['ch_raw', 'ch_value', 'ch_min', 'ch_trim', 'ch_max'],

    data() {
        return {
            chan_raw: this.ch_raw
        }
    },

    methods: {},
    mounted() {
        setInterval(() => {
            console.log(this.$props.ch_raw.ch1_raw)
        }, 1000),
            console.log(this.chan_raw)
        console.log(this.ch_value)
        console.log(this.ch_min)
        console.log(this.ch_trim)
        console.log(this.ch_max)
    }
}
</script>

<style>
.rc_cali {
    position: absolute;
}
</style>
