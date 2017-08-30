<template>
    <div class="comment">
      <div class="comment_count">评论 ：{{ count }}&nbsp;条</div>
      <div class="comment-show" v-for="(comment ,index) in comments" :key="comment._id">
          <div class="comment-show-con clearfix">
              <div class="comment-show-con-img pull-left"><img width="100%;" :src="randomImg()" alt=""></div>
              <div class="comment-show-con-list pull-left clearfix">
                  <div class="pl-text clearfix">
                      <a href="#" class="comment-size-name">游客{{ index + 1 }}</a>
                      <span class="my-pl-con">&nbsp;{{comment.content}}</span>
                  </div>
                  <div class="date-dz">
                      <span class="date-dz-left pull-left comment-time">{{new Date(comment.create_at).toLocaleString()}}</span>
                  </div>
                  <div class="hf-list-con"></div>
              </div>
          </div>
      </div>
      <div class="mm more" v-if="more" @click="morePage" >查看更多</div>
      <div class="mm n_more" v-if="n_more">没有数据啦......</div>
    </div>
</template>

<script>
import ruku from  '@/util/ruku.js'
export default {
   data() {
      return {
        comments :[],
        count :0,
        currentPage :0,
        totalPage :0,
        n_more :false,
        more :true
      }
   },
   props : {
     refresh :{ type :Boolean},
     newComment :{ type :Object }
   },
   methods:{
     randomImg(){
       let path = this.$store.state.host + '/images/' + parseInt(Math.random()*7+1) + '.jpg'
       return path
     },
     async getComment(page){
       let comments;
       comments = await ruku.get({url :this.$store.state.host + '/getComment',query :{ video_id:this.$route.query.id ,limit :5 ,page :page} });
       if(comments.success){
         if(comments.count == 0 || comments.count <= comments.limitPage){
           this.more = false;
           this.n_more = true;
         }
         this.comments = this.comments.concat(comments.data)
         this.count = comments.count
         this.currentPage = comments.currentPage
         this.totalPage = comments.totalPage
       }
     },
     async morePage(){
       if(this.currentPage < this.totalPage ){
         await this.getComment(this.currentPage + 1)
         if(this.currentPage == this.totalPage){
           this.more = false;
           this.n_more = true;
         }
       }
     }
   },
   async created(){
     await this.getComment(1)
   },
   watch: {
     refresh: async function (val, oldVal) {
       this.comments = []
       this.count = 0,
       this.currentPage = 0,
       this.totalPage = 0,
       this.n_more = false,
       this.more = true
       await this.getComment(1)
     },
     newComment :function (val, oldVal) {
       this.count += 1;
       this.comments.unshift(val)
     },
   }
}

</script>

<style>
.comment{ width: 960px; overflow: hidden;}
.mm{padding: 10px; width: 100%; margin-top: 10px; text-align: center; }
.more { color: #FFF; background: #2b85e4;  cursor: pointer; }
.n_more {color: #FFF; background: #222;}
.comment_count{padding: 8px; border: 1px solid #ed3f14; color: #ed3f14; border-radius: 3px;}
/*----------评论区域 begin----------*/
.clearfix:before,
.clearfix:after{content: " ";display: table;}
.clearfix:after{clear: both;}
.clearfix{zoom: 1;}
.pull-right{float: right !important;}
.pull-left{float: left !important;}
.comment-show{margin-top: 8px;}
.comment-show-con{width: 100%; border-top: 1px solid #EDEDED; padding: 10px 0;}
.comment-show-con-img{width: 48px; height: 48px; overflow: hidden; margin-top: 5px;}
.comment-show-con-list{width: 85%; margin-left: 3%;}
.pl-text{width: 100%; margin-top: 7px; word-wrap: break-word; overflow: hidden;}
.date-dz{width: 100%; float: left;}
.hf-list-con{float: left; width: 100%; background-color: #eaeaec; margin-top: 7px;}
.comment-size-name{font-size: 12px; color: #339b53;}
.comment-time, .comment-pl-block{padding-top: 7px;}
.my-pl-con{font-size: 12px; color: #8b8b8b; width: 100%;}
.date-dz-left{font-size: 12px; color: #8b8b8b; display: block; padding-top: 18px;}
.date-dz-right{display: block; padding-top: 6px; padding-right: 18px; position: relative; overflow: hidden;}
.removeBlock{float: left; font-size: 12px; color: #8b8b8b; margin-right: 24px; display: block; opacity: 0;}
.hf-con-block{display: block;}
.date-dz-pl, .date-dz-line, .date-dz-z{font-size: 12px; color: #8b8b8b;}
.date-dz-line{display: block; padding: 0 20px;}
.date-dz-z-click-red{width: 17px; height: 17px; display: block; float: left;  background-repeat: no-repeat; background-position: -6px -198px; margin-right: 5px;}
.z-num{font-style: normal;}
.date-dz-z-click{color: #b83b44;}

/*----------评论区域 end----------*/
</style>
