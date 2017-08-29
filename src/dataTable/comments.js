let datas = [
  { title :'鬼吹灯之牧野诡事' ,tags :' 悬疑剧 / 自制剧 / 网络剧' ,digest :'简介：《鬼吹灯之牧野诡事》导，王大陆、金厉、王耀、小金牙进入千年古墓寻找胡天父母下落时发生的事。',create_at :'2017-8-20'},
]

let columns = function(){
  return [
    { type: 'selection',width: 60,align: 'center'},
    { title: 'ip' ,key: 'ip' ,"width": 200 ,align: 'center'},
    { title: '评论内容' ,key: 'content' ,align: 'center'},
  ]
}



export default { datas : datas , columns : columns}
