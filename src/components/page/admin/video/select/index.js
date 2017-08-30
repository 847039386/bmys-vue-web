import ruku from  '@/util/ruku.js'
import Video from  '@/dataTable/video.js'
export default {
  methods: {
       remove (result) {
         let title = '删除确认',
             width = 360,
             content = '点击删除时，该条数据将从数据库移除！',
             okText = "删除",
             cancelText = '取消';
         this.$Modal.confirm({ title ,  width ,content ,okText ,cancelText
             ,onOk :async () => {
               if(result.row._id){
                 let msg = { title :'删除操作' ,desc :'删除失败'}
                 let info = await this.removeVideo(result.row._id)
                 if(info.success){
                   msg.desc = "删除成功"
                   this.$Notice.success(msg)
                   this.Video.datas.splice(result.index, 1);
                 }else{
                   this.$Notice.error(msg)
                 }
               }
             }
         })
       },
       async pageTurning(page){
           let that = this;
           let Video_data = await ruku.getVideos({url :that.$store.state.host + '/videos' ,query :{page :page ,limit :this.limit}})
           this.total = Video_data.count
           this.Video.datas = Video_data.data
       },
       async updateLimit(size){
         this.limit = size;
         await this.pageTurning(1)
       },
       async removeVideo(id){
          let info = await ruku.post({url :this.$store.state.host + '/admin/video/removeById' ,query :{id :id ,token :this.$store.state.admin.token}})
          return info;
       },
       updateVideo(params){
         this.$store.commit('router',{ path:'/video_save', query :{ type :'update' , video :params.row } })
       },
       findVideo(params){
         this.$store.commit('router',{ path:'/video_details', query :{ id :params.row._id } })
       }
   },
   async created(){
     this.Video.columns = Video.columns.apply(this)
     await this.pageTurning(1)
   }
}
