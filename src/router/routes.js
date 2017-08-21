import Sidebar from '@/components/common/Sidebar'
import Login from '@/components/page/admin/Login'
import Home from '@/components/page/admin/Home'
import Video from '@/components/page/admin/video'
import Admin_msg from '@/components/page/admin/admin_msg'
import api_Tmp from '@/components/page/admin/api'
import Upload_video from '@/components/page/admin/upload_video'
import Create_video from '@/components/page/admin/create_video'
import Tag from '@/components/page/admin/tag'
import Setting from '@/components/page/admin/setting'


import Index from '@/components/page'
import PHome from '@/components/page/public/Home'
import Find from '@/components/page/public/Find'
import Details from '@/components/page/public/details'



export default [

  {
    path: '/',
    component: Index,
    children:[
      {
        path: '/',
        component: PHome,
      },
      {
        path: '/find',
        component: Find,
        name :"Find"
      },
      {
        path: '/details',
        component: Details,
        name :"Details"
      }
    ]
  },
  {
    path : '/readme',
    component : Sidebar,
    children:[
        {
            path: '/',
            component: Home,
        },
        {
            path: '/home',
            component: Home,
            name :"Home"
        },
        {
            path: '/video',
            component: Video,
            name :"Video"
        },
        {
            path: '/api',
            component: api_Tmp,
            name :"api_Tmp"
        },
        {
            path: '/admin_msg',
            component: Admin_msg,
            name :"Admin_msg"
        },
        {
          path: '/upload_video',
          component: Upload_video,
          name :"upload_video"
        },
        {
          path: '/create_video',
          component: Create_video,
          name :"create_video"
        },
        {
          path: '/tag',
          component: Tag,
          name :"tag"
        },
        {
          path: '/setting',
          component: Setting,
          name :"setting"
        }
    ]
  },
  {
    path: '/login',
    component: Login,
    name :"Login"
  },
]
