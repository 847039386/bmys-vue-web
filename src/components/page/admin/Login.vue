<template>
    <Row class="login-wrap">
      <Col span="4" offset="10">
        <Form ref="formUser" :model="formUser" :rules="ruleUser" :label-width="80">
          <Form-item label="账号" prop="username">
              <Input v-model="formUser.username" placeholder="请输入用户名"></Input>
          </Form-item>
          <Form-item label="密码" prop="password">
              <Input v-model="formUser.password" placeholder="请输入密码"></Input>
          </Form-item>
          <Form-item>
              <Button type="primary" @click="handleSubmit('formUser')">提交</Button>
          </Form-item>
      </Form>
      </Col>
    </Row>

</template>

<script>
    export default {
        data: function(){
            return {
               formUser: {
                   username: '',
                   password: '',
               },
               ruleUser: {
                   username: [
                       { required: true, message: '用户名不能为空', trigger: 'blur' }
                   ],
                   password: [
                       { required: true, message: '密码不能为空', trigger: 'blur' },
                   ],
               },
               login_url : this.$store.state.host + '/admin/login'
            }
        },
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
</script>

<style scoped>
    .login-wrap{
        margin-top: 300px;
    }

</style>
