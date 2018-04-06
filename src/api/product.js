import axios from 'axios'
axios.defaults.withCredentials = true

const listUrl = 'http://localhost:8080/manage/product/list.do?'
const searchUrl = 'http://localhost:8080/manage/product/search.do?'
const detailUrl = 'http://localhost:8080/manage/product/detail.do?'
// const baseUrl = 'http://www.djcao.top/manage/user/login.do?'

export const getProductList = (PageNum, PageSize) => {
  let url = listUrl+'pageNum='+PageNum+'&pageSize='+PageSize
  // return axios.get(url) // 这样返回的是一个promise对象
  return new Promise((resolve, reject)=>{
    axios.get(url).then((res)=>{
      let data = res.data
      if(data.status === 0){
        resolve(data)
      }else{
        alert('权限不够')
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const searchProductById = (productId) => {
  let url = searchUrl+'productId='+productId
  return new Promise((resolve, reject)=>{
    axios.get(url).then((res)=>{
      let data = res.data
      if(data.status === 0){
        resolve(data)
      }else{
        alert('权限不够')
      }
    }).catch((err)=>{
      alert('访问出错')
      reject(err)
    })
  })
}

export const searchProductByName = (productName) => {
  let url = searchUrl+'productName='+productName
  return new Promise((resolve, reject)=>{
    axios.get(url).then((res)=>{
      let data = res.data
      if(data.status === 0){
        resolve(data)
      }else{
        alert('权限不够')
      }
    }).catch((err)=>{
      alert('访问出错')
      reject(err)
    })
  })
}

export const getDetail = (productId) => {
  let url = detailUrl+'productId='+productId
  return new Promise((resolve, reject)=>{
    axios.get(url).then((res)=>{
      let data = res.data
      if(data.status === 0){
        resolve(data)
      }else{
        alert('权限不够')
        // resolve(data.status) 接受后应跳转路由到登录界面
      }
    }).catch((err)=>{
      alert('访问出错')
      reject(err)
    })
  })
}

