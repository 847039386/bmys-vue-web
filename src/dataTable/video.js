let datas = [
  { title :'鬼吹灯之牧野诡事' ,tags :' 悬疑剧 / 自制剧 / 网络剧' ,digest :'简介：《鬼吹灯之牧野诡事》导，王大陆、金厉、王耀、小金牙进入千年古墓寻找胡天父母下落时发生的事。',create_at :'2017-8-20'},
  { title :'鬼吹灯之牧野诡事' ,tags :' 悬疑剧 / 自制剧 / 网络剧' ,digest :'简介：《鬼吹灯之牧野诡事》导，王大陆、金厉、王耀、小金牙进入千年古墓寻找胡天父母下落时发生的事。',create_at :'2017-8-20'},
  { title :'鬼吹灯之牧野诡事' ,tags :' 悬疑剧 / 自制剧 / 网络剧' ,digest :'简介：《鬼吹灯之牧野诡事》导，王大陆、金厉、王耀、小金牙进入千年古墓寻找胡天父母下落时发生的事。',create_at :'2017-8-20'},
]

let columns = function(){
  return [
    { title: '电影名' ,key: 'title' ,"width": 200 ,align: 'center'},
    { title: '标签' ,key: 'tag_g' ,"width": 250 ,align: 'center'},
    { title: '创建时间' ,key: 'create_at' ,"width": 180 ,align: 'center'},
    { title: '操作' ,key: 'action' ,fixed: 'right' ,width: 150 ,align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small',
                            icon: 'ios-search'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.findVideo(params)
                            }
                        }
                    }),
                    h('Button', {
                        props: {
                            type: 'success',
                            size: 'small',
                            icon: 'gear-b'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.updateVideo(params)
                            }
                        }
                    }),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small',
                            icon: 'close'
                        },
                        on: {
                            click: () => {
                                this.remove(params)
                            }
                        }
                    })
                ]);
            }
      }
  ]
}



export default { datas : datas , columns : columns}
