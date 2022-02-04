import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        MOBIUS_CONNECTION_CONNECTED: false,
        VUE_APP_MOBIUS_HOST: '203.253.128.177',
        VUE_APP_MOBIUS_GCS: 'KETI_MUV',
        VUE_APP_MOBIUS_RC: 'KETI_RC',
        client: {
            connected: false,
            loading: false
        }
    },
})
