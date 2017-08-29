

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
                        <Button type="primary" size="small" @click="$store.commit('router',{ path:'/video_save', query :{ type :'create' ,url : a.url ,vcurl_id :a.vcurl_id } })">添加数据</Button>
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

    import ruku from  '@/util/ruku.js'
    import ThisJS from './';
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
          remove : ThisJS.methods.remove,       //删除缓存数据
          beforeUpload : ThisJS.methods.beforeUpload,   //上传之前的操作 如false则取消上传
          onProgress : ThisJS.methods.onProgress,       //上传进度条操作
          handleSuccess : ThisJS.methods.handleSuccess,   //上传成功
          handleError : ThisJS.methods.handleError,       //上传失败
          flushUpList :ThisJS.methods.flushUpList,        //把上传的进度条信息存储在vuex里 以便全局观看进度
          saveVcurl : ThisJS.methods.saveVcurl,           //保存缓存数据的地址
          router_saveVideo : ThisJS.methods.router_saveVideo    //去往创建视频页面
        },
        created :ThisJS.created
    }
</script>

<style>
  .filename{ color: #ed3f14; font-weight: bold; word-wrap:break-word; font-size: 14px; display: block; }
  .yc{word-wrap:break-word;}
</style>
