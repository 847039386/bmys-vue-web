import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'
import routes from './routes'

Vue.use(Router)

//白名单不需要验证直接登陆
let whiteList = ['/login','/index','/','/find','/details']


let router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('verifyAdmin',["token"])
  if(!store.state.admin.verifyErrorInfo){
      if(to.path === '/login'){
        next({ path: '/' });
      }else{
         next()
      }
  }else{
    if(whiteList.indexOf(to.path) !== -1){
      next();
    }else{
      next({ path :'/login' })
    }
  }

})

export default router
