
<style media="screen">
.top{padding: 10px;background: rgba(0, 153, 229, .7); color: #fff;text-align: center;border-radius: 2px; }
.page_lz{ margin-top: 40px;text-align: center;}
</style>

<template>
  <div>
    <Table size="small" border :columns="Video.columns" :data="Video.datas"></Table>
    <Page class-name="page_lz" :total="total" size="small" @on-change="pageTurning" @on-page-size-change="updateLimit" show-total show-sizer show-elevator></Page>
  </div>
</template>


<script>
    import ruku from  '@/util/ruku.js'
    import Video from  '@/testJson/video.js'
    export default {
       data :function(){
         return {
            Video : { columns :[] ,datas :[] },
            limit : 10,
            total : 0
         }
       },
       methods: {
            remove (result) {
              this.$store.commit('verifyAdmin',["token","permissions"])
              let err_info = this.$store.state.admin.verifyErrorInfo
              if(!err_info){
                let title = '删除确认';
                let width = 360;
                let content = '点击删除时，该条数据将从数据库移除！';
                let okText = "删除";
                let cancelText = '取消';
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
              }else{
                this.$Notice.warning(err_info);
              }
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
              this.$store.commit('router',{ path:'/create_video', query :{ type :'update' , video :params.row } })
            }
        },
        async created(){
          this.Video.columns = Video.columns(this)
          await this.pageTurning(1)
        }
    }

</script>
