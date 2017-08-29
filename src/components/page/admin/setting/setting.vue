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
    import ThisJS from './';
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
            handleSubmit :ThisJS.methods.handleSubmit   //提交设置信息
        },
        created :ThisJS.created
    }
</script>
