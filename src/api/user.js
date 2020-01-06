import service from '../utils/service';
import crypto from '../utils/crypto';

export default{
    login,
    logout
}

function login(params){
    return service.get('user/login',params);
}

function logout(userId){
    return service.get(`user/logout/${userId}`)
}