import * as types from './mutations-type'

const mutations = {
    // 将用户信息添加至状态
    [types.SET_SIGNIN_USER] (state, data) {
        state = data
        // console.log(state) 能输出来
    }
}

export default mutations
