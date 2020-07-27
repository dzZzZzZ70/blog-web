import Vuex from 'vuex'
import Vue from 'vue'
// 持久化
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [persistedState()],
    state: {
        userInfo: {}
    },
    mutations: {
        login (state, userInfo) {
           state.userInfo = userInfo
        }
    }
})

export default store