<template>
    <div>
      <h1>这里是category界面</h1>

      <p v-model="nowParentId" style="margin: 10px auto;">当前的品类ID： {{ nowParentId }}</p>
      <!-- 种类列表 -->
      <i-table height="350" :loading="loading" :content="self" border :columns="columns_category" :data="list" ref="categoryTable"></i-table>
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
  import { getCategoryList,getCategoryChild } from '../api/category'
    export default {
      data(){
        return{
          self: this,
          loading: true,
          list: [],
          nowParentId: 0, // 当前的父类id
          isRoot: true, // 是否是种类树的根节点 即祖先
          hasChildren: true,
          PageNum: 1,
          PageSize: 10,
          total: 10,
          columns_category:[
            {
              title: '品类ID',
              key: 'id',
              width: 120
            },
            {
              title: '品类名称',
              key: 'name',
              ellipsis: true
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
                        this.edit(params.index)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      disabled: !this.hasChildren
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.getChild(params.index)
                      }
                    }
                  }, '查看子品类'),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small',
                      disabled: this.isRoot // 不行
                      // disabled: true 可以
                    },
                    on: {
                      click: () => {
                        this.returnParent()
                      }
                    }
                  }, '返回父类')
                ]);
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
            this.$refs.categoryTable.exportCsv({
              filename: '原始数据'
            });
          } else if (type === 2) {
            this.$refs.categoryTable.exportCsv({
              filename: '排序和过滤后的数据',
              original: false
            });
          }
        },
        changePage(index){
          // console.log(index) // iview 会将当前页码传递给你
          this.loading = true
          getCategoryList(index, this.PageSize).then((res)=>{
            let data = res.data
            this.list = data
            this.loading = false
          })
        },
        edit(){
          console.log('in edit')
        },
        getChild(index){
          this.loading = true
          let id = this.list[index].id
          getCategoryChild(id).then((res)=>{
            let data = res.data
            if (res.status === 10) {alert('重新登录')}
            this.list = data
            this.loading = false
            this.isRoot = false
            this.hasChildren = false
          })
        },
        returnParent(){
          // console.log('返回父级')
          // console.log(this.nowParentId)
          // this.$router.go(-1) // 返回上一页 但我并没有跳转路由 所以不能使用go -1
          let id = this.nowParentId
          getCategoryChild(id).then((res)=>{
            let data = res.data
            this.list = data
            this.loading = false
          })
        }
      },
      mounted(){
        // const res = getProductList(this.PageNum, this.PageSize)
        getCategoryList(this.PageNum, this.PageSize).then((res)=>{
          // console.log(res)
          if (res === 10){console.log('重新登录')}
          let data = res.data
          this.list = data
          this.loading = false
        })
        //console.log(res) // res 直接返回的是Promise  可到api那里进行promise封装
        //this.list = res.list
      }
    }
</script>

<style scoped>

</style>
