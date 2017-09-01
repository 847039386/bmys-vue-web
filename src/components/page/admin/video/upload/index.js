import cache_video from '@/dataTable/cache_video.js';
import ruku from '@/util/ruku.js';
export default {
  methods: {
    remove (index) {
      let title = '删除确认',
          width = 360,
          content = '点击删除时，该条数据将从数据库移除！',
          okText = "删除",
          cancelText = '取消';
      this.$Modal.confirm({ title ,  width ,content ,okText ,cancelText
          ,onOk : () => { this.cache_video.datas.splice(index, 1); }
      })
    },
    beforeUpload(file){
      return true;    //false 则不上传。
    },
    onProgress(event, file, fileList){
        fileList.forEach((item,index) => {
          if(item.percentage == 100){
            fileList.splice(index,1);
          }
        })
        this.$store.state.new_uploads = fileList
    },
    async handleSuccess(response, file, fileList){
        if(!response.success){
          this.flushUpList(file)
          this.$Notice.error({ title: '文件上传报错',desc: `您的文件: <span class="filename">${file.name}</span> 因某种原因上传失败.原因可能是:${response.msg}`});
        }else{
          const file_suc = { percentage :100 ,name :file.name ,uid :file.uid ,url :response.data.url}
          this.flushUpList(file)

          let vcu_s = await this.saveVcurl(response.data.url,file.name)
          if(vcu_s.success){
            file_suc.vcurl_id = vcu_s.data._id;
            this.$store.state.uploads.unshift(file_suc);
            this.cache_video.datas.unshift(vcu_s.data)
          }
          let message = vcu_s.success ? "缓存地址已添加到数据库。" : "发生了某种原因，缓存地址没有成功入库。"
          this.$Notice.success({ title :'文件上传成功' ,desc :`您的文件<span class="filename">${file.name}</span>上传成功，<span class="filename">${message}</span>` });
        }
    },
    handleError(error ,file ,fileList){
          this.$Notice.error({ title: '文件上传失败',desc: `您的文件因某种原因上传失败.`});
    },
    flushUpList(file){
      this.$store.state.new_uploads.forEach((item,index) => {
         if(item.uid === file.uid){
           this.$store.state.new_uploads.splice(index,1);
         }
      })
    },
    async saveVcurl(url,name){
      let request ,info;
      info = { success :false}
        try {
          request = await this.$http.post(this.upload.vcurl,{ url :url ,token :this.$store.state.admin.token ,name :name});
          info.success = request.data.success;
          info.data = request.data.data
        } catch (e) { info.success = false; console.log(e) }
      return info;
    },
    router_saveVideo(params){
      this.$store.commit('router',{ path:'/video_save', query :{ type :'create' ,url : params.row.url ,vcurl_id:params.row._id } })
    }
  },
  async created(){
    let that = this;
    this.cache_video.columns = cache_video.columns(this)
    this.upload.action = this.upload.action + this.$store.state.admin.token
    let Video_data = await ruku.get(that.$store.state.host + '/vcurl')
    this.cache_video.datas = Video_data
  }
}
