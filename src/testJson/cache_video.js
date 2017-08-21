let datas = [
  {name :'1.mp4' ,url: 'public/upload/common/651ec24e1d7b78cc30b23e3a1f89e794' },
  {name :'1.mp4' ,url: 'public/upload/common/651ec24e1d7b78cc30b23e3a1f89e794' },
  {name :'1.mp4' ,url: 'public/upload/common/651ec24e1d7b78cc30b23e3a1f89e794' },
  {name :'1.mp4' ,url: 'public/upload/common/651ec24e1d7b78cc30b23e3a1f89e794' },
]

let columns = function(self){
  return [
    { title: '文件名称' ,key: 'name' ,align :'center' },
    { title: '视频地址' ,key: 'url' ,align :'center' },
    { title: '操作' ,key: 'action' ,width: 150 ,align: 'center',
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
                                // self.show(params.index)
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
                                self.router_saveVideo(params)
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
                                self.remove(params.index)
                            }
                        }
                    })
                ]);
            }
      }
  ]
}



export default { datas : datas , columns : columns}
