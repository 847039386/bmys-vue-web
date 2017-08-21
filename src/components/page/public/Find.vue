<template>
  <div>
    <Alert show-icon v-html="msg" >{{msg}}</Alert>
    <x-video v-for="video in videos" :key="'iv'+video._id" :title="video.title" :img="video.thumb_url" :tags="video.tags" :desc="video.digest" :createAt="video.create_at"></x-video>
    <Page v-if="videos.length > 0 && limit < total" class-name="page_lz" :total="total" size="small" :page-size="limit" @on-change="pageTurning" show-total></Page>
  </div>
</template>

<style>
    .page_lz{ margin-top: 20px;text-align: center;}
</style>

<script>
  import ruku from  '@/util/ruku.js'
  import xVideo from '../../common/XVideo'
  export default {
    components : {
      xVideo
    },
    data(){
      return {
        videos:[],
        total : 0,
        state : '',
        limit : 5,
        currentPage : 1,
        msg :''
      }
    },
    methods :{
      async pageTurning(size){
        await this.load(size)
      },
      key(field){
          return '<span style="color:#ed3f14;">' + field +'</span>'
      },
      async load(page){
        let query ,videos ,options;
        if(this.$route.query.tag_id){
          query = { tag :this.$route.query.tag_id ,limit :this.limit ,page :page }
          options = {url: this.$store.state.host + '/inTagVideo' ,query :query }
          this.msg = '正在搜索：标签 ' + this.key(this.$route.query.tag_name)
        }else if(this.$route.query.blur){
          query = { title :this.$route.query.blur ,limit :this.limit ,page :page }
          options = {url: this.$store.state.host + '/blur' ,query :query }
          this.msg = '正在搜索标题：'+ this.key(this.$route.query.blur)
        }else{
          options = {url: this.$store.state.host + '/videos' ,query :{ limit :this.limit ,page :page } }
          this.msg = '正在搜索全部'
        }
        videos = await ruku.get(options)
        if(videos.success){
          this.videos = videos.data
          this.total = videos.count;
          this.msg += " 约 " + this.key(videos.count) + " 个结果。"
        }
      }
    },
    async created(){
      await this.load(1)
    },
    watch: {
      async '$route' (to, from) {
        await this.load(1)
      }
    }
  }

</script>
