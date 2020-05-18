/* jshint esversion:6 */
import service from '../utils/service';

export{
    getAncestors
}

function getAncestors(params){
    return service.get('category/getAncestors',params);
}