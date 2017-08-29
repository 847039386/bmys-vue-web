import ruku from  '@/util/ruku.js'
export default {
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
