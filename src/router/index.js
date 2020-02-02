import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/layout'
import LayoutSimple from "../pages/layout/layoutSimple"
import LayoutUser from "../pages/layout/layoutUser"
import Manager from '../pages/layout/manager'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      component: LayoutSimple,
      redirect: "/login",
      children: [
        {
          path:"",
          name: "login",
          component: () => import("@pages/user/login"),
          meta: {
            title: "登录"
          }
        }
      ]
    },
    {
      path: "/register",
      component: LayoutSimple,
      redirect: "/register",
      children: [
        {
          path:"",
          name: "register",
          component: () => import("@pages/user/register"),
          meta: {
            title: "注册"
          }
        },
      ]
    },
    {
      path: "/detail",
      component: LayoutUser,
      redirect: "/detail",
      children: [
        {
          path:"",
          name: "detail",
          component: () => import("@pages/user/detail"),
          meta: {
            title: "个人信息"
          }
        },
      ]
    },
    {
      path: "/",
      component: Layout,
      redirect: "/index",
      children: [
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
    // 管理页面登录
    {
      path: "/login-manager",
      name: "login-manager",
      component: () => import("@pages/system"),
      meta: {title: "管理登录页"}
    },
    // 系统设置
    {
      path: "/system",
      name: "system",
      component: Manager,
      redirect: "/system/user",
      children: [
        {
          path:"menu",
          name:"system-menu",
          component:()=>import("@pages/system/menu"),
          meta:{title:"菜单管理"}
        },
        {
          path:"user",
          name:"system-user",
          component:()=>import("@pages/system/user"),
          meta:{title:"用户管理"}
        },
        {
          path:"role",
          name:"system-role",
          component:()=>import("@pages/system/role"),
          meta:{title:"角色管理"}
        },
        {
          path:"dic",
          name:"system-dic",
          component:()=>import("@pages/system/dic"),
          meta:{title:"字典管理"}
        },
        {
          path: "video",
          name: "system-video",
          component: () => import("@pages/video"),
          meta: {title: "管理首页"},
        }
      ]
    },
    {
      path:"/anime",
      name:"anime",
      component:Manager,
      redirect:"/anime/comic",
      children:[
        {
          path:"comic",
          name:"comic",
          component:()=>import("@pages/anime/comic"),
          meta:{title:"文章管理"}
        },
        {
          path:"file",
          name:"file",
          component:()=>import("@pages/anime/file"),
          meta:{title:"文件管理"}
        },
        {
          path:"category",
          name:"category",
          component:()=>import("@pages/anime/category"),
          meta:{title:"分类管理"}
        },
        {
          path:"label",
          name:"label",
          component:()=>import("@pages/anime/label"),
          meta:{title:"标签管理"}
        },
        {
          path:"comment",
          name:"comment",
          component:()=>import("@pages/anime/comment"),
          meta:{title:"文章管理"}
        },
        {
          path:"friend",
          name:"friend",
          component:()=>import("@pages/anime/friend"),
          meta:{title:"友联管理"}
        }
      ]
    }
  ]
})
