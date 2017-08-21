<template>


  <Row>
      <Col span="16">
        <Form :label-width="90" ref="VideoValidate" :model="VideoValidate" :rules="ruleValidate" >
          <Form-item label="标题" prop="title">
            <Input v-model="VideoValidate.title" placeholder="标题"></Input>
          </Form-item>
          <Form-item label="简介" prop="desc">
            <Input v-model="VideoValidate.desc" type="textarea"  placeholder="简介"></Input>
          </Form-item>
          <Form-item label="标签" >
            <Transfer :titles="['全部标签','已有标签']" :data="VideoValidate.tags" :target-keys="VideoValidate.select_tag" @on-change="handleChange"></Transfer>
          </Form-item>
          <Form-item label="缩略图" prop="thumb_url">
            <Input v-model="VideoValidate.thumb_url" :disabled="urlDisabled"  placeholder="缩略图地址,将在上传图片的时候自动添加"></Input>
          </Form-item>
          <Form-item label="url" prop="url">
            <Input v-model="VideoValidate.url" :disabled="urlDisabled" placeholder="视频地址"></Input>
          </Form-item>
          <Form-item>
            <Button type="success" @click="handleSubmit('VideoValidate')">{{pageType}}</Button>
            <Button type="error" @click="cutUrlDisabled">点击此标签将允许手动更改视频和图片地址</Button>
          </Form-item>
        </Form>
      </Col>
      <Col span="7" offset="1">
          <div class="el-upload" @click="toggleShow"><img style="width:100%;" :src="thumbnail.imgDataUrl"></div>
          <my-upload field="img"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                v-model="thumbnail.show"
            :width="thumbnail.width" :height="thumbnail.height" :url="thumbnail.url"
            img-format="png"></my-upload>
      </Col>
  </Row>
</template>


<script>

    import myUpload from 'vue-image-crop-upload/upload-2.vue';
    export default {
        components: {
  			     myUpload,
  		  },
        data () {
          return {
             pageType :'未知',
             urlDisabled :true,
             thumbnail :{
               imgDataUrl :'',
               show : false,
               width : 600,
               height : 340,
               url : this.$store.state.host + '/admin/upload-thumbnail/' + this.$store.state.admin.token ,
             },
             VideoValidate :{
               _id : '',    //此字段只有在修改方法时候才有值
               title : '',
               desc :'',
               url :'',
               thumb_url :'',
               tags : [],
               select_tag :[],
             },
             ruleValidate: {
                title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
                desc: [{ required: true, message: '简介不能为空', trigger: 'blur' }],
                url: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
                thumb_url: [{ required: true, message: '地址不能为空', trigger: 'blur' }],

             },
             success : false,
             selectTag_url :this.$store.state.host + '/tags',
             addVideo_url :this.$store.state.host + '/admin/video/create_video',
             updateVideo_url :this.$store.state.host + '/admin/video/update_video'
          }
        },
        methods: {
          handleChange (newTargetKeys, direction, moveKeys) {
              this.VideoValidate.select_tag = newTargetKeys;
          },
          async createVideo(){
            let err_info ,request ,vcurl_id;
            vcurl_id = this.$route.query.vcurl_id;
              if(this.success){
                this.$store.commit('verifyAdmin',["token","permissions"])
                err_info = this.$store.state.admin.verifyErrorInfo
                if(!err_info){
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
                  this.$Notice.warning(err_info);
                }
              }else{
                this.$Notice.error({title :'拒绝操作' ,desc :'出于某种风险原因，服务器拒绝该操作。'});
              }
          },
          async updateVideo(){
            let err_info ,request ,vcurl_id;
            vcurl_id = this.$route.query.vcurl_id;
              if(this.success){
                this.$store.commit('verifyAdmin',["token","permissions"])
                err_info = this.$store.state.admin.verifyErrorInfo
                if(!err_info){
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
                  this.$Notice.warning(err_info);
                }
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
</script>



<style>
.el-upload:hover{border-color:#20a0ff;}
.el-upload{position:relative;display:inline-block;overflow:hidden;width:11pc;height:75pt;border:1px dashed #d9d9d9;border-radius:6px;text-align:center;cursor:pointer;}
.el-upload:before{content:"上传封面";}
.avatar-uploader-icon{width:11pc;height:75pt;color:#8c939d;text-align:center;font-size:28px;line-height:178px;}
</style>
