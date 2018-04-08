import * as types from './mutations-type'

const mutations = {
    // 将用户信息添加至状态
    [types.SET_SIGNIN_USER] (state, data) {
      // console.log(data) //能输出来
      state.status = data.status
      state.msg = data.msg
      let user = state.user
      let _user = data.data
      user.username = _user.username
      user.id = _user.id
      user.password = _user.password
    }
}

export default mutations
