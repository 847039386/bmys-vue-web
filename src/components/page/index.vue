<template>
  <div>
    <my-nav></my-nav>
    <div class="container"><router-view></router-view></div>
    <v-footer></v-footer>
  </div>
</template>


<style>
body{ background-color: #f3f3f3;}
.container{ width: 960px;  margin: auto; margin-bottom: 50px;}
</style>

<script>
  import myNav from '../common/MyNav'
  import vFooter from '../common/Footer'
  export default {
    components : {
      myNav,
      vFooter
    },
  }

</script>
