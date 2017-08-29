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
    import ThisJS from './';
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
          handleChange : ThisJS.methods.handleChange,   //切换标签执行的函数
          createVideo : ThisJS.methods.createVideo,     //创建video
          updateVideo : ThisJS.methods.updateVideo,     //修改video
          handleSubmit : ThisJS.methods.handleSubmit,   //提交视频 （修改或增加）
          selectTag : ThisJS.methods.selectTag,         //查看所有标签
          toggleShow : ThisJS.methods.toggleShow,                 //缩略图  控制隐藏属性
          cropSuccess : ThisJS.methods.cropSuccess,               //缩略图  成功
          cropUploadSuccess : ThisJS.methods.cropUploadSuccess,   //缩略图  上传成功
          cutUrlDisabled : ThisJS.methods.cutUrlDisabled   //是否允许手动修改
        },
        created :ThisJS.created
    }
</script>



<style>
.el-upload:hover{border-color:#20a0ff;}
.el-upload{position:relative;display:inline-block;overflow:hidden;width:11pc;height:75pt;border:1px dashed #d9d9d9;border-radius:6px;text-align:center;cursor:pointer;}
.el-upload:before{content:"上传封面";}
.avatar-uploader-icon{width:11pc;height:75pt;color:#8c939d;text-align:center;font-size:28px;line-height:178px;}
</style>
