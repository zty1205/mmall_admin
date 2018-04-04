import axios from 'axios'
axios.defaults.withCredentials = true

const listUrl = 'http://localhost:8080/manage/order/list.do?'
const searchUrl = 'http://localhost:8080/manage/order/search.do?'
const detailUrl = 'http://localhost:8080/manage/order/detail.do?'
const sendUrl = 'http://localhost:8080/manage/order/send_goods.do?'

export const getOrderList = (PageNum, PageSize) => {
  let url = listUrl+'pageNum='+PageNum+'&pageSize='+PageSize
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
