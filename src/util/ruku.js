import Vue from 'vue'
import store from '../vuex'
import Notice from 'iview/src/components/notice';
import Message from 'iview/src/components/message';

export default {
   async getVideos(options){
     let info ,host;
     info = { data :[] ,count :0 }
     try {
       let request = await Vue.http.get(options.url,{ params :options.query } || {})
       if(request.data.success){
         let old_tag ,new_tags;
         request.data.data.forEach((item) =>{

           let old_tag = item.tags;
           let new_tags = [];
           old_tag.forEach((t) => {
             new_tags.push(t.name)
           })
           item.thumb_url_g = item.thumb_url.split('\\')[0] == 'public' ? store.state.host + '/' + item.thumb_url.split('\\').splice(1).join('/') : item.thumb_url
           item.create_at =  new Date(item.create_at).toLocaleString()
           item.tag_g = new_tags.join(' / ')
         })
         info = request.data
       }else if(request && request.data && !request.data.success){
         Notice.error({title:'错误', desc: request.data.msg})
       }
     } catch (e) {
       console.log(e)
       Notice.error({title:'错误', desc: '位置错误，请于控制台查看。'})
     }
    return info
   },
   async get(options){
     let datas = [];
     let request
     try {
       if(typeof options == 'string'){
         request = await Vue.http.get(options)
       }else{
         request = await Vue.http.get(options.url,{ params :options.query } || {})
       }
       if(request && request.data && request.data.success && typeof options != 'string'){
         datas = request.data
       }else if(request && request.data && request.data.success){
         datas = request.data.data
       }else if(request && request.data && !request.data.success){
         Notice.error({title:'错误', desc: request.data.msg})
       }
     } catch (e) {
       console.log(e)
       Notice.error({title:'错误', desc: '位置错误，请于控制台查看。'})
     }
     return datas
   },
   async post(options){
     let info = {success :false };
     try {
       let request = await Vue.http.post(options.url,options.query || {})
       if(request && request.data && request.data.success){
         info = request.data
       }else if(request && request.data && !request.data.success){
         Notice.error({title:'错误', desc: request.data.msg})
       }
     } catch (e) {
       console.log('出错啊')
       Notice.error({title:'错误', desc: '位置错误，请于控制台查看。'})
       console.log(e)

     }
     return info;
   }

}
