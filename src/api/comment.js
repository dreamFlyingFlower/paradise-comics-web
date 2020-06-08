import service from "@utils/service";

export {
  getByArguedId,
  handleVote
}

/**
 * 根据被评论的资源编号查找评论
 * @param {long} id 被评论的对象编号
 * @param {int} type 类型,0评论1动漫
 * @param {int} pageIndex 分页参数,从第几页开始
 * @param {int} pageSize 分页参数,每页显示条数
 */
function getByArguedId(id, type, pageIndex, pageSize) {
  return service.get(`comment/getByArguedId/${id}`, {
    type: type,
    pageIndex: pageIndex,
    pageSize: pageSize
  });
}

/**
 * 对评论进行点赞或返回
 * @param {Object} id 被评论的评论编号
 * @param {Object} userId 操作用户编号
 * @param {Object} type 赞成或反对,1赞成0反对
 */
function handleVote(params) {
  return service.get(`comment/handleVote/${params.id}`, params);
}
