/* jshint esversion:6 */
import service from '../utils/service';

export {
  getSelfChildrenCode
}

function getSelfChildrenCode(dictCode,parent) {
  return service.get(`dict/getSelfChildrenCode/${dictCode}`,{parent:parent})
}
