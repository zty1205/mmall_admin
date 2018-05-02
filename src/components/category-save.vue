<template>
  <div>
        <h2>这里是添加商品界面</h2>

      <div class="category_form">
        <Form ref="newCategory" :model="newCategory" label-position="left" :label-width=100>
            <FormItem label="一级种类">
                <Select  v-model="newCategory.parentId" :label-in-value="true" size="large">
                  <Option v-for="item in CategoryIdList" :value="item.value"  :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="种类名">
                <Input v-model="newCategory.name" size="large" />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleConfirm('newCategory')">确认</Button>
                <Button type="ghost" @click="handleReset('newCategory')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
      </div>
  </div>
</template>

<script>
import { getCategoryChild, addCategory } from '../api/category'
export default {
    data() {
        return {
                newCategory: {
                    parentId: '',
                    name: ''
                },
                CategoryIdList: []
        }
    },
    mounted() {
        this.initCategoryParentId()
    },
    methods: {
        initCategoryParentId(){
            getCategoryChild(0).then(res => {
                let data = res.data
                for(let i = 0;i < data.length; i++){
                    let name = data[i].name
                    let id = data[i].id
                    let my_category = {
                        value: id,
                        label: name,
                    }
                    this.CategoryIdList.push(my_category)
                }
                let my_category = {
                        value: '0',
                        label: '一级种类',
                    }
                this.CategoryIdList.push(my_category)
            })
        },
        handleConfirm(name){
          let Category = this.newCategory
          // console.log(product)
          addCategory(Category).then((res)=>{
            console.log(res)
            if(res.status == 0){
              this.$Message.success('商品存储成功')
              this.newCategory.name = ''
            }
          })
        },
        handleReset(name){
        //   alert('in cancel')
          this.newCategory.name = ''
        }
    }
}
</script>

<style scoped>
h2 {
    display: block;
    height: 25px;
    line-height: 25px;
    margin: 40px auto;
}
</style>

