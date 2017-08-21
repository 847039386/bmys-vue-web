<template>
  <div>
    <h1>以下的参数需必填 token  与头部/admin ,例如 /admin/login</h1>
    <code>
      <p v-for="p in post"><span class="c_method">(post)</span><span class="c_router">{{p.router}}</span>{{p.param}}  {{p.note}}</p>
    </code>
    <h1>以下的参数为get</h1>
    <code>
      <p v-for="g in get"><span class="c_method">(get)</span><span class="c_router">{{g.router}}</span>{{g.param}}  {{g.note}}</p>
    </code>
  </div>
</template>

<style>
code{
  display: block;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 13px;
  line-height: 1.6;
  word-break: break-all;
  word-wrap: break-word;
  color: #FFF;
  background-color: #1D1F21;
  border-radius: 0;}
pre p{ margin: 3px;}
.c_method{ color: #5895BE}
.c_router{ color: #B5BD68;}
</style>

<script>
  export default {
    data :function(){
      return {
        get :[
          {router :'/tags' ,param :'' ,note :'查看标签'},
          {router :'/videos' ,param :'[page ,limit]' ,note :'查看视频'},
          {router :'/vcurl' ,param :'' ,note :'查看视频缓存地址'},
          {router :'/feedbackMsg' ,param :'' ,note :'查看反馈信息'},
          {router :'/inTagVideo' ,param :'[tag ,page ,limit]' ,note :'查看符合标签的视频'},
          {router :'/videoid' ,param :'[id]' ,note :'根据id查询单个视频'},
          {router :'/blur' ,param :'[title ,page ,limit]' ,note :'模糊查询视频信息'},
          {router :'/getComment' ,param :'[page ,video_id ,limit]' ,note :'查询一个视频下的评论'},
          {router :'/saveFeedbackMsg' ,param :'[content ]' ,note :'添加反馈'},
          {router :'/saveComment' ,param :'[video_id ,content]' ,note :'添加评论'},
          {router :'/admin/setting/getWeb' ,param :'[token]' ,note :'查看web配置文件'},
        ],
        post :[
          {router :'/register' ,param :'[nickname ,username ,password ,privileges]' ,note :'注册'},
          {router :'/login' ,param :'[username ,password]' ,note :'登陆'},
          {router :'/upload-video/:token' ,param :'' ,note :'上传视频'},
          {router :'/upload-thumbnail/:token' ,param :'' ,note :'上传视频缩略图'},
          {router :'/removeFBMSG' ,param :'[id]' ,note :'删除反馈信息'},
          {router :'/tag/add_tag' ,param :'[tag]' ,note :'添加标签'},
          {router :'/tag/update' ,param :'[id ,name]' ,note :'修改标签'},
          {router :'/tag/removeById' ,param :'[id]' ,note :'删除标签'},
          {router :'/add_vcurl' ,param :'[url ,name]' ,note :'添加视频缓存地址'},
          {router :'/create_video' ,param :'[title ,digest ,tags, url ,thumb_url]' ,note :'添加视频'},
          {router :'/update_video' ,param :'[id ,title ,digest ,tags, url ,thumb_url]' ,note :'修改视频信息'},
          {router :'/video/removeById' ,param :'[id]' ,note :'删除视频'},
          {router :'/comment/removeById' ,param :'[id]' ,note :'删除评论'},
          {router :'/setting/setWeb' ,param :'[token ,setting]' ,note :'修改web配置文件'}
        ]
      }
    }
  }
</script>
