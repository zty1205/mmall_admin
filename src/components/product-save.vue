<template>
    <div>
        <h2>这里是添加商品界面</h2>

      <div class="product_form">
        <Form :model="newProduct" label-position="left" label-width=100>
          <FormItem label="商品名称">
            <Input v-model="newProduct.name" size="large"></Input>
          </FormItem>
          <FormItem label="商品描述">
            <Input v-model="newProduct.subtitle" size="large"></Input>
          </FormItem>
          <FormItem label="商品所属">
            <Input v-model="newProduct.categoryId" size="large"></Input>
            <Cascader :data="category_parent" :load-data="loadData" size="large"></Cascader>
          </FormItem>
          <FormItem>
            <Row type="flex" justify="space-around">
              <Col span="12">
                <FormItem label="商品价格">
                  <Input v-model="newProduct.price" size="large" class="product_sale">
                  <span slot="append">元</span>
                  </Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品库存">
                  <Input v-model="newProduct.stock" size="large" class="product_sale">
                  <span slot="append">件</span>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </FormItem>

        </Form>
      </div>

    </div>
</template>

<script>
  import { getCategoryChild } from '../api/category'
    export default {
      data(){
        return{
          newProduct:{
            name: '',
            subtitle: '',
            categoryId: '',
            price: '',
            stock: ''
          },
          category_parent:[]
        }
      },
      watch:{
        category_parent:{
          handler(newVal,oldVal){
            this.category_parent = newVal
          }
        }
      },
      mounted(){
        this.initCal()
      },
      methods: {
        initCal(){
          getCategoryChild(0).then((res)=>{
            // console.log(res.data) // 返回的数据太多了
            // this.category_parent = res
            if (res.status == 10){
              this.$router.push({path: 'login'})  // 跳不到
            }else{
              let data = res.data
              for(let i = 0;i < data.length; i++){
                let name = data[i].name
                let my_category = {
                  value: name,
                  label: name,
                  children: [],
                  loading: false
                }
                this.category_parent.push(my_category)  // push成功还未有loading显示
              }

            }
          })
        },
        loadData (item, callback) {
          item.loading = true;

          item.loading = false;
        }
      }
    }
</script>

<style scoped>
  .product_form{
    width: 80%;
    margin: 20px auto;
  }
  .product_sale{
    width: 70%;
  }
</style>
