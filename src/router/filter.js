import router from './index'
import store from '../store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import cookie from '../utils/cookie'
import getPageTitle from '@utils/getPageTitle'
import layout from '@is/layout'

NProgress.configure({showSpinner: false}); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const token = cookie.getToken();

  if (token) {
    // 普通类型用户不拦截
    if (store.getters.user.type === 1){
      next();
    }
    let hasRoutes = store.getters.roles && store.getters.roles.length > 0
        && store.getters.routes && store.getters.routes.length > 0;
    if (hasRoutes) {
      if (to.path === '/login') {
        clearCookie();
        next();
        NProgress.done();
      } else {
        next();
      }
    } else {
      try {
        await store.dispatch('ROUTES', store.getters.roles[0].roleId).then(data => {
          handlerRoutes(data);
        });

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({...to, replace: true})
      } catch (error) {
        // remove token and go to login page to re-login
        clearCookie();
        Message.error(error || 'Has Error');
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

function clearCookie() {
  cookie.removeUser();
  cookie.removeToken();
}

router.afterEach(() => {
  NProgress.done();
});

function handlerRoutes(menus) {
  let routes = buildRoutes(menus);
  router.options.routes.push(routes);
  router.addRoutes(routes);
  store.commit('ROUTES', routes);
}

function buildRoutes(menus) {
  let routes = [];
  for (let menu of menus) {
    let children = menu.children;
    let route = {
      path: menu.menuPath,
      name: menu.routerName,
      redirect: menu.redirect,
      iconInfo: menu.menuIcon,
      hidden: menu.hidden,
      meta: {
        title: menu.menuName
      }
    };
    if (children && children.length > 0) {
      children = buildRoutes(children);
      route.component = layout;
      route.children = children;
    } else {
      // import中的参数不能用在变量,也不能用``,要么是一个完成的字符换,要么就字符串拼接
      route.component = () => import('@/pages' + menu.menuView);
    }
    routes.push(route);
  }
  return routes;
}
