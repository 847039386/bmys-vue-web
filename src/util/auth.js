
export default {
  //前端的认证权限。为避免后端的不必要操作。前端设置一个认证方法。
  auth_privilege(privileges,current){
    let success = false;
    if(privileges.indexOf("超级管理员") != -1){
       success = true
    }else if (privileges.indexOf(current) != -1){
       success = true
    }
    return success;
  },
  auth_tokenDue(token,token_time){
     const old_time = new Date(token_time);
     const today = new Date()
     if(token && token_time && old_time.getTime() + (1000 * 60 * 60 * 2 ) > today.getTime() ){
       return true;
     }else{
       return false;
     }
  },
}
