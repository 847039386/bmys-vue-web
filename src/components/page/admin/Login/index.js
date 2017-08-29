export default {
  methods: {
      handleSubmit(formName) {
          this.$refs[formName].validate(async (valid) => {
              if (valid) {
                  try {
                    let info = await this.$http.post(this.login_url,{ username :this.formUser.username ,password :this.formUser.password })
                    if(info.data.success){
                       this.$store.state.admin.token = info.data.data.token
                       this.$store.state.admin.token_time = info.data.data.token_time
                       this.$store.state.admin.privileges = info.data.data.privileges
                       this.$store.state.admin.nickname = info.data.data.nickname
                       this.$store.state.admin.newip = info.data.data.newip
                       this.$store.state.admin.oldip = info.data.data.oldip
                       this.$Message.success('登陆成功!');
                       this.$router.push('/readme');
                    }else{
                      this.$Message.error(info.data.msg);
                    }
                  } catch (e) {
                    this.$Message.error('登陆失败!');


                  }
              } else {
                  this.$Message.error('登陆失败!');
              }
          })
      }
  }
}
