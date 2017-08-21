import router from '../router'
import auth from '../util/auth'
import Notice from 'iview/src/components/notice';
import Message from 'iview/src/components/message';

export default {
    delProgress(state,value){
        state.uploads.splice(value,1);
    },
    router(state,data){
        router.push(data)
    },
    ModelPermission(state,value){
      state.ModelPermission = value;
    },
    verifyAdmin(state,securitys){
      let info;
      if(securitys.indexOf('permissions') != -1){
        let Permissions = auth.auth_privilege(state.admin.privileges,state.ModelPermission)
        if( !Permissions ){
          info = { title :'权限不足' ,desc :`您可能并没有能操作此功能的权限` }
          state.ModelPermission = null;
        }
      }
      if(securitys.indexOf('token') != -1){
         let due = auth.auth_tokenDue(state.admin.token,state.admin.token_time)
         if( !due ){
           info = { title :'令牌过期' ,desc :`您的令牌可能到期，请重新登陆。` }
         }
      }
      state.admin.verifyErrorInfo = info;
    },
    reqIsSuccess(state,obj){
       let info_error ,info_success ;
       info_error = { title : '失败' ,desc :'您的操作失败了。' ,content :'操作失败！'}
       info_success = { title : '成功' ,desc :'您的操作成功了。' ,content :'操作成功！'}
       if(obj && obj.state){
          if(obj.success && obj.success.info){
            info_success = obj.success.info
          }
          if(obj.success && typeof obj.success.callback == 'function'){
            obj.success.callback();
          }
          if(obj.type == 'message'){
            Message.success(info_success)
          }else{
            Notice.success(info_success)
          }
       }else{
         if(obj.error && obj.error.info){
           info_error = obj.error.info
         }
         if(obj.error && typeof obj.error.callback == 'function'){
           obj.error.callback();
         }
         if(obj.type == 'message'){
           Message.error(info_error)
         }else{
           Notice.error(info_error)
         }
       }
    }
}
