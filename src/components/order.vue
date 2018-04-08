<template>
    <div>
      <h1>这里是order界面</h1>
      <!-- 订单列表 -->
      <i-table height="400" :loading="loading" :content="self" border :columns="columns_order" :data="list" ref="orderTable"></i-table>
      <Page :total="total" :current='PageNum' :page-size='PageSize' @on-change="changePage" show-elevator class="MyPage"></Page>

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
  import { getOrderList } from '../api/order'
    export default {
      data(){
        return{
          self: this,
          list: [],
          loading: true,
          PageNum: 1,
          PageSize: 10,
          total: 300, // 后台api 没有给总共多少条订单
          columns_order:[
            {
              title: '订单号',
              key: 'orderNo',
              render: (h, params) => {
                return h('div', [
                  h('a', params.row.orderNo)
                ]);
              }
            },
            {
              title: '收件人',
              key: 'receiverName',
              width: 100
            },
            {
              title: '订单状态',
              key: 'statusDesc',
              width: 100
            },
            {
              title: '总价',
              key: 'payment',
              width: 80
            },
            {
              title: '创建时间',
              key: 'createTime'
            }
          ]
        }
      },
      mounted(){
        getOrderList(this.PageNum, this.PageSize).then((res)=>{
          let data = res.data
          this.list = data
          this.loading = false
        })
      },
      watch: {
        list: {
          handler(newVal, oldVal) {
            this.list = newVal
          }
        }
      },
      methods:{
        exportData (type) {
          if (type === 1) {
            this.$refs.orderTable.exportCsv({
              filename: '原始数据'
            });
          } else if (type === 2) {
            this.$refs.orderTable.exportCsv({
              filename: '排序和过滤后的数据',
              original: false
            });
          }
        },
        changePage(index){
          // console.log(index) // iview 会将当前页码传递给你
          this.loading = true
          getOrderList(index, this.PageSize).then((res)=>{
            let data = res.data
            this.list = data // 返回是data 而不包含在list里了
            // this.total = data.total
            this.loading = false
          })
        }
      }
    }
</script>

<style scoped>
  .MyPage{
    margin-top: 20px;
  }
</style>
