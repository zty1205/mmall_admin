<template>
    <div class="layout">
      <Layout>
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <span class="logo"> MMall </span>
          <Menu active-name="1" theme="dark" width="auto" :class="menuitemClasses">
            <MenuItem name="1">
              <Icon type="ios-home" size='20' :style="{marginLeft: '-20px'}"></Icon>
              <router-link to="/home/index"> 首页 </router-link>
            </MenuItem>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad" size='20'></Icon>
                商品
              </template>
              <MenuItem name="2-1">
                <router-link to="/home/product"> 商品管理 </router-link>
              </MenuItem>
              <MenuItem name="2-2">
                <router-link to="/home/category"> 品类管理 </router-link>
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-paper" size='20'></Icon>
                订单
              </template>
              <MenuItem name="3-1">
                <router-link to="/home/order"> 订单管理 </router-link>
              </MenuItem>
            </Submenu>
          </Menu>
          <div slot="trigger"></div>
        </Sider>
        <Layout>
          <Header class="layout-header-bar">
            <DatePicker
              :open="open"
              type="date"
              :value="value"
            >
              <Icon :style="{cursor: 'pointer'}" class="calendarIcon" type="calendar" size=30 @click.native="handleClick"></Icon>

            </DatePicker>
            <a>退出</a>
            <a>退出</a>
            <span>欢迎, uesr </span>
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
            }
        },
        methods: {
            handleClick () {
                this.open = !this.open;
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
    overflow: hidden;
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
 .calendarIcon{
    margin-right: 10px;
 }
</style>

