<template>
    <div>
      <h1>这里是product界面</h1>
      <i-table height="350" :content="self" border :columns="columns_product" :data="list"></i-table>
      <Page :total="total" :current='PageNum' :page-size='PageSize' @on-change="changePage" size="small" show-elevator class="MyPage"></Page>
      <footer :style="{marginTop: '20px'}">
        <i-button type="primary" size="large" @click="exportData(1)">
          <Icon type="ios-download-outline"></Icon> 导出原始数据
        </i-button>
        <i-button type="primary" size="large" @click="exportData(2)">
          <Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据
        </i-button>
      </footer>
    </div>
</template>

<script>
  import { getProductList } from '../api/product'
    export default {
      data(){
        return{
          self: this,
          list: [],
          PageNum: 1,
          PageSize: 10,
          total: 0,
          columns_product:[
            {
              title: 'ID',
              key: 'id',
              width: 60
            },
            {
              title: '信息',
              key: 'name',
              ellipsis: true
            },
            {
              title: '价格',
              key: 'price',
              width: 100,
              "sortable": true,
              filters: [
                {
                    label: '0 - 2000',
                    value: 1
                },
                {
                    label: '2000 - 5000',
                    value: 2
                },
                {
                    label: '5000 - 10000',
                    value: 3
                },
                {
                    label: '大于10000',
                    value: 4
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                if (value === 1) {
                    return row.price <= 2000 ;
                } else if (value === 2) {
                    return (row.price <= 5000 && row.price > 2000) ;
                } else if (value === 3) {
                    return (row.price <= 10000 && row.price > 5000) ;
                } else if (value === 4) {
                    return row.price > 10000 ;
                }
              }
            },
            {
              title: '状态',
              key: 'status',
              width: 120
            },
            {
              title: '操作',
              key: 'action',
              render () {
                return `<i-button type="text" size="small">查看</i-button><i-button type="text" size="small">编辑</i-button>`;
              }
            }
          ]
        }
      },
      watch: {
        list:{
          handler(newVal, oldVal){
            // console.log('new: ',newVal)
            // console.log('old: ',oldVal)
            this.list = newVal
          }
        }
      },
      methods: {
        exportData (type) {
          if (type === 1) {
            this.$refs.table.exportCsv({
              filename: '原始数据'
            });
          } else if (type === 2) {
            this.$refs.table.exportCsv({
              filename: '排序和过滤后的数据',
              original: false
            });
          }
        },
        changePage(index){
          console.log(index) // iview 会将当前页码传递给你
          getProductList(index, this.PageSize).then((res)=>{
            this.list = res.data.list
            this.total = res.data.total
          })
        }      
      },
      mounted(){
        // const res = getProductList(this.PageNum, this.PageSize)
        getProductList(this.PageNum, this.PageSize).then((data)=>{
          // console.log(data) // 第一个data 是返回的response  第二个是返回json格式里的data
          this.list = data.data.list
          this.total = data.data.total
        })
        //console.log(res) // res 直接返回的是Promise  可到api那里进行promise封装
        //this.list = res.list
      }
    }
</script>

<style scoped>
.MyPage{
  margin-top: 20px;
}
</style>
