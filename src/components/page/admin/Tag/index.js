import ruku from  '@/util/ruku.js'
export default {
  methods: {
      async addTag(){
        let request ,info;
        try {
          request = await this.$http.post(this.addTag_url,{ token :this.$store.state.admin.token ,tag :this.tag })
          this.$store.commit('reqIsSuccess',{
            state : request.data.success,
            success :{
               info : { title :'标签添加成功' ,desc :`标签： ${this.tag} 添加成功`},
               callback :() =>{
                 this.tags.unshift(request.data.data)
                 this.tag = ''
               }
            },
            error :{
              info :{ title :'标签添加错误' ,desc :`标签：${this.tag} 添加失败，其原因可能是：${request.data.msg} ` },
            }
          })
        } catch (e) {
          console.log(e)
          info = { title :'添加标签出现错误' ,desc :'添加标签出现问题，问题未知。'}
          this.$Notice.error(info);
        }
      },
      removeTag(event ,name){
        let title = '删除确认',
            width = 360,
            content = '点击删除时，该条数据将从数据库移除！',
            okText = "删除",
            cancelText = '取消';
        this.$Modal.confirm({ title ,  width ,content ,okText ,cancelText ,onOk :async () => {
          if(name.split('/').length > 1){
            let request;
            let id = name.split('/')[0]
            let idx = name.split('/')[1]
            try {
              request = await this.$http.post(this.removeTag_url,{ token :this.$store.state.admin.token ,id :id })
              this.$store.commit('reqIsSuccess',{
                state : request.data.success,
                success :{
                   info : { title :'标签删除' ,desc :`标签： ${this.tag} 标签删除成功`},
                   callback :() =>{
                     this.tags.splice(idx, 1);
                   }
                },
                error :{
                  info :{ title :'标签删除' ,desc :`标签：${this.tag} 删除失败，其原因可能是：${request.data.msg} ` },
                }
              })
             } catch (e) {
              console.log(e)
              this.$Notice.error({ title :'添加标签出现错误' ,desc :'添加标签出现问题，问题未知。'});
            }
          }else{
            this.$Notice.error({title :'删除操作' ,desc :'出现未知错误'})
          }
        }})
    },
    updateTag(idx ,id ,name){
      let request;
      this.$Modal.confirm({
          title :`当前修改标签：${name}`,
          render: (h) => {
              return h('Input', {
                  props: {
                      value: this.up_tag,
                      autofocus: true,
                      placeholder: '请输入要修改的标签值'
                  },
                  on: {
                      input: (val) => {
                          this.up_tag = val;
                      }
                  }
              })
          },
          onOk :async () => {
            try {
              request = await this.$http.post(this.updateTag_url,{ token :this.$store.state.admin.token ,id :id ,name :this.up_tag })
              this.$store.commit('reqIsSuccess',{
                state : request.data.success,
                success :{
                   info : { title :'标签修改' ,desc :`标签： ${this.tag} 标签修改成功 ,修改后名称为${this.up_tag}`},
                   callback :() =>{
                     this.tags.splice(idx, 1);
                     this.tags.unshift({_id :request.data.data._id,name :this.up_tag })
                     this.up_tag = ''
                   }
                },
                error :{
                  info :{ title :'标签修改' ,desc :`标签：${this.tag} 修改失败，其原因可能是：${request.data.msg} ` },
                }
              })
             } catch (e) {
              console.log(e)
              this.$Notice.error({ title :'修改标签出现错误' ,desc :'修改标签出现问题，问题未知。'});
            }
          }
      })
    }
  },
  async created(){
      this.tags = await ruku.get(this.selectTag_url)
  }
}
