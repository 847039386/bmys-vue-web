import Sidebar from '@/components/common/Sidebar'
import Login from '@/components/page/admin/Login/login'
import Home from '@/components/page/admin/Home/home'
import Admin_msg from '@/components/page/admin/admin_msg/admin_msg'
import api_Tmp from '@/components/page/admin/Api/api'
import Video_upload from '@/components/page/admin/video/upload/upload'
import Video_save from '@/components/page/admin/video/save/save'
import Video_details from '@/components/page/admin/video/details/details'
import Video_select from '@/components/page/admin/video/select/select'
import Tag from '@/components/page/admin/Tag/tag'
import Setting from '@/components/page/admin/setting/setting'




import Index from '@/components/page'
import PHome from '@/components/page/public/Home'
import Find from '@/components/page/public/Find'
import Details from '@/components/page/public/details'

import middlewares from './middlewares'

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
            beforeEnter : middlewares.auth()
        },
        {
            path: '/home',
            component: Home,
            name :"Home",
            beforeEnter : middlewares.auth()
        },
        {
            path: '/api',
            component: api_Tmp,
            name :"api_Tmp",
            beforeEnter : middlewares.auth()
        },
        {
            path: '/admin_msg',
            component: Admin_msg,
            name :"Admin_msg",
            beforeEnter : middlewares.auth()
        },
        {
            path: '/video_select',
            component: Video_select,
            name :"video_select",
            beforeEnter : middlewares.auth()
        },
        {
          path: '/video_upload',
          component: Video_upload,
          name :"video_upload",
          beforeEnter : middlewares.auth()
        },
        {
          path: '/video_save',
          component: Video_save,
          name :"video_save",
          beforeEnter : middlewares.auth()
        },
        {
          path: '/video_details',
          component: Video_details,
          name :"video_details",
          beforeEnter : middlewares.auth()
        },
        {
          path: '/tag',
          component: Tag,
          name :"tag",
          beforeEnter : middlewares.auth()
        },
        {
          path: '/setting',
          component: Setting,
          name :"setting",
          beforeEnter : middlewares.auth()
        }
    ]
  },
  {
    path: '/login',
    component: Login,
    name :"Login"
  },
]
