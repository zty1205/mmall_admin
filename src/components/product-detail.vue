<!-- product detail 弹出框  -->
<template>
  <div class="layout">
    <div class="back"></div>

    <div>
        <!-- 展示 商品名称 形容 价格 库存stock 图片-->
        <p>商品名称</p>
        <Input v-model="detailList.name" :disabled="isEdit"></Input>
        <p>商品描述</p>
        <Input v-model="detailList.subtitle" :disabled="isEdit"></Input>

        <!-- 编辑 商品名称 形容 价格 库存stock 图片 更新时间-->

        <!-- 决定是否信息可以编辑 -->
        <i-switch size="large" v-model="isEdit" style="margin-top: 20px;">
          <span slot="open">ON</span>
          <span slot="close">OFF</span>
        </i-switch>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'product-detail',
      props:['list'], // 获得从父组件传过来的信息 让后渲染在页面上
      data(){
        return{
          isEdit: false,
          detailList: {},
          // name: '',
          // subtitle: ''
        }
      },
      watch:{
        detailList: {
          handler(newVal, oldVal) {
            this.detailList = newVal
          }
        }
      },
      mounted(){
        this.initList()
      },
      methods:{
        initList(){
          // this.name = this.list.name;
          // this.subtitle = this.list.subtitle;
          this.detailList = this.list;
        }
      }
    }
</script>

<style scoped>
.layout{
  background: #fff;
  position: fixed;
  border: 1px solid blue;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 1000px;
  margin: 10px auto;
  z-index: 100;
}
.back{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(128,128,128,.6);
  opacity: .5;
  border: 1px solid red;
  z-index: 0;
}
</style>
