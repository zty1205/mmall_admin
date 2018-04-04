<!-- product detail 弹出框  -->
<template>
  <transition>

    <div class="layout" v-if="isShow">
      <div class="back"></div>

      <!-- 展示 商品名称 形容 价格 库存stock 图片-->
      <div class="desc">
        <label>商品名称</label>
        <Input v-model="detailList.name" :disabled="isEdit" class="descContent"></Input>
      </div>
      <div class="desc">
        <label>商品描述</label>
        <Input v-model="detailList.subtitle" :disabled="isEdit" class="descContent"></Input>
      </div>
      <div class="desc">
        <label>当前状态</label>
        <Input v-model="detailList.status" disabled class="descContent"></Input>
      </div>
      <div class="desc">
        <label>商品价格</label>
        <InputNumber v-model="detailList.price" :disabled="isEdit" :min="0"
                     :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
                     :parser="value => value.replace(/$s?|(,*)/g, '')"
                     class="descContent"></InputNumber>
      </div>
      <div class="desc">
        <label>商品库存</label>
        <InputNumber v-model="detailList.stock" :disabled="isEdit" :min="0"
                     :step="10"
                     class="descContent"></InputNumber>
      </div>
      <!-- 编辑 商品名称 形容 价格 库存stock 图片 更新时间-->
      <label class="product_img">商品图片</label>
      <div class="desc_img">
        <img :src="[detailList.imageHost + detailList.mainImage]" class="imgOne"></img> <!-- 这样是可以的 但是subImages[i]不知道怎么写才正确 -->
        <!--<img :src="[detailList.imageHost + {{detailList.subImages[1]}}]" class="imgOne"></img> 不成功 只能单独渲染 v-for-->
      </div>
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
          isEdit: true,
          detailList: {},
          // name: '',
          // subtitle: ''
          subImages: [],
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
            let data = res.data
            let list = data
            let imageHost = data.imageHost
            let subImage = data.subImages   // 这是一段字符串 而不是数组
            console.log(imageHost)
            for(let i = 0; i<2; i++){
            //   this.subImages[i] = imageHost + subImage[i]+''
              console.log(data.subImages[i])
            }
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
.product_img{
  font-size: 20px;
  margin: 4px auto;
  color: #0022ff;
}
  .desc_img{
    width: 80%;
    height: 400px;
    margin: 20px auto;
  }
  .imgOne{
    margin-left: 20px;
    width: 200px;
    height: 300px;
    float: left;
  }
imgOne{
  margin-left: 20px;
  width: 200px;
  height: 300px;
  float: left;
}
</style>
