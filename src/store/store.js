import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        status: '',
        msg: '223322',
       // 刷新后 state的数据会丢失掉 所以token要保存在localStorage较好
        // token: localStorage.getItem('mmall-token'), 或 Cookie.getItem('mmall-token')
        user: { // 对应请求返回的data
            id: '',
            username: '',
            password: '',
            email: '',
            phone: '',
            question: '',
            answer: '',
            role: '',
            create_time: '',
            update_time: ''
        }
    },
    actions,
    mutations,
    getters
})

export default store
