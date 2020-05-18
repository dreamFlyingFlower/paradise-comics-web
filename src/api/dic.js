/* jshint esversion:6 */
import service from '../utils/service';

export {
  getSelfChildren,
  getSelfChildrenCode
}

function getSelfChildren(dicId) {
  return service.get(`dic/getSelfChildren/${dicId}`);
}

function getSelfChildrenCode(dicCode,parent) {
  return service.get(`dic/getSelfChildrenCode/${dicCode}`,{parent:parent})
}
