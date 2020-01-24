import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/layout'
import Manager from '../pages/layout/manager'

Vue.use(Router);

export default new Router({
  routes: [{
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@pages/user/login"),
        meta: {
          title: "登录"
        }
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@pages/user/register"),
        meta: {
          title: "注册"
        }
      },
      {
        path: "/forget",
        name: "forget",
        component: () => import("@pages/user/forget"),
        meta: {title: "忘记密码"}
      },
      {
        path: "index",
        component: () => import("@pages/home"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "videos/:typeId",
        name: "videos",
        component: () => import("@pages/videos"),
        meta: {
          title: "视频"
        }
      },
      {
        path: "play/:videoId",
        name: "play",
        component: () => import("@pages/videos/play"),
        meta: {
          title: "播放视频"
        }
      }
    ]
  },
    {
      path: "/manager/login",
      name: "manager-login",
      component: () => import("@pages/manager/user/login"),
      meta: {title: "管理登录页"}
    },
    {
      path:"/manager",
      name:"manager",
      component:Manager,
      redirect: "/manager/index",
      children:[
        {
          path:"index",
          name:"manager-index",
          component:() => import("@pages/manager"),
          meta:{title:"管理首页"},
        }
      ]
    }
  ]
})
