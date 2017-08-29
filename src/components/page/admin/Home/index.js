import ruku from  '@/util/ruku.js'
export default {
  methods: {

  },
  async created(){
     let admin_msg = await ruku.get(this.$store.state.host + '/feedbackMsg')
     let Video_data = await ruku.getVideos({url :this.$store.state.host + '/videos' ,query :{limit :5 ,page :1}})
     this.Video.datas = Video_data.data //电影信息
     this.admin_msg = admin_msg;
     this.iboxs.push({title :'文章数' ,num :Video_data.count})
  }
}
