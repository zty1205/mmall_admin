<template>
    <div>
        <div class="panel">
            <span class="title">欢迎来到管理中心：MMALL</span>
            当前用户：<span class="nUser"> {{ nowUser }}</span>
            <a class="help" @click="needHelp">问题帮助</a>
        </div>

    </div>
</template>

<script>
export default {
  computed: {
       nowUser() {
              let user = this.$store.state.user
              return user.username!=''?user.username:'admin'
              // return this.$store.state.user.username
          }
  },
  methods: {
      needHelp(){
          alert('i need help')
      }
  }
}
</script>


<style scoped>
.title {
    font-size: 40px;
    display: block;
    margin: 60px auto;
}
 .panel {
     width: 96%;
     height: 90%;
     margin: 30px auto;
     background: rgba(0, 255, 0, 0.116);
     font-size: 30px;
     padding-top: 20px;
 }
 .nUser {
     font-size: 30px;
     color: greenyellow;
     font-weight: bold;
 }
 .help {
     display: block;
     margin: 30px auto;
     text-decoration: none;
     font-size: 20px;
 }
</style>
