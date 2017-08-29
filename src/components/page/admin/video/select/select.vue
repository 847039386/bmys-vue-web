
<style media="screen">
.top{padding: 10px;background: rgba(0, 153, 229, .7); color: #fff;text-align: center;border-radius: 2px; }
.page_lz{ margin-top: 40px;text-align: center;}
</style>

<template>
  <div>
    <Table size="small" border :columns="Video.columns" :data="Video.datas"></Table>
    <Page class-name="page_lz" :total="total" size="small" @on-change="pageTurning" @on-page-size-change="updateLimit" show-total show-sizer show-elevator></Page>
  </div>
</template>


<script>
    import ThisJS from './';
    export default {
       data :function(){
         return {
            Video : { columns :[] ,datas :[] },
            limit : 10,
            total : 0
         }
       },
       methods: {
            remove :ThisJS.methods.remove,      //删除按钮
            pageTurning :ThisJS.methods.pageTurning,    //视频分页
            updateLimit :ThisJS.methods.updateLimit,    //视频每页的最大条数
            removeVideo :ThisJS.methods.removeVideo,    //删除视频
            updateVideo :ThisJS.methods.updateVideo,    //修改视频跳转页面
            findVideo :ThisJS.methods.findVideo         //查看视频
        },
        created :ThisJS.created
    }

</script>
