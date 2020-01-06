import service from '@utils/service';

export {
    getSelfChildren
}

function getSelfChildren(menuId){
    return service.get(`menu/getSelfChildren/${menuId}`);
}