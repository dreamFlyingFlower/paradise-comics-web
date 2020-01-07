import service from '../utils/service';

export {
  getIndexVideo
}

function getIndexVideo(params){
  return service.get('video/getIndexVideo/',params);
}
