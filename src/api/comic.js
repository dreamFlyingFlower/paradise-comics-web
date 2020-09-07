/* jshint esversion:6 */
import service from '../utils/service';

export {
  getAll,
  getByCategoryIds
}

/**
 * 头部搜索,会根据动漫名字,动漫别名,动漫作者,动漫简介搜索相关动漫
 * @param {String} searchKey 关键字,关键字为null不搜索
 * @param {Ingeter} pageIndex 分页索引
 * @param {Integer} pageSize 分页条数
 */
function getAll(param) {
  return service.get("comic/getAll", param)
}

/**
 *
 * @param {String} ids 动漫分类标识组成的字符串,多个用逗号隔开
 * @param {Integer} pageIndex 分页参数,从第几页开始
 * @param {Integer} pageSize 分页参数,每页展示数据条数
 */
function getByCategoryIds(ids,pageIndex,pageSize){
  return service.get(`comic/getByCategoryIds/${ids}`,{pageIndex:pageIndex,pageSize:pageSize});
}