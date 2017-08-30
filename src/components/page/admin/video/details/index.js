import ruku from  '@/util/ruku'
import Comments from  '@/dataTable/comments'
export default {
  methods :{
    async pageTurning(page){
        let that = this;
        let request = await ruku.get({url :that.$store.state.host + '/getComment' ,query :{page :page ,limit :this.limit ,video_id : that.video._id}})
        this.total = request.count
        this.Comments.datas = request.data
    },
    async updateLimit(size){
      this.limit = size;
      await this.pageTurning(1)
    },
    selectComments(value){
      this.select_comments = value;
    },
    async removeComments(){
      let comments = [],
          title = '删除确认',
          width = 360,
          content = '点击删除时，该条数据将从数据库移除！',
          okText = "删除",
          cancelText = '取消';
      this.$Modal.confirm({ title ,  width ,content ,okText ,cancelText
          ,onOk :async () => {
            this.select_comments.forEach(item =>{
              comments.push(item._id)
            })
            if(comments.length > 0){
              let request = await ruku.post({url:this.removeComments_url, query:{token :this.$store.state.admin.token ,id :comments} })
              if(request.success){
                this.$Notice.success({ title :'评论操作' ,desc :'评论删除成功！'});
                this.select_comments = [];
                await this.pageTurning(1)
              }else{
                this.$Notice.error({ title :'评论操作' ,desc :'评论删除失败！原因可能是' + request.msg});
              }
            }else{
              this.$Notice.error({ title :'评论操作' ,desc :'并没有选中单位，请选中要删除的对象。'});
            }
          }
      })
    }
  },
  async created(){
    this.Comments.columns = Comments.columns.call(this)
    let video_request = await ruku.get({url :this.$store.state.host + '/videoid',query :{id:this.$route.query.id} });
    if(video_request.success){
      let video = video_request.data;
      video_request.data.n_thumb_url = video.thumb_url.split('\\')[0] == 'public' ? this.$store.state.host + '/' + video.thumb_url.split('\\').splice(1).join('/') : video.thumb_url
      video_request.data.n_url = video.url.split('\\')[0] == 'public' ? this.$store.state.host + '/' + video.url.split('\\').splice(1).join('/') : video.url
      this.video = video_request.data
    }
    await this.pageTurning(1);
  }
}
