export default {
  methods :{
    handleChange: function(newTargetKeys, direction, moveKeys){
      this.VideoValidate.select_tag = newTargetKeys;
    },
    async createVideo(){
      let request ,vcurl_id;
      vcurl_id = this.$route.query.vcurl_id;
        if(this.success){
          request = await this.$http.post(this.addVideo_url,{ token :this.$store.state.admin.token ,title :this.VideoValidate.title ,digest :this.VideoValidate.desc ,tags :this.VideoValidate.select_tag ,url :this.VideoValidate.url ,vcurl_id :vcurl_id ,thumb_url :this.VideoValidate.thumb_url})
          this.$store.commit('reqIsSuccess',{
            state : request.data.success,
            success :{
               info : {title :'成功' ,desc :`添加视频${this.VideoValidate.title}成功。`},
               callback :() =>{
                 this.$store.state.uploads.forEach((item ,index) => {
                   if(item.url == this.$route.query.url)
                   this.$store.state.uploads.splice(index,1);
                 })
                 this.$refs['VideoValidate'].resetFields();
                 this.$store.commit('router',{ path:'/home'})
               }
            },
            error :{
              info :{title :'错误' ,desc :'因为某种原因，该数据添加出现错误。'},
            }
          })
        }else{
          this.$Notice.error({title :'拒绝操作' ,desc :'出于某种风险原因，服务器拒绝该操作。'});
        }
    },
    async updateVideo(){
      let request ,vcurl_id;
      vcurl_id = this.$route.query.vcurl_id;
        if(this.success){
          request = await this.$http.post(this.updateVideo_url,{id :this.VideoValidate._id, token :this.$store.state.admin.token ,title :this.VideoValidate.title ,digest :this.VideoValidate.desc ,tags :this.VideoValidate.select_tag ,url :this.VideoValidate.url ,vcurl_id :vcurl_id ,thumb_url :this.VideoValidate.thumb_url})
          this.$store.commit('reqIsSuccess',{
            state : request.data.success,
            success :{
               info : {title :'成功' ,desc :`修改视频${this.VideoValidate.title}成功。`},
               callback :() =>{
                 this.$refs['VideoValidate'].resetFields();
                 this.$store.commit('router',{ path:'/home'})
               }
            },
            error :{
              info :{title :'错误' ,desc :'因为某种原因，修改数据出现错误。'},
            }
          })
        }else{
          this.$Notice.error({title :'拒绝操作' ,desc :'出于某种风险原因，服务器拒绝该操作。'});
        }
    },
    async handleSubmit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.$route.query.type =="create"){
            this.createVideo();
          }else if(this.$route.query.type =="update"){
            this.updateVideo()
          }
        } else {
            this.$Message.error('您的数据并没有添加完整，请按提示添加!');
        }
      })
    },
    async selectTag(){
      let request ,tag ,tag_datas;
      tag = [];
      try {
        request = await this.$http.get(this.selectTag_url)
        tag_datas = request.data.success ? request.data.data : null;
        tag_datas.forEach(item => {
           tag.push({key :item._id ,label :item.name})
        })
      } catch(e){ }
      return tag;
    },
    toggleShow() {
      this.thumbnail.show = !this.thumbnail.show;
    },
    cropSuccess(imageDataUrl, field){
      this.thumbnail.imgDataUrl = imageDataUrl
    },
    cropUploadSuccess(jsonData, field){
      if(jsonData.success){
        this.VideoValidate.thumb_url = jsonData.data.url
        this.$Message.success({ content :'缩略图上传成功' ,duration :3});
      }else{
        this.$Message.error({ content :'缩略图上传失败,原因可能是：'+jsonData.msg ,duration :3});
      }
      this.toggleShow();
    },
    cutUrlDisabled(){
      this.urlDisabled = !this.urlDisabled;
    }
  },
  async created(){
    let tags;
      if(!this.$route.query.type){
        this.$Message.error('不允许直接进入这个页面。');
        this.$router.go(-1);
      }else{
        tags = await this.selectTag();
        if( tags ){
          this.VideoValidate.tags = tags
          this.success = true;
        }else{
          this.$Message.error({ content :'标签查询时出现了未知错误！' ,duration :3});
        }
        if(this.$route.query.type =="create"){
          this.pageType = "创建视频信息"
          this.VideoValidate.url = this.$route.query.url
        }else if(this.$route.query.type =="update"){
          this.pageType = "修改视频信息"
          let v_data = this.$route.query.video;
          Object.assign(this.VideoValidate,{
            title : v_data.title,
            desc :v_data.digest,
            url :v_data.url,
            thumb_url :v_data.thumb_url,
            _id :v_data._id
          })
          v_data.tags.forEach(item => {
            this.VideoValidate.select_tag.push(item._id)
          })
          this.thumbnail.imgDataUrl = v_data.thumb_url_g
        }

      }
  },
}
