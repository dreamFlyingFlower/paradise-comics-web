/* jshint esversion:6 */
import service from '../utils/service';

export {
  getRecommends,
  getByKey
}

/**
 * 获得首页推荐动漫
 * @returns {Promise | Promise<unknown>}
 */
function getRecommends() {
  return service.get(`comic/getRecommends`);
}

/**
 * 头部搜索,会根据动漫名字,动漫别名,动漫作者,动漫简介搜索相关动漫
 * @param Stirng 关键字,关键字为null不搜索
 */
function getByKey(key){
  return service.get("elasticComic/findByKey",{key:key})
}
