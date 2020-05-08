import service from '../utils/service';

export {
  getRecommends
}

function getRecommends() {
  return service.get(`comic/getRecommends`);
}