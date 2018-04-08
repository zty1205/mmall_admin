<template>
    <div class="layout">
      <Layout :style="{height: '780px'}">
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <span class="logo"> MMall </span>
          <Menu active-name="1" theme="dark" width="auto" :class="menuitemClasses">
            <MenuItem name="1" style="margin-left: -14px;">
              <Icon type="ios-home" size='24'></Icon>
              <router-link to="/home/index">
                <span>首页</span>
              </router-link>
            </MenuItem>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad" size='24'></Icon>
                <span>商品</span>
              </template>
              <MenuItem name="2-1">
                <router-link to="/home/product">
                  <span>商品管理 </span>
                </router-link>
              </MenuItem>
              <MenuItem name="2-2">
                <router-link to="/home/category">
                  <span>品类管理 </span>
                </router-link>
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-paper" size='24'></Icon>
                  <span>订单 </span>
              </template>
              <MenuItem name="3-1">
                <router-link to="/home/order">
                  <span>订单管理 </span>
                </router-link>
              </MenuItem>
            </Submenu>
          </Menu>
          <div slot="trigger"></div>
        </Sider>
        <Layout>
          <Header class="layout-header-bar">
            <a class="loginOut" @click="LoginOut">退出</a>
            <span class="welcome">欢迎  {{ nowUser }} </span>
            <DatePicker :open="open" type="date" :value="value" class="head_calendar">
              <Icon :style="{cursor: 'pointer'}" class="calendarIcon" type="calendar" size=30 @click.native="handleClick"></Icon>
            </DatePicker>
          </Header>
          <Content :style="{margin: '20px',background: '#fff', minHeight: '220px'}">
            <router-view :style="{margin: '20px'}"></router-view>
          </Content>
        </Layout>
      </Layout>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                isCollapsed: false,
                open: false,
                clear: false,
                value: new Date(),
                cale: true
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
          nowUser() {
              let user = this.$store.state.user
              return user.username!=''?user.username:'admin'
              // return this.$store.state.user.username
          }
        },
        methods: {
            handleClick () {
                this.open = !this.open;
            },
            LoginOut() {
              this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
.ivu-menu-dark.ivu-menu-vertical
.ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
  background: rgba(255,255,255,.8) !important;
}
  .logo {
      font-weight: 600;
      font-size: 28px;
      color:#FFDD1B;
      font-family:Audiowide;
      display: block;
      margin: 10px auto;
  }
  .logo:hover{
      animation: neon 1.5s ease-in-out infinite alternate;
  }
  @keyframes neon {
      from {
          text-shadow: 0 0 10px #fff,
                  0 0 20px  #fff,
                  0 0 30px  #fff,
                  0 0 40px  #FFDD1B,
                  0 0 70px  #FFDD1B,
                  0 0 80px  #FFDD1B,
                  0 0 100px #FFDD1B,
                  0 0 150px #FFDD1B;
      }
      to {
          text-shadow: 0 0 5px #fff,
                  0 0 10px #fff,
                  0 0 15px #fff,
                  0 0 20px #FFDD1B,
                  0 0 35px #FFDD1B,
                  0 0 40px #FFDD1B,
                  0 0 50px #FFDD1B,
                  0 0 75px #FFDD1B;
      }
  }
  .head_calendar{
    float: right;
    margin: 16px 6px;
  }
 .calendarIcon{
    margin-right: 10px;
 }
  .loginOut{
    float: right;
    font-size: 14px;
    margin: 3px 8px;
  }
  .welcome{
    font-size: 16px;
    float: right;
    font-weight: bold;
    color: burlywood;
    margin: 2px 8px;
  }
</style>

