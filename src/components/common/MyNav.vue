<template>
  <div class="mymenu">
    <ul class="menu">
      <dl>
        <Select
            :value="''"
            placeholder = "请搜索内容"
            filterable
            remote
            size ="small"
            :remote-method="remoteSearch"
            :loading="seach.loading"
            @on-change="search"
            ref="mysearch"
            >
            <Option v-for="option in seach.options" :value="option._id" :key="option._id" >{{option.title}}</Option>
        </Select>
      </dl>
      <li @click="fb_show = true"><Icon type="chatbubble-working"></Icon>&nbsp;联系我们</li>
      <li @click="$store.commit('router',{ path:'/',})"><Icon type="home"></Icon>&nbsp;首页</li>
    </ul>
    <Modal v-model="fb_show" title="请给我们些建议，拜托啦！" @on-ok="createMssage">
      <Input v-model="fb_msg" type="textarea" :rows="4" placeholder="请输入..."></Input>
    </Modal>
  </div>
</template>

<style>
.mymenu{margin-bottom: 15px; }
ul.menu { height: 50px;padding: 0 20px; background: #222; overflow: hidden;}
ul.menu > li { padding: 0 10px; color: #9d9d9d; text-align: center; float: right; line-height: 50px; font-size: 14px; cursor: pointer; height: 50px;}
ul.menu > dl { float: right; margin-top: 12px; padding: 0 5px;}
ul.menu > dl > .ivu-select { }
ul.menu > li:hover { background-color: #495060; color: #9d9d9d;}
ul.menu .ivu-select-selection {  background-color:#222; border: 1px solid #9d9d9d}
ul.menu .ivu-select-selection input { color: #FFF;  }


</style>

<script>
  import ruku from  '@/util/ruku.js'
  export default {
    data(){
      return {
        fb_msg :'',
        fb_show :false,
        blur_title:'',
        seach :{
          field: '',
          loading :false,
          options :[]
        }
      }
    },
    methods :{
      async createMssage(){
        let info = await ruku.post({url :this.$store.state.host + '/saveFeedbackMsg' ,query :{content :this.fb_msg}})
        if(info.success){
          this.fb_msg = ''
          this.$Message.success({content :'谢谢您的建议，我们将会越做越好！' });
        }
      },
      async remoteSearch(query){
        this.seach.loading = true;
        this.seach.field = query;
        let videos = await ruku.get({url: this.$store.state.host + '/blur' ,query :{ title :query ,limit :10 ,page :1 } })
        if(videos.success){
          this.seach.options = videos.data
        }
        this.seach.loading = false;
      },
      search(value){
        this.$store.commit('router',{ name:'Details' ,query :{ id :value}})
      }
		},
  }

</script>
