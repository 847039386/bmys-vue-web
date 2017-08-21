<template>
    <Form ref="formSetting" :model="formSetting" :rules="settingValidate" :label-width="80">
        <Form-item label="评论功能" prop="comment">
          <i-switch size="large" v-model="formSetting.comment" >
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </Form-item>
        <Form-item label="反馈功能" prop="feedbackMsg">
          <i-switch size="large" v-model="formSetting.feedbackMsg" >
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formSetting')">保存</Button>
        </Form-item>
    </Form>
</template>

<script>
    import ruku from  '@/util/ruku.js'
    export default {
        data () {
            return {
                formSetting: {
                    comment: false,
                    feedbackMsg: false,
                },
                settingValidate: {
                    comment: [{type:'boolean', required: true, message: '姓名不能为空', trigger: 'blur' }],
                    feedbackMsg: [{type:'boolean', required: true, message: '邮箱不能为空', trigger: 'blur' }]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        let json = { comment :this.formSetting.comment ,feedbackMsg :this.formSetting.feedbackMsg}
                        json = JSON.stringify(json);
                        let info = await ruku.post({url :this.$store.state.host + '/admin/setting/setWeb' ,query :{setting :json ,token :this.$store.state.admin.token }})
                        if(info.success){
                          this.$Message.success(info.msg);
                        }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        },
        async created(){
          let err_info;
          this.$store.commit('verifyAdmin',["token","permissions"])
          err_info = this.$store.state.admin.verifyErrorInfo
          if(!err_info){
            let setting = await ruku.get({url :this.$store.state.host + '/admin/setting/getWeb' ,query :{ token :this.$store.state.admin.token }})
            if(setting.success){
              this.formSetting = setting.data
            }
          }else{
            this.$Notice.warning(err_info);
          }
        }
    }
</script>
