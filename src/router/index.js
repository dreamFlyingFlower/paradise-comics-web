import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/layout'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component:Layout,
      redirect:'index',
      children:[
        {
          path:'index',
          component: ()=>import('@pages/home'),
          meta:{title:"首页"}
        },
        {
          path:"category",
          component:()=>import("@pages/category"),
          meta:{title:"分类"}
        },
        {
          path:"category/search",
          component:()=>import("@pages/category/search"),
          meta:{title:"分类搜索"}
        },
        {
          path:'videos/:typeId',
          name:"videos",
          component:()=>import('@pages/videos'),
          meta: {title: "视频"}
        },
        {
          path:'play/:videoId',
          name:"play",
          component:()=>import('@pages/videos/play'),
          meta: {title:"播放视频"}
        },
        {
          path:'register',
          name:'register',
          component:()=>import('@pages/user/register'),
          meta:{title:"注册"}
        },
        {
          path:"login",
          name:"login",
          component:()=>import('@pages/user/login'),
          meta:{title:"登录"}
        }
      ]
    }
  ]
})
