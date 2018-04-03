<!-- product detail 弹出框  -->
<template>
  <transition>

    <div class="layout" v-if="isShow">
      <div class="back"></div>

      <div class="desc">
        <!-- 展示 商品名称 形容 价格 库存stock 图片-->
        <label>商品名称</label>
        <Input v-model="detailList.name" :disabled="isEdit" class="descContent"></Input>
      </div>
      <div class="desc">
        <label>商品描述</label>
        <Input v-model="detailList.subtitle" :disabled="isEdit" class="descContent"></Input>
      </div>
      <!-- 编辑 商品名称 形容 价格 库存stock 图片 更新时间-->

      <!-- 决定是否信息可以编辑 -->
      <i-switch size="large" v-model="isEdit" class="EditSwitch">
        <span slot="open">ON</span>
        <span slot="close">OFF</span>
      </i-switch>

      <Button type="success" @click="SureEdit" class="EditBtnSure">确认</Button>
      <Button type="warning" @click="Cancel" class="EditBtnFalse">取消</Button>

    </div>

  </transition>

</template>

<script>
  import { getDetail } from '../api/product'
    export default {
      name: 'product-detail',
      props:['id'], // 获得从父组件传过来的信息 让后渲染在页面上
      data(){
        return{
          isEdit: false,
          detailList: {},
          // name: '',
          // subtitle: ''
          isShow: false
        }
      },
      watch:{
        detailList: {
          handler(newVal,oldVal){
            this.detailList = newVal;
          },
          deep: true
        }
      },
      mounted(){
        this.initList()
      },
      methods:{
        initList(){
          // this.name = this.list.name;
          // this.subtitle = this.list.subtitle;
          let id = this.id
          getDetail(id).then((res)=>{
            let list = res.data
            this.detailList = list
          })
          this.isShow = true
        },
        SureEdit(){
          console.log('in sure')
          // this.isShow = false
          this.detailList = {}
          this.$emit('unShow')
        },
        Cancel(){
          console.log('in cancel')
          // this.isShow = false
          this.$emit('unShow')
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
  z-index: 1000;
}
.back{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(128,128,128,.6);
  opacity: .5;
  z-index: 0;
}
.desc{
  width: 80%;
  height: 40px;
  margin: 20px auto;
}
  .desc label{
    width: 20%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    margin-left: 10px;
    margin-top: 0;
    display: block;
    float: left;
  }

.desc .descContent{
  width: 70%;
  margin-left: 10px;
  margin-top: 0;
  float: left;;
}
  .EditSwitch{
    position: absolute;
    bottom: 20px;
    left: 30px;
  }
  .EditBtnSure{
    position: absolute;
    bottom: 20px;
    right: 100px;
  }
.EditBtnFalse{
  position: absolute;
  bottom: 20px;
  right: 30px;
}
</style>
