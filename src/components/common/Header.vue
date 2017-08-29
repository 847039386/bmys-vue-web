<template>
  <div class="layout-ceiling">
      <div class="layout-ceiling-main">
          <span class="logout" @click="$store.commit('router',{ path:'/'})">主页</span>
          <span class="loginIn">管理员：{{$store.state.admin.nickname}}</span>
          <span class="loginIn">上次登陆IP：{{$store.state.admin.oldip}}</span>
          <span class="loginIn">本次登陆IP：{{$store.state.admin.newip}}</span>
          <span class="logout" @click="logout">注销</span>
      </div>
  </div>
</template>

<style>
    .loginIn{ color: #19be6b;}
    .logout{  color: #FFF; cursor: pointer;}
    .layout-ceiling{ background: #222; padding: 10px 0; overflow: hidden;}
    .layout-ceiling-main{float: right;  margin-right: 15px;}
    .layout-ceiling-main a{color: #9ba7b5;}
    .layout-ceiling-main a{color:#9ba7b5}
    .layout-ceiling-main span{ padding: 0 10px;}
</style>

<script>

export default {
  methods: {
      logout () {
        this.$store.state.admin = {}
        this.$store.commit('router',{ path:'/login'})
      },
  }
}

</script>
