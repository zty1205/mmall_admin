import axios from 'axios'

const baseUrl = 'http://localhost:8080/manage/user/login.do?'

// 登录
export const signByUsername = (username, password) => {
    const url = baseUrl+'username='+username+'&password='+password
    return axios.post(url)
}

// 获取登录用户
// export const fetchSignUser = () => {
//     return axios.get('/auth/user')
//   }
