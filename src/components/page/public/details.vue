<template>
  <div>
    <my-video1 :refresh="refresh"></my-video1>
    <form-comment @on-success="formComment"></form-comment>
    <v-comment :refresh="refresh" :newComment="newComment"></v-comment>
  </div>
</template>

<script>
  import ruku from  '@/util/ruku.js'
  import myVideo1 from '../../common/details/myVideo1'
  import vComment from '../../common/details/comment'
  import formComment from '../../common/details/commentForm'
  export default {
    components: {
      myVideo1,
      vComment,
      formComment
    },
    data () {
      return {
        refresh : false,
        newComment :{},
      }
    },
    methods :{
      formComment(info){
        this.newComment = info.data
      },
    },
    watch: {
      async '$route' (to, from) {
        this.refresh = !this.refresh    //因为路由重复一个地址的话，组件不会进行重复渲染。所以这里父组件放个监听值告诉子组件需要刷新
      }
    }
  }
</script>
