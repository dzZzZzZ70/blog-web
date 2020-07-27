// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    // theme: {
    //     themes: {
    //       light: {
    //         primary: colors.red.darken1, // #E53935
    //         secondary: colors.red.lighten4, // #FFCDD2
    //         accent: colors.indigo.base, // #3F51B5
    //       },
    //     },
    // },
}

export default new Vuetify(opts)
