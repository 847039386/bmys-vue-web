<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
    <Form-item prop="comment">
        <Input v-model="formValidate.comment" icon="chatbubble" @on-click="handleSubmit" placeholder="点击右方图标发布评论..." style="width: 100%; margin:20px 0 10px;"></Input>
    </Form-item>
  </Form>
</template>
<script>
import ruku from  '@/util/ruku.js'
export default {
   data(){
     return {
       formValidate :{
         comment: ''
       },
       ruleValidate :{
         comment: [
        { required: true, message: '评论不能为空', trigger: 'blur' },
         { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }],
       }

     }
   },
   methods :{
     async saveComment(video_id,content){
       let comment = await ruku.post({url :this.$store.state.host + '/saveComment' ,query :{ video_id :this.$route.query.id ,content :content}})
       return comment;
     },
     handleSubmit(){
       this.$refs['formValidate'].validate(async (valid) => {
          if (valid) {
              if(this.$route.query.id){
                let info = await this.saveComment(this.videoId,this.formValidate.comment);
                if(info.success){
                  this.$emit('on-success',info)
                  this.formValidate.comment = null
                  this.$Message.success('评论成功!');
                }
              }
          } else {
              this.$Message.error('评论失败!');
          }
      })
     }
   }
}
</script>
