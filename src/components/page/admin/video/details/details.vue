<template>
  <div>
    <Row class="video" v-if="video" :gutter="16" >
        <Col span="4">
          <img class="thumb_url" :src="video.n_thumb_url" />
          <Button size="small" type="success" @click="$store.commit('router',{ path:'/video_save', query :{ type :'update' , video :{ _id :video._id ,title :video.title ,digest :video.digest ,tags :video.tags ,url :video.url  ,thumb_url :video.thumb_url ,thumb_url_g:video.n_thumb_url} } })" style=" margin-top:5px;">修改</Button>
        </Col>
        <Col class="video_info" span="20">
          <p>视频索引：{{video._id}}</p>
          <p>视频标题：{{video.title}}</p>
          <p>简介信息：{{video.digest}}</p>
          <p>创建时间：{{new Date(video.create_at).toLocaleString()}}</p>
          <p>影片地址：<a target="_blank" :href="video.n_url">{{video.n_url}}</a></p>
          <p>图片地址：<a target="_blank" :href="video.n_thumb_url">{{video.n_thumb_url}}</a></p>
          <p></p>
        </Col>
    </Row>
    <div class="comment">
      <Table  size="small" border :columns="Comments.columns" :data="Comments.datas" @on-selection-change="selectComments"></Table>
      <Button  v-if="Comments.datas.length > 0"  size="small" type="error" @click="removeComments()" style=" margin-top:5px;">删除</Button>
      <Page  v-if="Comments.datas.length > 0"  class-name="page_lz" :total="total" size="small" @on-change="pageTurning" @on-page-size-change="updateLimit" show-total show-sizer show-elevator></Page>
    </div>
  </div>
</template>

<style>
  .video{ min-height :150px; background: #fffff9; padding: 5px; border: 1px solid #eee;}
  .thumb_url { width: 100%;}
  .video_info p{ height: 20px; line-height: 20px; font-size: 13px;}
  .comment { margin-top: 20px;}
</style>

<script>
    import ThisJS from './'
    export default {
      data(){
        return {
          video : null,
          limit : 10,
          total : 0,
          Comments : { columns :[] ,datas :[] },
          select_comments : [],
          removeComments_url :this.$store.state.host + '/admin/comment/removeById',
        }
      },
      methods :{
        pageTurning :ThisJS.methods.pageTurning,
        updateLimit :ThisJS.methods.updateLimit,
        selectComments : ThisJS.methods.selectComments,
        removeComments : ThisJS.methods.removeComments
      },
      created :ThisJS.created
    }
</script>
