<template>
    <div>
        <h2>这里是添加商品界面</h2>

      <div class="product_form">
        <Form ref="newProduct" :model="newProduct" label-position="left" :label-width=100>
          <FormItem label="商品名称" props="name">
            <Input v-model="newProduct.name" size="large"></Input>
          </FormItem>
          <FormItem label="商品描述" props="subtitle">
            <Input v-model="newProduct.subtitle" size="large"></Input>
          </FormItem>
          <FormItem>
            <Row type="flex" justify="space-around">
              <Col span="12">
              <FormItem label="一级种类">
                <Select  v-model="newProduct.parentId" :label-in-value="true" size="large" @on-change="getChildCategory" class="product_id">
                  <Option v-for="item in parentIdList" :value="item.value"  :key="item.value">{{ item.label }}</Option>
                </Select >
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="二级种类" props="Id">
                <Select  v-model="newProduct.Id" :label-in-value="true" size="large" class="product_id">
                  <Option v-for="item in childIdList" :value="item.value"  :key="item.value">{{ item.label }}</Option>
                </Select >
              </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row type="flex" justify="space-around">
              <Col span="12">
                <FormItem label="商品价格" props="price">
                  <Input v-model="newProduct.price" :number="true" size="large" class="product_double_property">
                  <span slot="append">元</span>
                  </Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商品库存" props="stock">
                  <Input v-model="newProduct.stock" :number="true" size="large" class="product_double_property">
                  <span slot="append">件</span>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <!-- 暂时上传不了 -->
         <!-- <FormItem label="商品图片">

            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
              <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%;">
            </Modal>

          </FormItem> -->

          <FormItem label="商品描述" props="desc">
            <Input v-model="newProduct.desc" type="textarea" :autosize="true" placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleConfirm">确认</Button>
            <Button type="ghost" @click="handleCancel('formInfo')" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>

    </div>
</template>

<script>
  import { saveProduct } from "../api/product";
  import { getCategoryChild } from '../api/category'
    export default {
      data(){
        return{
          newProduct:{
            name: '',
            subtitle: '',
            parentId: '',
            Id: '',
            price: '',
            stock: '',
            desc: ''
          },
          parentIdList:[],
          childIdList: [],
          // defaultList: [
          //   {
          //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
          //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          //   },
          //   {
          //     'name': 'bc7521e033abdd1e92222d733590f104',
          //     'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          //   }
          // ],
          // imgName: '',
          // visible: false,
          // uploadList: []
        }
      },
      watch:{
        parentIdList:{
          handler(newVal,oldVal){
            this.parentIdList = newVal
          }
        },
        childIdList:{
          handler(newVal,oldVal){
            this.childIdList = newVal
          }
        }
      },
      mounted(){
        this.initParentIdList()
        // this.uploadList = this.$refs.upload.fileList;
      },
      methods: {
        initParentIdList(){
          getCategoryChild(0).then((res)=>{
            // console.log(res.data) // 返回的数据太多了
            // this.category_parent = res
            let data = res.data
            for(let i = 0;i < data.length; i++){
              let name = data[i].name
              let id = data[i].id
              let my_category = {
                value: id,
                label: name,
              }
              this.parentIdList.push(my_category)  // push成功还未有loading显示
              // console.log(my_category)
            }
          })
        },
        getChildCategory(){
          // console.log(this.newProduct.parentId)
          let id = this.newProduct.parentId
          this.childIdList = []
          getCategoryChild(id).then((res)=>{
            let data = res.data
            // console.log(data)
            for(let j = 0;j < data.length; j++){
              let name = data[j].name
              let id = data[j].id
              let child = {
                value: id,
                label: name,
              }
              this.childIdList.push(child)
            }
          })
        },
        handleConfirm(){
          alert('in confirm')
          let product = this.newProduct
          console.log(product)
          // saveProduct(product).then(()=>{
          //
          // })
        },
        handleCancel(name){
          alert('in cancel')
          this.$refs[name].resetFields();
        }
        // handleView (name) {
        //   this.imgName = name;
        //   this.visible = true;
        // },
        // handleRemove (file) {
        //   const fileList = this.$refs.upload.fileList;
        //   this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        // },
        // handleSuccess (res, file) {
        //   file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        //   file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        // },
        // handleFormatError (file) {
        //   this.$Notice.warning({
        //     title: 'The file format is incorrect',
        //     desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        //   });
        // },
        // handleMaxSize (file) {
        //   this.$Notice.warning({
        //     title: 'Exceeding file size limit',
        //     desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        //   });
        // },
        // handleBeforeUpload () {
        //   const check = this.uploadList.length < 5;
        //   if (!check) {
        //     this.$Notice.warning({
        //       title: 'Up to five pictures can be uploaded.'
        //     });
        //   }
        //   return check;
        // }
      }
    }
</script>

<style scoped>
  .product_form{
    width: 80%;
    margin: 20px auto;
  }
  .product_double_property{
    width: 70%;
    float: left;
  }
  .product_id{
    width: 70%;
    /*margin-left: 0;*/
    float: left;
  }
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
