<template>
    <div>
      <h1>这里是order界面</h1>
      <!-- 订单列表 -->
      <i-table height="350" :content="self" border :columns="columns_order" :data="list" ref="orderTable" :row-class-name="rowClassName"></i-table>
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
  import { getOrderList } from '../api/order'
    export default {
      data(){
        return{
          self: this,
          list: [],
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
              width: 100,
              className: 'demo-table-info-column'
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
      created(){
        getOrderList(this.PageNum, this.PageSize).then((res)=>{
          let data = res.data
          this.list = data
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
          getOrderList(index, this.PageSize).then((res)=>{
            this.list = res.data.list
            this.total = res.data.total
          })
        },
        rowClassName (row, index) {
          if (index === 1) {
            return 'demo-table-info-row';
          } else if (index === 3) {
            return 'demo-table-error-row';
          }
          return '';
        }
      }
    }
</script>

<style scoped>
  .ivu-table .demo-table-info-row td{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
  }
  .ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
  }
</style>
