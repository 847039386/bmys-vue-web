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
    import ThisJS from './'
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
            handleSubmit :ThisJS.methods.handleSubmit
        }
    }
</script>

<style scoped>
    .login-wrap{
        margin-top: 300px;
    }

</style>
