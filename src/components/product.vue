<template>
    <div>
      <h1>这里是product界面</h1>
      <!-- 商品查询 -->

      <Input v-model="Search" placeholder="关键词..." style="width: 500px;margin-bottom: 10px;">
        <Select v-model="searchChoice" slot="prepend" style="width: 150px">
          <Option v-for="item in Choice" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" slot="append" icon="ios-search" @click="getSearch"></Button>
      </Input>


      <!-- 商品列表 -->
      <i-table height="350" :content="self" border :columns="columns_product" :data="list" ref="productTable"></i-table>
      <Page :total="total" :current='PageNum' :page-size='PageSize' @on-change="changePage" size="small" show-elevator class="MyPage"></Page>
      <footer :style="{marginTop: '20px'}">
        <i-button type="primary" size="large" @click="exportData(1)">
          <Icon type="ios-download-outline"></Icon> 导出原始数据
        </i-button>
        <i-button type="primary" size="large" @click="exportData(2)">
          <Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据
        </i-button>
      </footer>
<!-- 使用v-show的话 组件没显示的时候也会发送axios请求 -->
      <product_detail v-if="showDetail" :id="nowId" @unShow ="showDetail = false"></product_detail>
    </div>
</template>

<script>
  import { getProductList, searchProductById, searchProductByName } from '../api/product'
  import product_detail from './product-detail.vue'
    export default {
      data(){
        return{
          self: this,
          list: [],
          nowId: 0,
          PageNum: 1,
          PageSize: 10,
          total: 0,
          searchChoice: null,
          Search: '',
          Choice:[
            {value: 'ById', label: '按商品ID寻找'},
            {value: 'ByName', label: '按商品名寻找'}
          ],
          showDetail: false,
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
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.detail(params.index)
                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.edit(params.index)
                      }
                    }
                  }, '编辑')
                ]);
              }
            }
          ]
        }
      },
      components:{
        product_detail  // 子组件 需要将获取的detail信息传递给子组件
      },
      watch: {
        list:{
          handler(newVal, oldVal){
            // console.log('new: ',newVal)
            // console.log('old: ',oldVal)
            this.list = newVal
          }
        },
        nowId:{
          handler(newVal, oldVal){
            this.nowId = newVal
          }
        }
      },
      methods: {
        exportData (type) {
          if (type === 1) {
            this.$refs.productTable.exportCsv({
              filename: '原始数据'
            });
          } else if (type === 2) {
            this.$refs.productTable.exportCsv({
              filename: '排序和过滤后的数据',
              original: false
            });
          }
        },
        changePage(index){
          // console.log(index) // iview 会将当前页码传递给你
          getProductList(index, this.PageSize).then((res)=>{
            this.list = res.data.list
            this.total = res.data.total
          })
        },
        getSearch(){
          let searchChoice = this.searchChoice
          let Search = this.Search
          let regPos = /^\+?[1-9][0-9]*$/g; // 正整数正则
          if(searchChoice){
            if(searchChoice === 'ById' && regPos.test(Search)){
              console.log('id')
              searchProductById(Search).then((res)=>{
                this.list = res.data.list
                this.total = res.data.total
              })
            }
            else if(searchChoice === 'ByName'){
              console.log('name')
              searchProductByName(Search).then((res)=>{
                this.list = res.data.list
                this.total = res.data.total
              })
            }
            else {
              alert('输入不合法')
            }
          }else{
            alert('请输入搜索方式')
          }
        },
        detail(index){
          // console.log('in datail and index = ',index)
          // console.log(this.list[index].id) // 可以获得你点击的正确的id
          let id = this.list[index].id
          // this.nowId = id // 不能实时更新
          this.nowId =id
          this.showDetail = true
          console.log(this.showDetail)
        },

      },
      created(){
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
