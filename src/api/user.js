/* jshint esversion:6 */
import service from '../utils/service';

export default {
  login,
  logout,
  create
}

function login(params) {
  return service.get('user/login', params);
}

function logout(token) {
  return service.get(`user/logout/`, { token: token });
}

function create(params) {
  return service.post('user/register', params)
}
