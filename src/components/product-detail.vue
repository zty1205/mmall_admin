<!-- product detail 弹出框  -->
<template>
  <transition>

    <div class="layout" v-if="isShow">
      <div class="back"></div>

      <!-- 展示 商品名称 形容 价格 库存stock 图片-->
      <!-- 编辑 商品名称 形容 价格 库存stock 图片 更新时间-->
      <div class="desc">
        <label>商品名称</label>
        <Input v-model="detailList.name" :disabled="isEdit" size="large" class="descContent"></Input>
      </div>
      <div class="desc">
        <label>商品描述</label>
        <Input v-model="detailList.subtitle" :disabled="isEdit" size="large" class="descContent"></Input>
      </div>
      <div class="desc">
        <label>当前状态</label>
        <Input v-model="detailList.status" disabled size="large" class="descContent"></Input>
      </div>
      <div class="desc">
        <label>商品价格</label>
        <InputNumber v-model="detailList.price" :disabled="isEdit" size="large" :min="0"
                     :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
                     :parser="value => value.replace(/$s?|(,*)/g, '')"
                     class="descContent"></InputNumber>
      </div>
      <div class="desc">
        <label>商品库存</label>
        <InputNumber v-model="detailList.stock" :disabled="isEdit" :min="0"
                     :step="10"  size="large"
                     class="descContent"></InputNumber>
      </div>

      <label class="product_img_title">商品图片</label>
      <div class="product_img">
        <div class="desc_img" v-for="item in subImages">
          <!--<img :src="[detailList.imageHost + detailList.mainImage]" class="imgOne"></img> &lt;!&ndash; 这样是可以的 但是subImages[i]不知道怎么写才正确 &ndash;&gt;-->
          <!--<img :src="[detailList.imageHost + {{detailList.subImages[1]}}]" class="imgOne"></img> 不成功 只能单独渲染 v-for-->
          <img :src="item.src" class="imgOne"></img>
        </div>
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
  import { getDetail, addAndedit } from '../api/product'
    export default {
      name: 'product-detail',
      props:['id'], // 获得从父组件传过来的信息 让后渲染在页面上
      data(){
        return{
          isEdit: true,
          detailList: {},
          // name: '',
          // subtitle: ''
          subImages: [
            { src : '' },
            { src : '' },
            { src : '' }
          ],
          isShow: false
        }
      },
      watch:{
        detailList: {
          handler(newVal,oldVal){
            this.detailList = newVal;
          }
        },
        subImages:{
          handler(newVal,oldVal){
            this.subImages = newVal;
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
          let id = this.id
          getDetail(id).then((res)=>{
            let data = res.data
            let list = data
            let imageHost = data.imageHost
            let subImage = data.subImages.split(',')   // 这是一段字符串 而不是数组
            let _subImages = this.subImages
            // console.log(imageHost)
            for(let i = 0; i<3; i++){
              _subImages[i].src = imageHost + subImage[i]+''
              // console.log(this.subImages[i].src)
            }
            this.detailList = list
          })
          this.isShow = true
        },
        SureEdit(){
          // console.log('in sure')
          // this.isShow = false
          let product = {}
          addAndedit(product).then((res)=>{

          })
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
  /*background: #fff;*/
  /*background-color: #2d8cf0;*/
  background-color: rgb(228,218,172);
  position: fixed;
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
.product_img_title{
  font-size: 20px;
  margin: 4px auto;
}
.product_img{
  margin: 0 auto;
  padding: 10px auto;
}
.desc_img{
  width: 20%;
  height: 280px;
  margin-left: 10%;
  margin-top: 40px;
  float: left;
  border: 4px solid white;

}
.imgOne{
  margin: 5% 5%;
  width: 90%;
  height: 90%;
}
</style>
