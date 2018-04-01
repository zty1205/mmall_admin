import * as types from './mutations-type'
import { signByUsername } from '../api/user'
import { getProductList } from "../api/product";

const actions = {
  // 用户登录
  [types.SIGN_BY_USERNAME] ({ commit, dispatch }, formInfo) {
    return new Promise((resolve, reject) => {
      signByUsername(formInfo.username, formInfo.password).then((res) => {
        const data = res.data

        // console.log(data)   // 打出来看看

        // 后台有返回这个字段,status为0
        if (data.status === 0) {
        //   commit('SET_TOKEN', data.token)
        //   localStorage.setItem('vn-token', data.token)
          // dispatch('FETCH_SIGNIN_USER')
          commit('SET_SIGNIN_USER', data)
          resolve(data)
        } else {
          // 为false的时候
          reject(data)  // 拒绝了 将这份数据传回给login.vue 组件
        }
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  // // 获取登录用户信息
  // [types.FETCH_SIGNIN_USER] ({commit, state}) {
  //   fetchSignUser().then(res => {
  //     const data = res.data
  //     commit('SET_SIGNIN_USER', data)
  //   })
  // }
  [types.GET_PRODUCT_LIST]({ commit }, Page) {
    let pageNum = Page.PageNum;
    let pageSize = Page.PageSize;
    return new Promise((resolve, reject) => {
      getProductList(pageNum, pageSize).then((res) => {
        const data = res.data
        if (data.status === 0) {
          commit('SET_PRODUCT_LIST', data)
          resolve(data)
        } else {
          resolve(data)  // 拒绝了 将这份数据传回给login.vue 组件
        }
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default actions
