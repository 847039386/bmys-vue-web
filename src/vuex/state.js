export default {
  debug : true,
  host : 'http://localhost:3000',
  ModelPermission :null,    //这个属性是当前模块的权限。配合verifyAdmin使用。
  uploads : [],
  new_uploads :[],
  admin :{
    token : '',       //token
    token_time : '',  //token生成时间。
    privileges : [],   //权限
    nickname : '',    //名称
    newip : '',       //本次登陆IP
    oldip : '',       //上次登陆IP
    verifyErrorInfo : false,
  }
}
