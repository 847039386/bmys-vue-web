import store from '../vuex'
import Notice from 'iview/src/components/notice';

export default {
  //权限
  auth(permissions){
    return function(to, from, next){
      store.commit('ModelPermission',permissions)
      store.commit('verifyAdmin',["token","permissions"])
      if(!store.state.admin.verifyErrorInfo){
        next();
      }else{
        Notice.warning(store.state.admin.verifyErrorInfo)
        next({ path: '/' });
      }
    }
  }
}
