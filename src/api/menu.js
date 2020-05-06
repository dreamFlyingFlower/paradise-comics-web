import service from '@utils/service';

export {
  getSelfChildren,
  getUserMenus
}

/**
 * 根据菜单编号获得菜单信息以及子菜单信息
 * @param menuId 菜单编号
 * @returns {*}
 */
function getSelfChildren(menuId) {
  return service.get(`menu/getSelfChildren/${menuId}`);
}

/**
 * 获得用户菜单
 * @returns {*}
 */
function getUserMenus() {
  return service.get("menu/getUserMenus");
}
