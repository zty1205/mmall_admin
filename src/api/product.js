import axios from 'axios'
axios.defaults.withCredentials = true
import qs from 'querystring'

const listUrl = 'http://localhost:8080/manage/product/list.do?'
const searchUrl = 'http://localhost:8080/manage/product/search.do?'
const detailUrl = 'http://localhost:8080/manage/product/detail.do?'
const statusUrl = 'http://localhost:8080/manage/product/set_sale_status.do?'
// 接受的参数为 一个商品对象 如果对象不包含id属性 则为添加商品 如果有id属性 则为修改商品属性
const addAndEditUrl = 'http://localhost:8080/manage/product/save.do'
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

export const setStatus = (productId,status) => {
  let url = statusUrl+'productId='+productId+'&status='+status
  return new Promise((resolve, reject)=>{
    axios.post(url).then((res)=>{
      let data = res.data
      if(data.status === 0){
        resolve(data)
      }else{
        // alert('权限不够')
        resolve(data) // 接受后应跳转路由到登录界面
      }
    }).catch((err)=>{
      alert('访问出错')
      reject(err)
    })
  })
}

export const saveProduct = (product)=>{
  return new Promise((resolve, reject)=>{
    axios.post(addAndEditUrl,qs.stringify(product))
    .then((res)=>{
      console.log(res)
      let data = res.data
      if(data.status === 0){
        resolve(data)
      }else{
        // alert('权限不够')
        resolve(data)
      }
    }).catch((err)=>{
      alert('访问出错')
      reject(err)
    })
  })
}
