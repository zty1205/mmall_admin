import axios from 'axios'

// const baseUrl = 'http://localhost:8080/manage/category/list.do?'


export const getProductList = (PageNum, PageSize) => {
  let url = baseUrl+'pageNum='+PageNum+'&pageSize='+PageSize
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
