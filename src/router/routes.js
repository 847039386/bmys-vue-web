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
            path: '/video_select',
            component: Video_select,
            name :"video_select"
        },
        {
          path: '/video_upload',
          component: Video_upload,
          name :"video_upload"
        },
        {
          path: '/video_save',
          component: Video_save,
          name :"video_save"
        },
        {
          path: '/video_details',
          component: Video_details,
          name :"video_details"
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
