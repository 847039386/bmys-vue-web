

<template>
  <Row>
    <Col span="6">
        <Row>
          <Col span="24">
            <Upload ref="upload" type="drag" :action="upload.action" :on-success="handleSuccess" :before-upload="beforeUpload" :on-progress="onProgress" :on-error="handleError" :show-upload-list="false">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
              </div>
            </Upload>

          </Col>
          <Col v-if="$store.state.new_uploads.length > 0 || $store.state.uploads.length > 0" span="24" >
            <Row :gutter="16">
                  <Col span="24" v-for="(a,i) in $store.state.new_uploads" :key="'new_uploads'+i">
                    <Card class="m_5 backg" style="padding:2px; margin:5px;">
                      <span class="yc"><Icon type="ios-film"></Icon>&nbsp;&nbsp;{{a.name}}</span>
                      <Progress :percent="a.percentage" :stroke-width="5"></Progress>
                    </Card>
                  </Col>
                  <Col span="24" v-for="(a,i) in $store.state.uploads" :key="'uploads'+i">
                      <Card class="m_5 backg" style="padding:2px; margin:5px;">
                        <span class="yc"><Icon type="ios-film"></Icon>&nbsp;&nbsp;{{a.name}}</span>
                        <Progress :percent="a.percentage" :stroke-width="5"></Progress>
                        <Button type="primary" size="small" @click="$store.commit('router',{ path:'/create_video', query :{ type :'create' ,url : a.url ,vcurl_id :a.vcurl_id } })">添加数据</Button>
                      </Card>
                  </Col>
            </Row>
          </Col>
        </Row>
    </Col>

    <Col span="17" offset="1">
      <Table :columns="cache_video.columns" :data="cache_video.datas"></Table>
    </Col>



  </Row>
</template>



<script>
    import cache_video from  '@/testJson/cache_video.js'
    import ruku from  '@/util/ruku.js'
    import { auth_privilege ,auth_tokenDue } from  '@/util/auth.js'
    export default {
        data () {
          return {
            cache_video : { columns :[] ,datas :[] },
            upload : {
              action : this.$store.state.host + '/admin/upload-video/',
              vcurl :this.$store.state.host + '/admin/vcurl/add_vcurl'
            }
          }
        },
        methods: {
          remove (index) {
            let title = '删除确认';
            let width = 360;
            let content = '点击删除时，该条数据将从数据库移除！';
            let okText = "删除";
            let cancelText = '取消';
            this.$Modal.confirm({ title ,  width ,content ,okText ,cancelText
                ,onOk : () => { this.cache_video.datas.splice(index, 1); }
            })
          },
          beforeUpload(file){
            let info;
            this.$store.commit('ModelPermission',"上传")
            this.$store.commit('verifyAdmin',["token","permissions"])
            info = this.$store.state.admin.verifyErrorInfo  ;
            if(info){
              this.$Notice.error(info);
            }
            return !info;
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
            console.log(params)
            this.$store.commit('router',{ path:'/create_video', query :{ type :'create' ,url : params.row.url ,vcurl_id:params.row._id } })
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
</script>

<style>
  .filename{ color: #ed3f14; font-weight: bold; word-wrap:break-word; font-size: 14px; display: block; }
  .yc{word-wrap:break-word;}
</style>
