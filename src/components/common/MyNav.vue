<template>
  <div class="mymenu">
    <ul class="menu">
      <dl>
          <AutoComplete
            v-model = "seach.field"
            @on-search = "onSearch"
            @on-select = "toSearch"
            icon="ios-search"
            placeholder="请搜索内容"
            style="width:200px">
            <div class="demo-auto-complete-item">
              <Option v-for="option in seach.data" :value="option._id" :key="option.title">
                  <span class="demo-auto-complete-title">{{ option.title }}</span>
              </Option>
            </div>
            <p v-if="seach.data.length > 1" @click="$store.commit('router',{ path:'/find' ,query :{ blur :seach.field}})" target="_blank" class="demo-auto-complete-more">查看所有结果</p>
        </AutoComplete>
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
ul.menu > li:hover { background-color: #495060; color: #9d9d9d;}

ul.menu > dl .ivu-input { background: #222 !important; line-height:18px !important; color: #9d9d9d !important;}
.demo-auto-complete-item{padding: 4px 0;border-bottom: 1px solid #F6F6F6;}
.demo-auto-complete-group{font-size: 12px;padding: 4px 6px;}
.demo-auto-complete-group span{color: #666;font-weight: bold;}
.demo-auto-complete-group a{float: right;}
.demo-auto-complete-count{float: right;color: #999;}
.demo-auto-complete-more{display: block;margin: 0 auto;padding: 4px;text-align: center;font-size: 12px; color:#7BA3F3; cursor: pointer;}


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
          data :[]
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
      async onSearch(value){
        let videos = await ruku.get({url: this.$store.state.host + '/blur' ,query :{ title :value ,limit :10 ,page :1 } })
        if(videos.success){
          this.seach.data = videos.data
        }
      },
      toSearch(value){
        this.seach.field = ''
        this.$store.commit('router',{ name:'Details' ,query :{ id :value}})
      }
		},
  }

</script>
