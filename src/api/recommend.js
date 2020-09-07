/* jshint esversion:6 */
import service from '../utils/service';

export {
  getRecommends
}

/**
 * 获得首页推荐动漫
 * @returns {Promise | Promise<unknown>}
 */
function getRecommends(dictCode) {
  return service.get(`recommend/getRecommends/${dictCode}`);
}