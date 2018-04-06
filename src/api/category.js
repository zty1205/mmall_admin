import axios from 'axios'

const baseUrl = 'http://localhost:8080/manage/category/list.do?'
const childUrl = 'http://localhost:8080/manage/category/get_category.do?'

export const getCategoryList = (PageNum, PageSize) => {
  let url = baseUrl+'pageNum='+PageNum+'&pageSize='+PageSize
  // return axios.get(url) // 这样返回的是一个promise对象
  return new Promise((resolve, reject)=>{
    axios.get(url).then((res)=>{
      let data = res.data
      if(data.status === 0){
        resolve(data)
      }else{
        resolve(data.status) // 接受到的status = 10
        alert('权限不够')
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const getCategoryChild = (categoryId) => {
  let url = childUrl+'categoryId='+categoryId
  return new Promise((resolve, reject)=>{
    axios.get(url).then((res)=>{
      let data = res.data
      if(data.status === 0){
        resolve(data)
      }else{
        resolve(data.status) // 接受到的status = 10
        alert('权限不够')
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
