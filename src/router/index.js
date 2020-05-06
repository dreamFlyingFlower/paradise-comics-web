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
          path: "",
          name: "login",
          component: () => import("@pages/user/login"),
          meta: {title: "登录"}
        }
      ]
    },
    {
      path: "/register",
      component: LayoutSimple,
      redirect: "/register",
      children: [
        {
          path: "",
          name: "register",
          component: () => import("@pages/user/register"),
          meta: {title: "注册"}
        },
      ]
    },
    {
      path: "/detail",
      component: LayoutUser,
      redirect: "/detail",
      children: [
        {
          path: "",
          name: "detail",
          component: () => import("@pages/user/detail"),
          meta: {title: "个人信息"}
        },
      ]
    },
    {
      path: "/userinfo",
      component: LayoutUser,
      redirect: "/userinfo",
      children: [
        {
          path:"",
          name: "userinfo",
          component: () => import("@pages/user/userinfo"),
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
          path: "index",
          component: () => import("@pages/home"),
          meta: {title: "首页"}
        },
        {
          path: "forget",
          name: "forget",
          component: () => import("@pages/user/forget"),
          meta: {title: "忘记密码"}
        },
        {
          path: "category",
          component: () => import("@pages/category"),
          meta: {title: "分类搜索"}
        },
        {
          path: "timeaxis",
          component: () => import("@pages/timeaxis"),
          meta: {title: "分类搜索"}
        },
        {
          path: "community",
          component: () => import("@pages/community"),
          meta: {title: "社区"}
        },
      ]
    },
  ]
})
