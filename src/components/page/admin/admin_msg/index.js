import ruku from  '@/util/ruku.js'
export default {
  methods :{
     async delete_msg(index,id){
         let err_info ,del;
         this.$store.commit('ModelPermission')
         this.$store.commit('verifyAdmin',["token","permissions"])
         err_info = this.$store.state.admin.verifyErrorInfo
         if(!err_info){
           let del = await ruku.post({url :this.$store.state.host + '/admin/fbmsg/removeFBMSG' ,query :{id :id ,token :this.$store.state.admin.token}})
           if(del){
             this.admin_msg.splice(index, 1);
             this.$Notice.success({title:'成功', desc:'移除了一封反馈信件。'});
           }
         }else{
           this.$Notice.warning(err_info);
         }
     },
  },
  async created(){
     let admin_msg = await ruku.get(this.$store.state.host + '/feedbackMsg')
     this.admin_msg = admin_msg;
  }
}
