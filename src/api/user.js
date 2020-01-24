import service from '../utils/service';
import crypto from '../utils/crypto';

export default {
  login,
  logout,
  create
}

function login(params) {
  return service.get('user/login', params);
}

function logout(userId) {
  return service.get(`user/logout/${userId}`)
}

function create(params) {
  return service.post('user/create', params)
}
