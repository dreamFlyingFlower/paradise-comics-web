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
          path:'videos/:typeId',
          name:"videos",
          component:()=>import('@pages/videos'),
          meta: {title: "视频"}
        },
        {
          path:'play/:videoId/:src',
          name:"play",
          component:()=>import('@pages/videos/play'),
          meta: {title:"播放视频"}
        }
      ]
    }
  ]
})
